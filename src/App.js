import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function HealingJournal() {
  const [entry, setEntry] = useState("");
  const [response, setResponse] = useState("");
  const [mode, setMode] = useState("self-compassion");
  const [mood, setMood] = useState("neutral");
  const [entries, setEntries] = useState(() => JSON.parse(localStorage.getItem("journalEntries")) || []);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    localStorage.setItem("journalEntries", JSON.stringify(entries));
  }, [entries]);

  const promptsByMode = {
    "self-compassion": [
      "What emotion am I feeling most strongly right now?",
      "What would I say to a friend feeling this way?",
      "What does the kindest part of me want me to know right now?"
    ],
    "cbt": [
      "What automatic thought am I having?",
      "What evidence supports or contradicts it?",
      "What’s a more balanced thought I could believe instead?"
    ],
    "act": [
      "What am I feeling right now?",
      "What value do I want to live by, even while feeling this?",
      "What’s one small action I can take toward that value today?"
    ]
  };

  const getPrompt = () => {
    const prompts = promptsByMode[mode];
    return prompts[Math.floor(Math.random() * prompts.length)];
  };

  const handleSubmit = () => {
    let aiReflection = "";
    if (mode === "cbt") {
      aiReflection = `You challenged your thought with evidence and opened space for a more balanced view. That’s powerful.`;
    } else if (mode === "act") {
      aiReflection = `You’ve connected with your values. Even amidst difficult feelings, choosing small actions that align with who you want to be is courageous.`;
    } else {
      aiReflection = `Thank you for your reflection. You’re showing up with honesty and care, and that matters.`;
    }
    const newEntry = {
      date: new Date().toLocaleString(),
      mode,
      mood,
      content: entry,
      reflection: aiReflection
    };
    setEntries([newEntry, ...entries]);
    setResponse(`Mood: ${mood}\n\n${aiReflection}`);
    setEntry("");
  };

  const handleLogin = () => {
    if (username === "robtlee" && password === "!Denver0710!") {
      setAuthenticated(true);
    } else {
      alert("Incorrect username or password");
    }
  };

  const exportEntries = () => {
    const blob = new Blob([JSON.stringify(entries, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "healing_journal_entries.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!authenticated) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} style={{ maxWidth: '400px', margin: '2rem auto', padding: '1.5rem', background: '#fff', borderRadius: '0.75rem', boxShadow: '0 0 20px rgba(0,0,0,0.1)' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>🔐 Log In to Healing Journal</h1>
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }} />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
        <button onClick={handleLogin} style={{ width: '100%', padding: '0.5rem', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '0.375rem' }}>Log In</button>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} style={{ maxWidth: '600px', margin: '2rem auto', padding: '1.5rem', background: '#f0f4f8', borderRadius: '0.75rem' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1.5rem' }}>🧘 Healing Journal</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label>Therapeutic Mode:</label>
        <select value={mode} onChange={(e) => setMode(e.target.value)} style={{ width: '100%', padding: '0.5rem' }}>
          <option value="self-compassion">Self-Compassion</option>
          <option value="cbt">CBT (Cognitive Behavioral Therapy)</option>
          <option value="act">ACT (Acceptance & Commitment)</option>
        </select>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Today's Prompt:</label>
        <p style={{ fontStyle: 'italic', color: '#1d4ed8' }}>{getPrompt()}</p>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Your Mood:</label>
        <select value={mood} onChange={(e) => setMood(e.target.value)} style={{ width: '100%', padding: '0.5rem' }}>
          <option value="peaceful">🌿 Peaceful</option>
          <option value="anxious">😰 Anxious</option>
          <option value="hopeful">🌞 Hopeful</option>
          <option value="angry">🔥 Angry</option>
          <option value="sad">😢 Sad</option>
          <option value="neutral">😐 Neutral</option>
        </select>
      </div>

      <textarea
        placeholder="Write your reflection here..."
        rows={8}
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', border: '1px solid #cbd5e1' }}
      />
      <button onClick={handleSubmit} style={{ width: '100%', padding: '0.75rem', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '0.375rem' }}>Submit Reflection</button>

      {response && (
        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
          <div style={{ marginTop: '1.5rem', background: '#fef9c3', padding: '1rem', borderRadius: '0.5rem' }}>
            <p style={{ whiteSpace: 'pre-wrap', color: '#374151' }}>{response}</p>
          </div>
        </motion.div>
      )}

      <div style={{ marginTop: '2rem' }}>
        <h3>🗂 Past Entries</h3>
        {entries.map((e, i) => (
          <div key={i} style={{ marginBottom: '1rem', padding: '1rem', background: '#fff', borderRadius: '0.5rem', boxShadow: '0 0 6px rgba(0,0,0,0.05)' }}>
            <strong>{e.date}</strong> — <em>{e.mode} / {e.mood}</em>
            <p style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>{e.content}</p>
            <p style={{ fontStyle: 'italic', color: '#4b5563' }}>{e.reflection}</p>
          </div>
        ))}
        {entries.length === 0 && <p>No past entries yet. Your journey starts today.</p>}
        <button onClick={exportEntries} style={{ marginTop: '1rem', background: '#10b981', color: '#fff', padding: '0.5rem 1rem', border: 'none', borderRadius: '0.375rem' }}>📤 Export Entries</button>
      </div>
    </motion.div>
  );
}
