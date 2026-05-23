import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  assistantPromptChips,
  buildAssistantSystemPrompt,
  buildRagContext,
  chatbotKnowledge,
  composeGroundedFallback,
  resolveAssistantAction,
} from '../data/chatbotKnowledge';

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

const generateWithOpenAI = async ({ apiKey, model, systemPrompt, userPrompt }) => {
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
        { role: 'user', content: userPrompt },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI request failed (${response.status})`);
  }

  return parseOpenAIResponse(response);
};

const generateWithGemini = async ({ apiKey, model, systemPrompt, userPrompt }) => {
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
          parts: [{ text: userPrompt }],
        },
      ],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 220,
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
  const providerConfig = useMemo(getProviderConfig, []);

  useEffect(() => {
    cacheRef.current = readCache();
  }, []);

  const persistCache = useCallback(() => {
    writeCache(cacheRef.current);
  }, []);

  const runAssistantActions = useCallback((request) => {
    if (request.sectionId) {
      document.getElementById(request.sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (request.highlightProjectTitles.length > 0) {
      window.dispatchEvent(new CustomEvent('portfolio-assistant:highlight-projects', {
        detail: { titles: request.highlightProjectTitles },
      }));
    }

    if (request.openUrls.length > 0) {
      request.openUrls.forEach((url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
      });
    }
  }, []);

  const generateResponse = useCallback(async (query) => {
    const ragContext = buildRagContext(query);
    const cacheKey = buildCacheKey(providerConfig.provider, providerConfig.openAiModel || providerConfig.geminiModel, query, ragContext.contextText);

    if (cacheRef.current.has(cacheKey)) {
      return cacheRef.current.get(cacheKey);
    }

    const systemPrompt = buildAssistantSystemPrompt(ragContext);
    const userPrompt = `User question: ${query}\n\nAnswer using only the portfolio context.`;

    let responseText = '';

    try {
      if (providerConfig.provider === 'openai' && providerConfig.openAiKey) {
        responseText = await generateWithOpenAI({
          apiKey: providerConfig.openAiKey,
          model: providerConfig.openAiModel,
          systemPrompt,
          userPrompt,
        });
      } else if (providerConfig.provider === 'gemini' && providerConfig.geminiKey) {
        responseText = await generateWithGemini({
          apiKey: providerConfig.geminiKey,
          model: providerConfig.geminiModel,
          systemPrompt,
          userPrompt,
        });
      }
    } catch {
      responseText = '';
    }

    if (!responseText) {
      responseText = composeGroundedFallback(query, ragContext);
    }

    cacheRef.current.set(cacheKey, responseText);
    persistCache();

    return responseText;
  }, [persistCache, providerConfig.geminiKey, providerConfig.geminiModel, providerConfig.openAiKey, providerConfig.openAiModel, providerConfig.provider]);

  const sendMessage = useCallback(async (rawQuery) => {
    const trimmedQuery = rawQuery.trim();

    if (!trimmedQuery || isThinking) {
      return;
    }

    const action = resolveAssistantAction(trimmedQuery);

    setMessages((currentMessages) => [
      ...currentMessages,
      { role: 'user', content: trimmedQuery },
    ]);
    setInput('');
    setIsThinking(true);

    try {
      const responseText = await generateResponse(trimmedQuery);
      setMessages((currentMessages) => [
        ...currentMessages,
        { role: 'assistant', content: responseText },
      ]);
      runAssistantActions(action);
    } finally {
      setIsThinking(false);
    }
  }, [generateResponse, isThinking, runAssistantActions]);

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
