import React from 'react';
import TextToSpeech from './TextToSpeech';
import LocationTracker from './location';

function App() {
  return (
    <div className="App">
    <h1 className="bg-blue-800">Hello world</h1>
    <TextToSpeech/>
    <LocationTracker/>
    </div>
  );
}

export default App;
