import React, { useState, useEffect } from 'react';

function TextToSpeech() {
  const [text, setText] = useState('');
  const [speechSynthesisSupported, setSpeechSynthesisSupported] = useState(false);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      setSpeechSynthesisSupported(true);
    } else {
      console.warn('Speech synthesis is not supported in this browser.');
    }
  }, []);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSpeak = () => {
    if (speechSynthesisSupported && text.trim() !== '') {
      const speechSynthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Text to Speech Conversion</h1>
      {speechSynthesisSupported ? (
        <div className="w-full max-w-lg text-center">
          <textarea
            className="w-full h-32 p-2 border rounded-md mb-4"
            placeholder="Enter text to speak..."
            value={text}
            onChange={handleTextChange}
          ></textarea>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={handleSpeak}
          >
            Speak
          </button>
        </div>
      ) : (
        <p className="text-red-500">Speech synthesis is not supported in this browser.</p>
      )}
    </div>
  );
}

export default TextToSpeech;
