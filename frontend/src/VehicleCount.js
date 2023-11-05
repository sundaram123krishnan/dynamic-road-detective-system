import React, { useState, useEffect, useRef } from 'react';

const VehicleCount = () => {
  const [vehicleCount, setVehicleCount] = useState(0);
  const spokenRef = useRef(false);

  useEffect(() => {
    const speakMessage = (message) => {
      const speechSynthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(message);
      speechSynthesis.speak(utterance);
    };

    const updateVehicleCount = () => {
      const vehicles = Math.floor(Math.random() * 4);
      setVehicleCount(vehicles);
      if (vehicles > 0 && !spokenRef.current) {
        spokenRef.current = true;
        speakMessage('Stop! A vehicle is in the way. Move forward with caution.');
      } else if (vehicles === 0) {
        spokenRef.current = false;
      }
    };

    const intervalId = setInterval(updateVehicleCount, 2000);

    updateVehicleCount();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <p className='uppercase text-lg font-bold'>Vehicle Count: {vehicleCount}</p>
    </div>
  );
};

export default VehicleCount;
