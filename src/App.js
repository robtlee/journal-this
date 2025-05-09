import React, { useState } from "react";

function HealingJournal() {
  const [entry, setEntry] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = () => {
    setResponse("Thank you for your reflection. Keep going.");
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h2>🧘 Healing Journal</h2>
      <textarea
        rows={8}
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="Write your thoughts..."
        style={{ width: '100%', padding: '1rem', marginBottom: '1rem' }}
      />
      <button onClick={handleSubmit} style={{ padding: '0.5rem 1rem' }}>Submit</button>
      {response && <p style={{ marginTop: '1rem' }}>{response}</p>}
    </div>
  );
}

export default HealingJournal;
