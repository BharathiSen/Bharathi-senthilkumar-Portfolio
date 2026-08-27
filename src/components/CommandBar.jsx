import { useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, X } from 'lucide-react';
import useBharathiGpt from '../hooks/useBharathiGpt';
import './CommandBar.css';

const EASE = [0.22, 1, 0.36, 1];

/**
 * BharathiGPT, promoted out of the hero corner into a persistent command bar.
 * Collapsed it is a single mono line at the foot of the viewport; `/` or a
 * click expands it into a full panel over the page.
 */
const CommandBar = ({ open, onOpen, onClose }) => {
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
  const panelRef = useRef(null);

  // `/` opens the bar from anywhere; Escape closes it.
  useEffect(() => {
    const onKey = (event) => {
      const target = event.target;
      const typing =
        target instanceof HTMLElement &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);

      if (event.key === '/' && !typing && !open) {
        event.preventDefault();
        onOpen();
      }

      if (event.key === 'Escape' && open) {
        onClose();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onOpen, onClose]);

  // Lock the page behind the panel while it is open.
  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, open]);

  const submit = useCallback(
    (event) => {
      event.preventDefault();
      sendMessage(input);
    },
    [input, sendMessage],
  );

  return (
    <>
      {/* ── Collapsed trigger ── */}
      <div className="cmd-dock" data-hidden={open ? 'true' : 'false'}>
        <button
          type="button"
          className="cmd-trigger"
          onClick={onOpen}
          aria-label="Ask BharathiGPT"
        >
          <span className="cmd-trigger-dot" aria-hidden="true" />
          <span className="cmd-trigger-text">Ask BharathiGPT</span>
          <kbd className="cmd-key">/</kbd>
        </button>
      </div>

      {/* ── Expanded panel ── */}
      <AnimatePresence>
        {open && (
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
              ref={panelRef}
              className="cmd-panel"
              role="dialog"
              aria-modal="true"
              aria-label="BharathiGPT"
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
                    {isThinking ? 'Thinking…' : 'Grounded in the portfolio'}
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

              <form className="cmd-form" onSubmit={submit}>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about the work, the stack, or the numbers…"
                  aria-label="Ask BharathiGPT"
                />
                <button
                  type="submit"
                  className="cmd-send"
                  disabled={isThinking || !input.trim()}
                  aria-label="Send"
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
