import { useEffect, useRef, useState } from 'react';
import { useToast } from '../hooks/useToast.jsx';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, orderBy, query, limit, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB9uCmYs0teDFqq2Gz-AbOjP35YnVSwaBc",
  authDomain: "portfolio-shivasaini.firebaseapp.com",
  projectId: "portfolio-shivasaini",
  storageBucket: "portfolio-shivasaini.firebasestorage.app",
  messagingSenderId: "302309151982",
  appId: "1:302309151982:web:cb3abc344cb10d2b1f4fff",
  measurementId: "G-6DQENZQ9W3"
};

let db = null;
try {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  console.info('[Firebase] Firestore initialized successfully.');
} catch (err) {
  console.error('[Firebase] Initialization failed:', err.message);
  db = null;
}

const COLLECTION = 'feedback';

async function saveFeedback(name, message) {
  if (!db) return { ok: false, reason: 'db_unavailable' };
  try {
    await addDoc(collection(db, COLLECTION), { name: name.trim(), message: message.trim(), createdAt: serverTimestamp() });
    return { ok: true };
  } catch (err) {
    console.error('[Firebase] saveFeedback error:', err.message);
    return { ok: false, reason: 'write_error' };
  }
}

async function loadFeedback(max = 20) {
  if (!db) return [];
  try {
    const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'), limit(max));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error('[Firebase] loadFeedback error:', err.message);
    return [];
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export default function Feedback() {
  const { show: showToast } = useToast();
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    loadFeedback().then(setItems);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    const n = name.trim();
    const m = msg.trim();
    if (!n || n.length < 2) { showToast('\u26a0\ufe0f Please enter your name (min. 2 characters).'); return; }
    if (!m || m.length < 5) { showToast('\u26a0\ufe0f Message is too short (min. 5 characters).'); return; }
    if (m.length > 500) { showToast('\u26a0\ufe0f Message too long (max 500 characters).'); return; }

    setIsSubmitting(true);
    const result = await saveFeedback(n, m);
    setIsSubmitting(false);

    if (result.ok) {
      setName('');
      setMsg('');
      showToast('\u2705 Feedback submitted — thank you!');
      const updated = await loadFeedback();
      setItems(updated);
    } else if (result.reason === 'db_unavailable') {
      showToast('\u274c Database unavailable. Please try again later.');
    } else {
      showToast('\u274c Submission failed. Please try again.');
    }
  };

  return (
    <section className="section" id="feedback" ref={sectionRef} aria-label="Feedback">
      <p className="section-label">YOUR THOUGHTS</p>
      <h2 className="section-title">Leave Feedback</h2>
      <p className="section-sub">Your message means a lot — let me know what you think!</p>
      <div className="feedback-inner glass">
        <form id="feedbackForm" noValidate autoComplete="off" onSubmit={handleSubmit}>
          <input
            type="text"
            id="fb-name"
            placeholder="Your name"
            aria-label="Your name"
            required
            maxLength={60}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            id="fb-msg"
            placeholder="Your feedback or message..."
            aria-label="Your message"
            rows={4}
            required
            maxLength={500}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button type="submit" disabled={isSubmitting}>
            <span>{isSubmitting ? 'Sending...' : 'Send Feedback'}</span>
            <span>✦</span>
          </button>
        </form>
        <div className="feedback-display">
          <h3>What others are saying</h3>
          <ul id="feedback-list" aria-label="Feedback list" role="list">
            {items.length === 0 && <li style={{ color: 'rgba(240,240,255,0.3)', fontSize: '0.84rem' }}>No feedback yet — be the first!</li>}
            {items.map((item) => (
              <li key={item.id}>
                <strong>{escapeHtml(item.name)}</strong>
                {escapeHtml(item.message)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
