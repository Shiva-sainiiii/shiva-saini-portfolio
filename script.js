/* ============================================================
   SHIVA SAINI PORTFOLIO — script.js  v3.0
   Clean, modular, production-ready JavaScript
   AI Chat: multimodal, voice, markdown, syntax highlighting,
            copy buttons for code blocks & messages
   ============================================================ */

'use strict';

/* ═══════════════ PARTICLES.JS CONFIG ═══════════════ */
function initParticles() {
  if (typeof particlesJS === 'undefined') return;

  particlesJS('particles-js', {
    particles: {
      number: { value: 73, density: { enable: true, value_area: 900 } },
      color: { value: ['#8a2be2', '#00d4ff', '#a855f7'] },
      shape: { type: 'circle' },
      opacity: {
        value: .49,
        random: true,
        anim: { enable: true, speed: 0.6, opacity_min: 0.1, sync: false }
      },
      size: { value: 2.5, random: true, anim: { enable: false } },
      line_linked: { enable: true, distance: 150, color: '#8a2be2', opacity: 0.12, width: 1 },
      move: {
        enable: true, speed: 1.5, direction: 'none',
        random: true, straight: false, out_mode: 'out', bounce: false
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'grab' },
        onclick: { enable: true, mode: 'push' },
        resize: true
      },
      modes: {
        grab: { distance: 160, line_linked: { opacity: 0.35 } },
        push: { particles_nb: 3 }
      }
    },
    retina_detect: true
  });
}

/* ═══════════════ SCROLL PROGRESS BAR ═══════════════ */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const pct = document.documentElement.scrollHeight - window.innerHeight > 0
      ? (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      : 0;
    bar.style.width = `${pct}%`;
  }, { passive: true });
}

/* ═══════════════ NAVBAR ═══════════════ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}

/* ═══════════════ HAMBURGER MENU ═══════════════ */
function initHamburger() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-nav');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}
/* smooth scrolling */
function initSmoothScroll() {
  if (typeof gsap !== 'undefined') gsap.registerPlugin(ScrollToPlugin);

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      if (typeof gsap !== 'undefined') {
        gsap.to(window, {
          duration: 0.9,
          scrollTo: { y: target, offsetY: 66 },
          ease: 'power3.inOut'
        });
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
/* existing code */
window.closeMobileNav = function () {
  const menu = document.getElementById('mobile-nav');
  const btn  = document.getElementById('hamburger');
  if (menu) menu.classList.remove('open');
  if (btn)  { btn.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
};

/* ═══════════════ TYPING EFFECT ═══════════════ */
function initTyping() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const phrases = ['Frontend Developer', 'UI/UX Enthusiast', 'AI Explorer', 'Creative Coder', 'Problem Solver'];
  let phraseIdx = 0, charIdx = 0, deleting = false;

  function tick() {
    const current = phrases[phraseIdx];
    el.textContent = deleting ? current.slice(0, charIdx--) : current.slice(0, charIdx++);
    let delay = deleting ? 60 : 100;
    if (!deleting && charIdx === current.length + 1) { delay = 1800; deleting = true; }
    else if (deleting && charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; delay = 400; }
    setTimeout(tick, delay);
  }
  tick();
}

/* ═══════════════ GSAP SCROLL ANIMATIONS ═══════════════ */
function initGSAP() {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  document.querySelectorAll('.section').forEach(sec => {
    gsap.from(sec, {
      scrollTrigger: { trigger: sec, start: isMobile ? 'top 100%' : 'top 85%', once: true },
      opacity: 0, y: 30, duration: 0.65, ease: 'power3.out',
      clearProps: 'opacity,transform'
    });
  });

  if (!isMobile) {
    gsap.from('.project-card', {
      scrollTrigger: { trigger: '.project-container', start: 'top 82%', once: true, invalidateOnRefresh: true },
      opacity: 0, y: 50, stagger: 0.12, duration: 0.7, ease: 'power3.out',
      clearProps: 'opacity,transform'
    });

    gsap.from('.skill-group', {
      scrollTrigger: { trigger: '.skills-wrapper', start: 'top 82%', once: true, invalidateOnRefresh: true },
      opacity: 0, y: 36, stagger: 0.1, duration: 0.65, ease: 'power3.out',
      clearProps: 'opacity,transform'
    });
  }

  gsap.from('.highlight-card', {
    scrollTrigger: { trigger: '.highlight-container', start: isMobile ? 'top 100%' : 'top 88%', once: true, invalidateOnRefresh: true },
    opacity: 0, scale: 0.92, stagger: 0.1, duration: 0.55, ease: 'back.out(1.4)',
    clearProps: 'opacity,transform'
  });

  gsap.from('.certificate-card', {
    scrollTrigger: { trigger: '.cert-grid', start: isMobile ? 'top 100%' : 'top 80%', once: true, invalidateOnRefresh: true },
    opacity: 0, y: 30, stagger: 0.1, duration: 0.6, ease: 'power3.out',
    clearProps: 'opacity,transform'
  });

  gsap.from('.stat-item', {
    scrollTrigger: { trigger: '.about-stats', start: isMobile ? 'top 100%' : 'top 82%', once: true, invalidateOnRefresh: true },
    opacity: 0, x: 30, stagger: 0.12, duration: 0.6, ease: 'power3.out',
    clearProps: 'opacity,transform'
  });

  setTimeout(() => ScrollTrigger.refresh(), 400);
}

/* ═══════════════ CERTIFICATE LIGHTBOX ═══════════════ */
function initLightbox() {
  const lightbox    = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  if (!lightbox || !lightboxImg) return;

  window.openImg = function (card) {
    const img = card.querySelector('img');
    if (!img || !img.src || img.naturalWidth === 0) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeLightbox = function () {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') window.closeLightbox();
  });

  document.querySelectorAll('.certificate-card').forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.openImg(card); }
    });
  });
}

