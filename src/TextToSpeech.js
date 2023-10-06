import React, { useState, useEffect } from 'react';

function TextToSpeech() {
  const [text, setText] = useState('');
  const [speechSynthesisSupported, setSpeechSynthesisSupported] = useState(false);

  // Check if the Speech Synthesis API is supported in the browser
  useEffect(() => {
    if ('speechSynthesis' in window) {
      setSpeechSynthesisSupported(true);
    } else {
      console.warn('Speech synthesis is not supported in this browser.');
    }
  }, []);

  // Function to handle text input change
  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  // Function to handle text-to-speech conversion
  const handleSpeak = () => {
    if (speechSynthesisSupported && text.trim() !== '') {
      const speechSynthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div>
      <h1>Text to Speech Conversion</h1>
      {speechSynthesisSupported ? (
        <div>
          <textarea
            placeholder="Enter text to speak..."
            value={text}
            onChange={handleTextChange}
          ></textarea>
          <button onClick={handleSpeak}>Speak</button>
        </div>
      ) : (
        <p>Speech synthesis is not supported in this browser.</p>
      )}
    </div>
  );
}

export default TextToSpeech;
