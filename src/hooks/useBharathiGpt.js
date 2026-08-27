import { useCallback, useEffect, useRef, useState } from 'react';
import {
  assistantPromptChips,
  answerDirectFact,
  buildRagContext,
  chatbotKnowledge,
  composeGroundedFallback,
  classifyQueryIntent,
} from '../data/chatbotKnowledge';
import { getRecruiterSystemPrompt, buildFinalGeminiPrompt } from '../data/recruiterSystemPrompt';
import { portfolioData } from '../data/portfolioData';

const STORAGE_KEY = 'bharathi-gpt-cache-v1';
const HISTORY_LIMIT = 20;

const getProviderConfig = () => {
  const explicitProvider = String(import.meta.env.VITE_BHARATHI_GPT_PROVIDER || '').toLowerCase();
  const openAiKey = String(import.meta.env.VITE_OPENAI_API_KEY || '');
  const geminiKey = String(import.meta.env.VITE_GEMINI_API_KEY || '');

  if (explicitProvider === 'openai' || explicitProvider === 'gemini') {
    return {
      provider: explicitProvider,
      openAiKey,
      geminiKey,
      openAiModel: String(import.meta.env.VITE_OPENAI_MODEL || 'gpt-4o-mini'),
      geminiModel: String(import.meta.env.VITE_GEMINI_MODEL || 'gemini-1.5-flash'),
    };
  }

  if (openAiKey) {
    return {
      provider: 'openai',
      openAiKey,
      geminiKey,
      openAiModel: String(import.meta.env.VITE_OPENAI_MODEL || 'gpt-4o-mini'),
      geminiModel: String(import.meta.env.VITE_GEMINI_MODEL || 'gemini-1.5-flash'),
    };
  }

  if (geminiKey) {
    return {
      provider: 'gemini',
      openAiKey,
      geminiKey,
      openAiModel: String(import.meta.env.VITE_OPENAI_MODEL || 'gpt-4o-mini'),
      geminiModel: String(import.meta.env.VITE_GEMINI_MODEL || 'gemini-1.5-flash'),
    };
  }

  return {
    provider: 'local',
    openAiKey,
    geminiKey,
    openAiModel: String(import.meta.env.VITE_OPENAI_MODEL || 'gpt-4o-mini'),
    geminiModel: String(import.meta.env.VITE_GEMINI_MODEL || 'gemini-1.5-flash'),
  };
};

const readCache = () => {
  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return new Map();
    }

    const entries = JSON.parse(stored);
    return new Map(Array.isArray(entries) ? entries : []);
  } catch {
    return new Map();
  }
};

const writeCache = (cache) => {
  try {
    const entries = Array.from(cache.entries()).slice(-HISTORY_LIMIT);
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // Ignore storage failures.
  }
};

const buildCacheKey = (provider, model, query, contextText) => [provider, model, query, contextText].join('::');

const parseOpenAIResponse = async (response) => {
  const data = await response.json();
  return data?.choices?.[0]?.message?.content?.trim() || '';
};

const parseGeminiResponse = async (response) => {
  const data = await response.json();
  const parts = data?.candidates?.[0]?.content?.parts || [];
  return parts.map((part) => part?.text || '').join(' ').trim();
};

const formatChatHistory = (messages) => messages
  .map((message) => `${message.role === 'user' ? 'User' : 'BharathiGPT'}: ${message.content}`)
  .join('\n');

const generateWithOpenAI = async ({ apiKey, model, systemPrompt, userPrompt, conversationHistory }) => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      max_tokens: 220,
      messages: [
        { role: 'system', content: systemPrompt },
        ...(conversationHistory ? [{ role: 'user', content: `Conversation history for context only:\n${conversationHistory}` }] : []),
        { role: 'user', content: userPrompt },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI request failed (${response.status})`);
  }

  return parseOpenAIResponse(response);
};

const generateWithGemini = async ({ apiKey, model, systemPrompt, userPrompt, conversationHistory }) => {
  // userPrompt already contains the fully composed Master Prompt payload
  // (background context + [USER'S REAL-TIME QUERY] boundary)
  const fullUserContent = conversationHistory
    ? `Recent Conversation History:\n${conversationHistory}\n\n${userPrompt}`
    : userPrompt;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: systemPrompt }],
      },
      contents: [
        {
          role: 'user',
          parts: [{ text: fullUserContent }],
        },
      ],
      generationConfig: {
        temperature: 0.25,
        maxOutputTokens: 400,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Gemini request failed (${response.status})`);
  }

  return parseGeminiResponse(response);
};

