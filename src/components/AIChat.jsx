import { useEffect, useRef, useState } from 'react';
import { useToast } from '../hooks/useToast.jsx';
import { marked } from 'marked';
import hljs from 'highlight.js';

const SUGGESTIONS = [
  'What are Shiva\'s skills?',
  'Write a React useEffect hook',
  'Is he available to hire?',
  'Explain async/await in JS',
  'Reverse a linked list in Python',
];

const SVG_ATTACH = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
  </svg>
);

const SVG_MIC = (
  <svg className="mic-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" y1="19" x2="12" y2="23"/>
    <line x1="8" y1="23" x2="16" y2="23"/>
  </svg>
);

const SVG_SEND = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22,2 15,22 11,13 2,9"/>
  </svg>
);

const SVG_LOADER = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
  </svg>
);

function CopyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20,6 9,17 4,12"/>
    </svg>
  );
}

const SVG_BOLT = (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
  </svg>
);

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export default function AIChat() {
  const { show: showToast } = useToast();
  const messagesBoxRef = useRef(null);
  const fileInputRef = useRef(null);
  const [messages, setMessages] = useState([
    { role: 'ai', text: "\ud83d\udc4b Hi! I'm Shiva's AI assistant. Ask me about his skills & projects, request a code snippet, upload an image or PDF, or use the mic to speak your question!" }
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    marked.setOptions({
      breaks: true,
      gfm: true,
      highlight: (code, lang) => {
        if (lang && hljs.getLanguage(lang)) {
          return hljs.highlight(code, { language: lang, ignoreIllegals: true }).value;
        }
        return hljs.highlightAuto(code).value;
      }
    });
  }, []);

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 1;
    recognition.onstart = () => setIsRecording(true);
    recognition.onresult = (e) => {
      const transcript = Array.from(e.results).map(r => r[0].transcript).join('');
      setInput(transcript);
    };
    recognition.onend = () => setIsRecording(false);
    recognition.onerror = (e) => {
      setIsRecording(false);
      if (e.error === 'not-allowed') {
        showToast('\ud83c\udf99 Microphone permission denied.');
      } else if (e.error !== 'aborted' && e.error !== 'no-speech') {
        showToast('\u26a0\ufe0f Voice error: ' + e.error);
      }
    };
    recognitionRef.current = recognition;
  }, [showToast]);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showToast('\u26a0\ufe0f File too large. Max size is 5MB.');
      return;
    }
    const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];
    if (!allowed.includes(file.type)) {
      showToast('\u26a0\ufe0f Unsupported file. Use JPG, PNG, GIF, WebP, or PDF.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      setAttachedFile({ data: base64, type: file.type, name: file.name });
      setFilePreview({ type: file.type, name: file.name, size: file.size, url: URL.createObjectURL(file) });
    };
    reader.readAsDataURL(file);
  };

  const clearAttachment = () => {
    setAttachedFile(null);
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleMic = () => {
    const rec = recognitionRef.current;
    if (!rec) return;
    if (isRecording) rec.stop();
    else rec.start();
  };

  const sendMessage = async () => {
    if (isSending) return;
    const text = input.trim();
    const hasFile = !!attachedFile;
    if (!text && !hasFile) return;

    if (isRecording && recognitionRef.current) recognitionRef.current.stop();

    const filePayload = hasFile ? { ...attachedFile } : null;

    const userMsg = {
      role: 'user',
      text: text,
      file: hasFile ? { type: attachedFile.type, name: attachedFile.name, data: attachedFile.data } : null,
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    clearAttachment();
    setIsSending(true);

    const typingId = Date.now();
    setMessages(prev => [...prev, { role: 'typing', id: typingId }]);

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, file: filePayload }),
      });
      const data = await res.json();
      setMessages(prev => {
        const filtered = prev.filter(m => m.id !== typingId);
        const reply = data.reply || data.error || 'Sorry, something went wrong. Please try again.';
        return [...filtered, { role: 'ai', text: reply }];
      });
    } catch {
      setMessages(prev => {
        const filtered = prev.filter(m => m.id !== typingId);
        return [...filtered, { role: 'ai', text: '\u26a0\ufe0f Network error — please check your connection and try again.' }];
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      { role: 'ai', text: '\ud83d\udc4b Chat cleared! Ask me about Shiva, request a code snippet, upload an image or PDF, or use the mic!' }
    ]);
    clearAttachment();
  };

  const useChip = (text) => {
    setInput(text);
  };

  const copyText = (text, btnEl, label) => {
    navigator.clipboard.writeText(text).then(() => {
      btnEl.classList.add('copied');
      btnEl.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20,6 9,17 4,12"/></svg> Copied!`;
      setTimeout(() => {
        btnEl.classList.remove('copied');
        btnEl.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> ${label}`;
      }, 2200);
    }).catch(() => showToast('\u26a0\ufe0f Could not copy to clipboard.'));
  };

  const renderMessage = (msg, idx) => {
    if (msg.role === 'typing') {
      return (
        <div className="chat-msg-wrapper ai" key={msg.id || idx}>
          <div className="chat-msg ai typing-indicator">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      );
    }

    if (msg.role === 'user') {
      return (
        <div className="chat-msg-wrapper user" key={idx}>
          <div className="chat-msg user">
            {msg.text && <span>{msg.text}</span>}
            {msg.file && msg.file.type.startsWith('image/') && (
              <div className="attached-preview">
                <img src={`data:${msg.file.type};base64,${msg.file.data}`} alt={msg.file.name} />
              </div>
            )}
            {msg.file && !msg.file.type.startsWith('image/') && (
              <div><br/><small style={{ opacity: 0.7 }}>📄 {msg.file.name}</small></div>
            )}
          </div>
        </div>
      );
    }

    // AI message
    const html = typeof marked !== 'undefined' ? marked.parse(msg.text) : msg.text;
    return (
      <div className="chat-msg-wrapper ai" key={idx}>
        <div className="chat-msg ai" dangerouslySetInnerHTML={{ __html: html }} ref={(el) => {
          if (el) {
            el.querySelectorAll('pre code').forEach(block => {
              if (typeof hljs !== 'undefined') hljs.highlightElement(block);
            });
            el.querySelectorAll('pre').forEach(pre => {
              if (pre.querySelector('.code-copy-btn')) return;
              const codeEl = pre.querySelector('code');
              const btn = document.createElement('button');
              btn.className = 'code-copy-btn';
              btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy`;
              btn.title = 'Copy code';
              btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const code = codeEl ? codeEl.innerText : pre.innerText;
                copyText(code, btn, 'Copy');
              });
              pre.appendChild(btn);
            });
          }
        }} />
        <button className="msg-copy-btn" onClick={(e) => {
          const plainText = msg.text;
          copyText(plainText, e.currentTarget, 'Copy response');
        }}>
          <CopyIcon /> Copy response
        </button>
      </div>
    );
  };

  return (
    <section className="section" id="ai-chat" aria-label="AI Chat">
      <p className="section-label">TALK TO AN AI</p>
      <h2 className="section-title">Ask My AI Assistant</h2>
      <p className="section-sub">Ask about Shiva, generate code, analyze files — a full developer assistant</p>
      <div className="chat-section-inner glass">
        <div className="chat-header-section">
          <div className="chat-status">
            <div className="chat-status-dot"></div>
            <span>AI Online — Powered by OPENROUTER</span>
          </div>
          <div className="chat-header-actions">
            <span className="chat-model-badge">{SVG_BOLT} Openrouter Free Models</span>
            <button className="chat-clear-btn" onClick={clearChat} aria-label="Clear chat history">Clear</button>
          </div>
        </div>
        <div className="chat-box" ref={messagesBoxRef} role="log" aria-live="polite" aria-label="Chat messages">
          {messages.map((msg, i) => renderMessage(msg, i))}
        </div>
        {filePreview && (
          <div className="file-preview-strip" aria-live="polite">
            <div className="file-preview-item">
              {filePreview.type.startsWith('image/') ? (
                <img src={filePreview.url} alt={filePreview.name} />
              ) : (
                <div className="file-icon">📄</div>
              )}
              <div className="file-preview-info">
                <span>{escapeHtml(filePreview.name)}</span>
                <small>{(filePreview.size / 1024).toFixed(1)} KB · {filePreview.type.split('/')[1].toUpperCase()}</small>
              </div>
              <button className="file-remove-btn" onClick={clearAttachment} title="Remove attachment">✕</button>
            </div>
          </div>
        )}
        <div className="chat-input-area">
          <div className="chat-input-row">
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} aria-hidden="true"
              accept="image/jpeg,image/png,image/gif,image/webp,application/pdf" onChange={handleFile} />
            <button className="chat-action-btn" title="Attach image or PDF" aria-label="Attach file" onClick={() => fileInputRef.current?.click()}>
              {SVG_ATTACH}
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything — code, career, projects..."
              aria-label="Chat message input"
              autoComplete="off"
              maxLength={1000}
              disabled={isSending}
            />
            <button className={`chat-action-btn mic-btn ${isRecording ? 'recording' : ''}`} onClick={handleMic} aria-label="Voice input" title="Voice input">
              {SVG_MIC}
              <span className="mic-pulse-ring"></span>
            </button>
            <button className="chat-send-btn" onClick={sendMessage} aria-label="Send message" disabled={isSending}>
              {isSending ? SVG_LOADER : SVG_SEND}
            </button>
          </div>
          <p className="chat-input-hint">
            <kbd>Enter</kbd> to send &nbsp;·&nbsp;
            <kbd>📎</kbd> Image / PDF &nbsp;·&nbsp;
            <kbd>🎙</kbd> Voice &nbsp;·&nbsp;
            Renders markdown &amp; syntax highlighting
          </p>
        </div>
        <div className="chat-suggestions">
          {SUGGESTIONS.map((chip) => (
            <button className="suggestion-chip" key={chip} onClick={() => useChip(chip)}>
              {chip}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
