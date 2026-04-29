import { useState, useRef, useEffect, useCallback } from "react";
import "./index.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const PERSONAS = {
  anshuman: {
    id: "anshuman",
    name: "Anshuman Singh",
    nameShort: "Anshuman",
    role: "Co-founder, Scaler Academy",
    avatar: "AS",
    tagline: "Discipline over motivation. Systems beat goals.",
    description: "IIIT Hyderabad · Ex-Facebook · Built InterviewBit & Scaler",
    chips: [
      "How did you build Scaler from scratch?",
      "How to crack a top-tier tech interview?",
      "I feel demotivated — what should I do?",
      "How to stay consistent with coding practice?"
    ],
    accent: "#6366f1"
  },
  abhimanyu: {
    id: "abhimanyu",
    name: "Abhimanyu Saxena",
    nameShort: "Abhimanyu",
    role: "Co-founder, Scaler & InterviewBit",
    avatar: "AX",
    tagline: "Score before you ask for equity. Build real things.",
    description: "IIIT Hyderabad · Ex-Facebook · Scaled Scaler to $700M+",
    chips: [
      "When should a startup raise funding?",
      "How do I stand out as a fresher?",
      "How do you think about product-market fit?",
      "How to handle failure as a founder?"
    ],
    accent: "#10b981"
  },
  kshitij: {
    id: "kshitij",
    name: "Kshitij Mishra",
    nameShort: "Kshitij",
    role: "Educator & Mentor, Scaler Academy",
    avatar: "KM",
    tagline: "Clarity beats cleverness. Break it down step by step.",
    description: "IIIT Hyderabad · DSA Expert · Taught 10,000+ engineers",
    chips: [
      "I don't understand recursion — explain it simply",
      "How should I approach a LeetCode problem?",
      "What's the best way to learn Dynamic Programming?",
      "How to get better at system design?"
    ],
    accent: "#f59e0b"
  }
};

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function App() {
  const [personaKey, setPersonaKey] = useState("anshuman");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const messagesRef = useRef([]);

  useEffect(() => { messagesRef.current = messages; }, [messages]);

  const persona = PERSONAS[personaKey];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const switchPersona = (key) => {
    setPersonaKey(key);
    setMessages([]);
    setApiError(null);
    setInput("");
    setSidebarOpen(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const sendMessage = useCallback(async (overrideText) => {
    const text = (overrideText || input).trim();
    if (!text || loading) return;

    setInput("");
    setApiError(null);

    const current = messagesRef.current;
    const history = [];
    for (let i = 0; i + 1 < current.length; i += 2) {
      if (current[i]?.role === "user" && current[i + 1]?.role === "bot") {
        history.push({ user: current[i].text, bot: current[i + 1].text });
      }
    }

    const userMsg = { role: "user", text, time: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, persona: personaKey, history })
      });

      const data = await res.json();

      if (!res.ok && res.status !== 503) {
        throw new Error(data.error || `Server error ${res.status}`);
      }

      setMessages(m => [...m, { role: "bot", text: data.reply, time: new Date() }]);

      if (data.error) {
        setApiError("API temporarily unavailable — showing a fallback response.");
      }
    } catch (err) {
      console.error(err);
      setApiError("Connection failed. Please try again.");
      setMessages(m => [...m, {
        role: "bot",
        text: "I'm having trouble connecting right now. Please try again in a moment.",
        time: new Date(),
        isError: true
      }]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [input, loading, personaKey]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleTextareaInput = (e) => {
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 140) + "px";
    setInput(el.value);
  };

  return (
    <div className="app-shell">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar ── */}
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        {/* Brand */}
        <div className="sidebar-brand">
          <div className="brand-icon">S</div>
          <div className="brand-text">
            <div className="brand-name">ScalerChat</div>
            <div className="brand-sub">AI Personas</div>
          </div>
        </div>

        <div className="sidebar-section-label">PERSONAS</div>

        {/* Persona list */}
        <nav className="persona-nav">
          {Object.values(PERSONAS).map(p => {
            const isActive = personaKey === p.id;
            return (
              <button
                key={p.id}
                onClick={() => switchPersona(p.id)}
                className={`persona-nav-item ${isActive ? "active" : ""}`}
                style={{ "--accent": p.accent }}
              >
                <div
                  className="persona-nav-avatar"
                  style={{ background: isActive ? p.accent : "transparent", color: isActive ? "#fff" : p.accent, border: `1.5px solid ${p.accent}` }}
                >
                  {p.avatar}
                </div>
                <div className="persona-nav-info">
                  <div className="persona-nav-name">{p.name}</div>
                  <div className="persona-nav-role">{p.role}</div>
                </div>
                {isActive && <div className="persona-nav-dot" style={{ background: p.accent }} />}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-divider" />
        <div className="sidebar-section-label">QUICK QUESTIONS</div>

        {/* Suggestion chips in sidebar */}
        <div className="sidebar-chips">
          {persona.chips.map((chip, i) => (
            <button
              key={i}
              onClick={() => { sendMessage(chip); setSidebarOpen(false); }}
              disabled={loading}
              className="sidebar-chip"
              style={{ "--accent": persona.accent }}
            >
              {chip}
            </button>
          ))}
        </div>

        <div className="sidebar-footer">
          Powered by Groq · Llama 3.3 70B
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="main-panel">

        {/* Top bar */}
        <header className="topbar">
          <button className="menu-btn" onClick={() => setSidebarOpen(o => !o)} aria-label="Toggle sidebar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <div className="topbar-persona">
            <div className="topbar-avatar" style={{ background: persona.accent }}>{persona.avatar}</div>
            <div>
              <div className="topbar-name">{persona.name}</div>
              <div className="topbar-meta">{persona.description}</div>
            </div>
          </div>

          <div className="topbar-actions">
            {messages.length > 0 && (
              <button
                className="clear-btn"
                onClick={() => { setMessages([]); setApiError(null); }}
              >
                New chat
              </button>
            )}
          </div>
        </header>

        {/* Error banner */}
        {apiError && (
          <div className="error-banner">
            <span>{apiError}</span>
            <button onClick={() => setApiError(null)} className="error-close">×</button>
          </div>
        )}

        {/* Chat area */}
        <div className="chat-area">
          {messages.length === 0 ? (
            <div className="empty-state">
              <div className="empty-avatar" style={{ background: persona.accent }}>{persona.avatar}</div>
              <h2 className="empty-title">Chat with {persona.name}</h2>
              <p className="empty-sub">{persona.tagline}</p>
              <p className="empty-hint">Pick a question below or type your own</p>

              <div className="empty-chips">
                {persona.chips.map((chip, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(chip)}
                    disabled={loading}
                    className="empty-chip"
                    style={{ "--accent": persona.accent }}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="messages-list">
              {messages.map((msg, i) => (
                <div key={i} className={`message-row ${msg.role}`}>
                  {msg.role === "bot" && (
                    <div
                      className="msg-avatar"
                      style={{ background: msg.isError ? "#ef4444" : persona.accent }}
                    >
                      {persona.avatar}
                    </div>
                  )}
                  <div className="msg-content">
                    {msg.role === "bot" && (
                      <div className="msg-sender">{persona.nameShort}</div>
                    )}
                    <div className={`msg-bubble ${msg.role} ${msg.isError ? "error" : ""}`}>
                      {msg.text}
                    </div>
                    <div className="msg-time">{formatTime(msg.time)}</div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="message-row bot">
                  <div className="msg-avatar" style={{ background: persona.accent }}>
                    {persona.avatar}
                  </div>
                  <div className="msg-content">
                    <div className="msg-sender">{persona.nameShort}</div>
                    <div className="typing-indicator">
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="input-area">
          <div className="input-box">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleTextareaInput}
              onKeyDown={handleKeyDown}
              placeholder={`Message ${persona.nameShort}...`}
              rows={1}
              disabled={loading}
              className="input-textarea"
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="send-btn"
              style={{ background: input.trim() && !loading ? persona.accent : undefined }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="input-hint">Enter to send · Shift+Enter for new line</div>
        </div>

      </div>
    </div>
  );
}