const useBharathiGpt = () => {
  const [messages, setMessages] = useState([{ role: 'assistant', content: chatbotKnowledge.profileSummary }]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const cacheRef = useRef(new Map());
  const messagesRef = useRef(messages);
  const providerConfig = getProviderConfig();

  useEffect(() => {
    cacheRef.current = readCache();
  }, []);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const persistCache = useCallback(() => {
    writeCache(cacheRef.current);
  }, []);

  const generateResponse = useCallback(async (query) => {
    // NOTE: answerDirectFact is intentionally NOT called here.
    // All questions - including simple ones like "Which college?" - flow to
    // Gemini so the response is natural and conversational.

    const ragContext = await buildRagContext(query);
    const conversationHistory = formatChatHistory(messagesRef.current.slice(-8));
    const cacheKey = buildCacheKey(
      providerConfig.provider,
      providerConfig.openAiModel || providerConfig.geminiModel,
      query,
      `${ragContext.contextText}::${conversationHistory}`,
    );

    if (cacheRef.current.has(cacheKey)) {
      return cacheRef.current.get(cacheKey);
    }

    // Build context from only the freshly-retrieved RAG snippets.
    // The full portfolio bio is already in the system instruction - no need
    // to repeat it here. Keeping only the retrieved snippets lets Gemini
    // focus on the most relevant chunks for this specific query.
    const localContext = ragContext?.contextText?.trim() || '';

    const systemPrompt = getRecruiterSystemPrompt(ragContext);
    // Master Prompt: wraps localContext as a hidden background string
    const userPrompt = buildFinalGeminiPrompt(localContext, query);

    if (import.meta.env.DEV && providerConfig.provider === 'gemini') {
      console.groupCollapsed('[BharathiGPT] Gemini context debug');
      console.log('intent', ragContext.intent || classifyQueryIntent(query));
      console.log('retrievedChunks', ragContext.snippets);
      console.log('localContext (hidden background)', localContext);
      console.log('systemPrompt', systemPrompt);
      console.log('userPrompt (full master payload)', userPrompt);
      console.groupEnd();
    }

    let responseText = '';

    try {
      if (providerConfig.provider === 'openai' && providerConfig.openAiKey) {
        responseText = await generateWithOpenAI({
          apiKey: providerConfig.openAiKey,
          model: providerConfig.openAiModel,
          systemPrompt,
          userPrompt,
          conversationHistory,
        });
      } else if (providerConfig.provider === 'gemini' && providerConfig.geminiKey) {
        responseText = await generateWithGemini({
          apiKey: providerConfig.geminiKey,
          model: providerConfig.geminiModel,
          systemPrompt,
          userPrompt,
          conversationHistory,
        });
      }
    } catch {
      responseText = '';
    }

    if (!responseText) {
      // Try grounded fallback first, then raw direct fact as absolute last resort
      responseText = composeGroundedFallback(query, ragContext) || answerDirectFact(query) || '';
    }

    // Only cache non-empty results
    if (responseText) {
      cacheRef.current.set(cacheKey, responseText);
      persistCache();
    }

    return responseText;
  }, [persistCache, providerConfig.geminiKey, providerConfig.geminiModel, providerConfig.openAiKey, providerConfig.openAiModel, providerConfig.provider]);

  const sendMessage = useCallback(async (rawQuery) => {
    const trimmedQuery = rawQuery.trim();

    if (!trimmedQuery || isThinking) {
      return;
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      { role: 'user', content: trimmedQuery },
    ]);
    setInput('');
    setIsThinking(true);

    try {
      const responseText = await generateResponse(trimmedQuery);
      
      let cleanText = responseText;
      let actionObj = null;
      
      // Parse potential action enclosed in ||| ... |||
      const actionRegex = /\|\|\|(.*?)\|\|\|/s;
      const match = responseText.match(actionRegex);
      
      if (match) {
        cleanText = responseText.replace(actionRegex, '').trim();
        try {
          actionObj = JSON.parse(match[1].trim());
        } catch (e) {
          console.error('[BharathiGPT] Failed to parse action JSON:', e);
        }
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        { role: 'assistant', content: cleanText },
      ]);

      // Execute custom UI actions
      if (actionObj) {
        console.log('[BharathiGPT] Triggered Action:', actionObj);
        
        // Dispatch custom global event for interested components (e.g., Projects)
        window.dispatchEvent(new CustomEvent('portfolio-action', { detail: actionObj }));

        // Perform standard DOM reactions immediately
        if (actionObj.action === 'NAVIGATE' && actionObj.payload) {
          const element = document.getElementById(actionObj.payload);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        } else if (actionObj.action === 'DOWNLOAD_RESUME') {
          // Take the URL from the bundler-resolved asset. A literal
          // /src/assets/... path only exists in dev; the production build
          // emits a content-hashed filename, so hardcoding it 404s live.
          const link = document.createElement('a');
          link.href = portfolioData.hero.buttons.resume.href;
          link.download = portfolioData.hero.buttons.resume.download;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    } catch (err) {
      console.error('[BharathiGPT] Error in sendMessage:', err);
    } finally {
      setIsThinking(false);
    }
  }, [generateResponse, isThinking]);

  return {
    assistantPromptChips,
    input,
    isThinking,
    messages,
    sendMessage,
    setInput,
  };
};

export default useBharathiGpt;
