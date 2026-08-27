import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, CornerDownLeft, X } from 'lucide-react';
import useBharathiGpt from '../hooks/useBharathiGpt';
import { portfolioData } from '../data/portfolioData';
import './CommandBar.css';

const EASE = [0.22, 1, 0.36, 1];

const SECTIONS = [
  ['about', 'About'],
  ['skills', 'Stack'],
  ['projects', 'Work'],
  ['writing', 'Research'],
  ['experience', 'Experience'],
  ['credentials', 'Credentials'],
  ['contact', 'Contact'],
];

const go = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const open = (href) => {
  window.open(href, '_blank', 'noopener,noreferrer');
};

/**
 * BharathiGPT as a command palette.
 *
 * `/` or ⌘K opens it. Typing filters real commands — jump to a section,
 * filter the work, open a project, grab the résumé — and Enter runs the
 * highlighted one. Anything the command list does not match falls through
 * to the assistant, so the box is useful before you think of a question.
 */
const CommandBar = ({ open: isOpen, seed = '', onOpen, onClose }) => {
  const {
    assistantPromptChips,
    input,
    isThinking,
    messages,
    sendMessage,
    setInput,
  } = useBharathiGpt();

  const inputRef = useRef(null);
  const endRef = useRef(null);
  const listRef = useRef(null);
  const [cursor, setCursor] = useState(0);

  const query = input.trim();
  const mode = query ? 'commands' : 'chat';

  // ── the command registry ──
  const commands = useMemo(() => {
    const tags = [
      ...new Set(portfolioData.projects.flatMap((project) => project.tags || [])),
    ];

    return [
      ...SECTIONS.map(([id, label]) => ({
        id: `go-${id}`,
        kind: 'Go',
        label,
        hint: `Jump to ${label.toLowerCase()}`,
        keywords: [id, label, 'section', 'scroll', 'jump'],
        run: () => go(id),
      })),
      ...tags.map((tag) => ({
        id: `filter-${tag}`,
        kind: 'Filter',
        label: tag,
        hint: `Show only ${tag} work`,
        keywords: [tag, 'filter', 'projects', 'work', 'tag'],
        run: () => {
          window.dispatchEvent(
            new CustomEvent('portfolio-action', {
              detail: { action: 'FILTER_PROJECTS', payload: tag },
            }),
          );
        },
      })),
      ...portfolioData.projects.flatMap((project) => [
        {
          id: `live-${project.id}`,
          kind: 'Open',
          label: `${project.title} — live`,
          hint: project.tagline,
          keywords: [project.title, 'live', 'demo', ...(project.tech || [])],
          run: () => open(project.demo),
        },
        {
          id: `src-${project.id}`,
          kind: 'Open',
          label: `${project.title} — source`,
          hint: 'GitHub repository',
          keywords: [project.title, 'source', 'code', 'github', 'repo'],
          run: () => open(project.github),
        },
      ]),
      {
        id: 'resume',
        kind: 'Get',
        label: 'Download résumé',
        hint: 'PDF, one page',
        keywords: ['resume', 'cv', 'pdf', 'download'],
        run: () => {
          const link = document.createElement('a');
          link.href = portfolioData.hero.buttons.resume.href;
          link.download = portfolioData.hero.buttons.resume.download;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        },
      },
      {
        id: 'email',
        kind: 'Get',
        label: 'Email Bharathi',
        hint: portfolioData.contact.email,
        keywords: ['email', 'mail', 'contact', 'reach', 'hire'],
        run: () => open(portfolioData.contact.emailComposeUrl),
      },
      {
        id: 'github',
        kind: 'Open',
        label: 'GitHub profile',
        hint: portfolioData.socialLinks.github.handle,
        keywords: ['github', 'profile', 'code'],
        run: () => open(portfolioData.socialLinks.github.href),
      },
      {
        id: 'linkedin',
        kind: 'Open',
        label: 'LinkedIn profile',
        hint: portfolioData.socialLinks.linkedin.handle,
        keywords: ['linkedin', 'profile', 'connect'],
        run: () => open(portfolioData.socialLinks.linkedin.href),
      },
      {
        id: 'paper',
        kind: 'Open',
        label: 'IEEE publication',
        hint: portfolioData.publications[0].venue,
        keywords: ['ieee', 'paper', 'research', 'publication', 'acdof'],
        run: () => open(portfolioData.publications[0].href),
      },
    ];
  }, []);

  const matches = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return commands
      .filter((command) =>
        [command.label, command.kind, ...command.keywords]
          .join(' ')
          .toLowerCase()
          .includes(q),
      )
      .slice(0, 7);
  }, [commands, query]);

  // The ask row is always last, so Enter never dead-ends.
  const rowCount = matches.length + 1;
  const askIndex = matches.length;

  // Clamped rather than reset in an effect: as the query narrows the list,
  // a stale cursor would point past the end. Deriving avoids the extra
  // render pass an effect-based reset would cost.
  const active = Math.min(cursor, rowCount - 1);

  const runRow = useCallback(
    (index) => {
      if (index === askIndex) {
        sendMessage(input);
        return;
      }
      const command = matches[index];
      if (!command) return;
      command.run();
      setInput('');
      onClose();
    },
    [askIndex, input, matches, onClose, sendMessage, setInput],
  );

  // ── open / close shortcuts ──
  useEffect(() => {
    const onKey = (event) => {
      const target = event.target;
      const typing =
        target instanceof HTMLElement &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);

      const palette = event.key === 'k' && (event.metaKey || event.ctrlKey);

      if ((event.key === '/' && !typing && !isOpen) || (palette && !isOpen)) {
        event.preventDefault();
        onOpen();
        return;
      }

      if (event.key === 'Escape' && isOpen) onClose();
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (seed) setInput(seed);
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
    // `seed` is read once on open by design — later edits belong to the
    // palette input, not the hero field that started the sentence.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && mode === 'chat') {
      endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, isOpen, mode]);

  // Keep the highlighted row in view as it moves.
  useEffect(() => {
    listRef.current
      ?.querySelector('[data-cursor="true"]')
      ?.scrollIntoView({ block: 'nearest' });
  }, [active, matches]);

  const onFieldKey = (event) => {
    if (mode !== 'commands') return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setCursor((active + 1) % rowCount);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setCursor((active - 1 + rowCount) % rowCount);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      runRow(active);
    }
  };

  const submit = (event) => {
    event.preventDefault();
    if (mode === 'commands') runRow(active);
    else sendMessage(input);
  };

  return (
    <>
      {/* ── collapsed trigger ── */}
      <div className="cmd-dock" data-hidden={isOpen ? 'true' : 'false'}>
        <button
          type="button"
          className="cmd-trigger"
          onClick={onOpen}
          aria-label="Ask BharathiGPT — opens the command palette"
        >
          <span className="cmd-trigger-dot" aria-hidden="true" />
          <span className="cmd-trigger-text">Ask BharathiGPT</span>
          <kbd className="cmd-key">/</kbd>
        </button>
      </div>

      {/* ── palette ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="cmd-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) onClose();
            }}
          >
            <motion.section
              className="cmd-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.32, ease: EASE }}
            >
              <header className="cmd-head">
                <div className="cmd-head-id">
                  <span className="cmd-trigger-dot" aria-hidden="true" />
                  <span>BharathiGPT</span>
                </div>
                <div className="cmd-head-right">
                  <span className="cmd-head-hint">
                    {isThinking
                      ? 'Thinking…'
                      : mode === 'commands'
                        ? `${matches.length} command${matches.length === 1 ? '' : 's'}`
                        : 'Type to jump · or ask anything'}
                  </span>
                  <button
                    type="button"
                    className="cmd-close"
                    onClick={onClose}
                    aria-label="Close"
                  >
                    <X size={16} />
                  </button>
                </div>
              </header>

              {mode === 'commands' ? (
                <div
                  className="cmd-list"
                  ref={listRef}
                  role="listbox"
                  aria-label="Commands"
                >
                  {matches.map((command, i) => (
                    <button
                      key={command.id}
                      type="button"
                      role="option"
                      aria-selected={active === i}
                      data-cursor={active === i}
                      className="cmd-row"
                      onMouseEnter={() => setCursor(i)}
                      onClick={() => runRow(i)}
                    >
                      <span className="cmd-row-kind">{command.kind}</span>
                      <span className="cmd-row-main">
                        <span className="cmd-row-label">{command.label}</span>
                        <span className="cmd-row-hint">{command.hint}</span>
                      </span>
                      <CornerDownLeft size={14} className="cmd-row-enter" />
                    </button>
                  ))}

                  <button
                    type="button"
                    role="option"
                    aria-selected={active === askIndex}
                    data-cursor={active === askIndex}
                    className="cmd-row cmd-row--ask"
                    onMouseEnter={() => setCursor(askIndex)}
                    onClick={() => runRow(askIndex)}
                    disabled={isThinking}
                  >
                    <span className="cmd-row-kind">Ask</span>
                    <span className="cmd-row-main">
                      <span className="cmd-row-label">“{query}”</span>
                      <span className="cmd-row-hint">
                        Put the question to BharathiGPT
                      </span>
                    </span>
                    <CornerDownLeft size={14} className="cmd-row-enter" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="cmd-log">
                    {messages.map((message, index) => (
                      <div
                        key={`${message.role}-${index}`}
                        className={`cmd-msg cmd-msg--${message.role}`}
                      >
                        <span className="cmd-msg-role">
                          {message.role === 'user' ? 'You' : 'BGPT'}
                        </span>
                        <p>{message.content}</p>
                      </div>
                    ))}
                    {isThinking && (
                      <div className="cmd-msg cmd-msg--assistant">
                        <span className="cmd-msg-role">BGPT</span>
                        <p className="cmd-thinking">
                          <i />
                          <i />
                          <i />
                        </p>
                      </div>
                    )}
                    <div ref={endRef} />
                  </div>

                  <div className="cmd-chips">
                    {assistantPromptChips.map((chip) => (
                      <button
                        key={chip.label}
                        type="button"
                        className="cmd-chip"
                        onClick={() => sendMessage(chip.query)}
                        disabled={isThinking}
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </>
              )}

              <form className="cmd-form" onSubmit={submit}>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(event) => {
                    setInput(event.target.value);
                    setCursor(0);
                  }}
                  onKeyDown={onFieldKey}
                  placeholder="Type a section, a project, or a question…"
                  aria-label="Command or question"
                  autoComplete="off"
                  spellCheck="false"
                />
                <button
                  type="submit"
                  className="cmd-send"
                  disabled={isThinking || !query}
                  aria-label={mode === 'commands' ? 'Run' : 'Send'}
                >
                  <ArrowUp size={16} />
                </button>
              </form>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommandBar;
