import React, { useState, useRef } from 'react';

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [speed, setSpeed] = useState(1);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const handleSpeak = () => {
    if (!text.trim()) return;

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speed; // 0.5 slow | 1 normal | 1.5 fast
    utterance.lang = 'en-US';

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <div style={{ maxWidth: '600px', padding: '16px', backgroundColor:"lightcyan"}}>
      <h3>Text to Speech</h3>

      <textarea
        rows={6}
        style={{ width: '100%', padding: '10px' }}
        placeholder="Paste text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div style={{ marginTop: '12px', display: 'flex', gap: '10px' }}>
        <select
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        >
          <option value={0.75}>Slow</option>
          <option value={1}>Medium</option>
          <option value={1.25}>Fast</option>
        </select>

        <button onClick={handleSpeak}>▶ Start Reading</button>
        <button onClick={handleStop}>⏹ Stop</button>
      </div>
    </div>
  );
};

export default TextToSpeech;
