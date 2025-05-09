
import { useState } from "react";
import { motion } from "framer-motion";

export default function HealingJournal() {
  const [entry, setEntry] = useState("");
  const [response, setResponse] = useState("");
  const [mode, setMode] = useState("self-compassion");
  const [mood, setMood] = useState("neutral");

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
      aiReflection = \`You challenged your thought with evidence and opened space for a more balanced view. That’s powerful.\`;
    } else if (mode === "act") {
      aiReflection = \`You connected with your values and took a step aligned with who you want to be. Keep going.\`;
    } else {
      aiReflection = \`You showed up with honesty and care. What would 10% more self-kindness look like right now?\`;
    }
    setResponse(\`Mood: \${mood}\n\n\${aiReflection}\`);
  };

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
    </motion.div>
  );
}