/* ═══════════════ TOAST ═══════════════ */
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ═══════════════ AI CHAT v3.0 ═══════════════ */
function initAiChat() {
  const messagesBox  = document.getElementById('chat-messages');
  const input        = document.getElementById('chat-input');
  const sendBtn      = document.getElementById('send-btn');
  const clearBtn     = document.getElementById('clearChat');
  const micBtn       = document.getElementById('mic-btn');
  const fileAttachBtn = document.getElementById('file-attach-btn');
  const fileInput    = document.getElementById('file-input');
  const filePreview  = document.getElementById('file-preview');

  if (!messagesBox || !input || !sendBtn) return;

  // ── Configure marked.js ─────────────────────────────────
  if (typeof marked !== 'undefined') {
    marked.setOptions({
      breaks: true,
      gfm: true,
      highlight: function (code, lang) {
        if (typeof hljs !== 'undefined' && lang && hljs.getLanguage(lang)) {
          return hljs.highlight(code, { language: lang, ignoreIllegals: true }).value;
        }
        return typeof hljs !== 'undefined' ? hljs.highlightAuto(code).value : code;
      }
    });
  }

  let attachedFile = null;  // { data: base64, type: mimeType, name: fileName }
  let isSending    = false;
  let recognition  = null;
  let isRecording  = false;

  // ── Copy helper ─────────────────────────────────────────
  function copyText(text, btn, label = 'Copy') {
    navigator.clipboard.writeText(text).then(() => {
      btn.classList.add('copied');
      btn.innerHTML = `${copyIcon()} Copied!`;
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = `${copyIcon()} ${label}`;
      }, 2200);
    }).catch(() => showToast('⚠️ Could not copy to clipboard.'));
  }

  function copyIcon() {
    return `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
  }

  function checkIcon() {
    return `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20,6 9,17 4,12"/></svg>`;
  }

  // ── Append plain text message ────────────────────────────
  function appendMsg(text, role) {
    const wrapper = document.createElement('div');
    wrapper.className = `chat-msg-wrapper ${role}`;

    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${role}`;
    msgDiv.textContent = text;
    wrapper.appendChild(msgDiv);

    messagesBox.appendChild(wrapper);
    messagesBox.scrollTop = messagesBox.scrollHeight;
    return wrapper;
  }

  // ── Render AI markdown response with copy buttons ────────
  function renderAiMessage(rawText) {
    const wrapper = document.createElement('div');
    wrapper.className = 'chat-msg-wrapper ai';

    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-msg ai';

    // Parse markdown → HTML
    if (typeof marked !== 'undefined') {
      msgDiv.innerHTML = marked.parse(rawText);
    } else {
      // Fallback: plain text
      msgDiv.textContent = rawText;
    }

    wrapper.appendChild(msgDiv);

    // Apply syntax highlighting to all code blocks
    if (typeof hljs !== 'undefined') {
      msgDiv.querySelectorAll('pre code').forEach(block => {
        hljs.highlightElement(block);
      });
    }

    // ── Add copy button to each code block ─────────────────
    msgDiv.querySelectorAll('pre').forEach(pre => {
      const codeEl  = pre.querySelector('code');
      const copyBtn = document.createElement('button');
      copyBtn.className   = 'code-copy-btn';
      copyBtn.innerHTML   = `${copyIcon()} Copy`;
      copyBtn.title       = 'Copy code';
      copyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const code = codeEl ? (codeEl.innerText || codeEl.textContent) : (pre.innerText || pre.textContent);
        copyText(code, copyBtn, 'Copy');
      });
      pre.appendChild(copyBtn);
    });

    // ── Add "Copy Response" button below the message ────────
    const msgCopyBtn = document.createElement('button');
    msgCopyBtn.className = 'msg-copy-btn';
    msgCopyBtn.innerHTML = `${copyIcon()} Copy response`;
    msgCopyBtn.addEventListener('click', () => {
      const plainText = msgDiv.innerText || msgDiv.textContent;
      copyText(plainText, msgCopyBtn, 'Copy response');
    });

    wrapper.appendChild(msgCopyBtn);
    messagesBox.appendChild(wrapper);
    messagesBox.scrollTop = messagesBox.scrollHeight;

    return wrapper;
  }

  // ── Typing indicator ─────────────────────────────────────
  function showTyping() {
    const wrapper = document.createElement('div');
    wrapper.className = 'chat-msg-wrapper ai';
    wrapper.id = 'typing-indicator';
    wrapper.innerHTML = `
      <div class="chat-msg ai typing-indicator">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>`;
    messagesBox.appendChild(wrapper);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  function removeTyping() {
    const t = document.getElementById('typing-indicator');
    if (t) t.remove();
  }

  // ── File handling ─────────────────────────────────────────
  fileAttachBtn.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 5MB max
    if (file.size > 5 * 1024 * 1024) {
      showToast('⚠️ File too large. Max size is 5MB.');
      fileInput.value = '';
      return;
    }

    const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];
    if (!allowed.includes(file.type)) {
      showToast('⚠️ Unsupported file. Use JPG, PNG, GIF, WebP, or PDF.');
      fileInput.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      attachedFile  = { data: base64, type: file.type, name: file.name };
      renderFilePreview(file);
    };
    reader.onerror = () => showToast('❌ Could not read file. Try again.');
    reader.readAsDataURL(file);
  });

  function renderFilePreview(file) {
    filePreview.innerHTML = '';
    filePreview.style.display = 'flex';

    const item = document.createElement('div');
    item.className = 'file-preview-item';

    const isImage = file.type.startsWith('image/');

    if (isImage) {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      img.alt = file.name;
      img.onload = () => URL.revokeObjectURL(img.src);
      item.appendChild(img);
    } else {
      const icon = document.createElement('div');
      icon.className   = 'file-icon';
      icon.textContent = '📄';
      item.appendChild(icon);
    }

    const info = document.createElement('div');
    info.className = 'file-preview-info';
    info.innerHTML = `<span>${escapeHtml(file.name)}</span><small>${(file.size / 1024).toFixed(1)} KB · ${file.type.split('/')[1].toUpperCase()}</small>`;
    item.appendChild(info);

    const removeBtn = document.createElement('button');
    removeBtn.className   = 'file-remove-btn';
    removeBtn.textContent = '✕';
    removeBtn.title       = 'Remove attachment';
    removeBtn.addEventListener('click', clearAttachment);
    item.appendChild(removeBtn);

    filePreview.appendChild(item);
  }

  function clearAttachment() {
    attachedFile    = null;
    fileInput.value = '';
    filePreview.innerHTML = '';
    filePreview.style.display = 'none';
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // ── Voice input (Web Speech API) ──────────────────────────
  function initVoice() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SR) {
      // Browser doesn't support — hide mic button
      if (micBtn) micBtn.style.display = 'none';
      return;
    }

    recognition = new SR();
    recognition.continuous     = false;
    recognition.interimResults = true;
    recognition.lang           = 'en-US';
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      isRecording = true;
      micBtn.classList.add('recording');
      micBtn.setAttribute('aria-label', 'Stop recording');
      micBtn.title = 'Stop recording';
    };

    recognition.onresult = (e) => {
      const transcript = Array.from(e.results)
        .map(r => r[0].transcript)
        .join('');
      input.value = transcript;
      input.focus();
    };

    recognition.onend = () => {
      isRecording = false;
      micBtn.classList.remove('recording');
      micBtn.setAttribute('aria-label', 'Voice input');
      micBtn.title = 'Voice input';
    };

    recognition.onerror = (e) => {
      isRecording = false;
      micBtn.classList.remove('recording');
      if (e.error === 'not-allowed') {
        showToast('🎙 Microphone permission denied. Please allow it in browser settings.');
      } else if (e.error !== 'aborted' && e.error !== 'no-speech') {
        showToast(`⚠️ Voice error: ${e.error}`);
      }
    };

    micBtn.addEventListener('click', () => {
      if (isRecording) {
        recognition.stop();
      } else {
        try {
          recognition.start();
        } catch {
          showToast('⚠️ Could not start voice input. Try again.');
        }
      }
    });
  }

  initVoice();

  // ── Send message ──────────────────────────────────────────
  async function sendMessage() {
    if (isSending) return;

    const text    = input.value.trim();
    const hasFile = !!attachedFile;

    if (!text && !hasFile) return;

    // Stop any ongoing voice recording
    if (isRecording && recognition) recognition.stop();

    isSending        = true;
    input.value      = '';
    input.disabled   = true;
    sendBtn.disabled = true;
    sendBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;

    // ── Show user bubble ─────────────────────────────────────
    const userWrapper = document.createElement('div');
    userWrapper.className = 'chat-msg-wrapper user';

    const userMsg = document.createElement('div');
    userMsg.className = 'chat-msg user';

    if (text) userMsg.textContent = text;

    // Inline image preview in user bubble
    if (hasFile && attachedFile.type.startsWith('image/')) {
      const previewImg = document.createElement('div');
      previewImg.className = 'attached-preview';
      previewImg.innerHTML = `<img src="data:${attachedFile.type};base64,${attachedFile.data}" alt="${escapeHtml(attachedFile.name)}" />`;
      if (text) userMsg.appendChild(previewImg);
      else      userMsg.innerHTML = previewImg.innerHTML;
    } else if (hasFile) {
      const fileTag = document.createElement('div');
      fileTag.innerHTML = `<br/><small style="opacity:0.7">📄 ${escapeHtml(attachedFile.name)}</small>`;
      userMsg.appendChild(fileTag);
    }

    userWrapper.appendChild(userMsg);
    messagesBox.appendChild(userWrapper);
    messagesBox.scrollTop = messagesBox.scrollHeight;

    // Save file payload then clear attachment UI
    const filePayload = hasFile ? { ...attachedFile } : null;
    clearAttachment();

    // Show typing dots
    showTyping();

    try {
      const res = await fetch('/api/ask', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ message: text, file: filePayload })
      });

      const data = await res.json();
      removeTyping();

      const reply = data.reply || data.error || 'Sorry, something went wrong. Please try again.';
      renderAiMessage(reply);

    } catch {
      removeTyping();
      renderAiMessage('⚠️ Network error — please check your connection and try again.');
    } finally {
      isSending        = false;
      input.disabled   = false;
      sendBtn.disabled = false;
      sendBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9"/></svg>`;
      input.focus();
    }
  }

  // ── Event bindings ────────────────────────────────────────
  sendBtn.addEventListener('click', sendMessage);

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      messagesBox.innerHTML = '';
      clearAttachment();
      const wrapper = document.createElement('div');
      wrapper.className = 'chat-msg-wrapper ai';
      wrapper.innerHTML = `<div class="chat-msg ai">👋 Chat cleared! Ask me about Shiva, request a code snippet, upload an image or PDF, or use the mic!</div>`;
      messagesBox.appendChild(wrapper);
    });
  }
}

/* Suggestion chips */
window.useChip = function (btn) {
  const input = document.getElementById('chat-input');
  if (input) {
    input.value = btn.textContent.trim();
    input.focus();
  }
};

/* ═══════════════ YEAR IN FOOTER ═══════════════ */
function initFooterYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ═══════════════ IMAGE ERROR FALLBACKS ═══════════════ */
function initImageFallbacks() {
  document.querySelectorAll('.project-img-wrap img').forEach(img => {
    img.addEventListener('error', () => img.parentElement.classList.add('img-fallback'));
  });
  document.querySelectorAll('.certificate-card img').forEach(img => {
    img.addEventListener('error', () => img.closest('.certificate-card').classList.add('cert-fallback'));
  });
}

/* ═══════════════ BOOT ═══════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll(); // ← yahan add karo
  initScrollProgress();
  initNavbar();
  initHamburger();
  initTyping();
  initLightbox();
  initAiChat();
  initFooterYear();
  initImageFallbacks();
});


window.addEventListener('load', () => {
  initParticles();
  initGSAP();
});
       
