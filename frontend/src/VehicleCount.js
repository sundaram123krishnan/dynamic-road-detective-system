// import React, { useState, useEffect, useRef } from 'react';

// const VehicleCount = () => {
//   const [vehicleCount, setVehicleCount] = useState(0);
//   const spokenRef = useRef(false);

//   useEffect(() => {
//     const speakMessage = (message) => {
//       const speechSynthesis = window.speechSynthesis;
//       const utterance = new SpeechSynthesisUtterance(message);
//       speechSynthesis.speak(utterance);
//     };

//     const updateVehicleCount = () => {
//       const vehicles = Math.floor(Math.random() * 4);
//       setVehicleCount(vehicles);

//       if (vehicles > 0 && !spokenRef.current) {
//         speakMessage(`Caution, ${vehicles} vehicles ahead. Drive with care.`);
//         spokenRef.current = true; // Set as spoken
//       } else if (vehicles === 0) {
//         spokenRef.current = false; // Reset spoken status
//       }
//     };

//     const intervalId = setInterval(updateVehicleCount, 4000);

//     updateVehicleCount(); // Initial count check

//     return () => {
//       clearInterval(intervalId);
//     };
//   }, []);

//   return (
//     <div>
//       <p className='uppercase text-lg font-bold'>Vehicle Count: {vehicleCount}</p>
//     </div>
//   );
// };

// export default VehicleCount;


import React, { useState, useEffect } from 'react';

const VehicleCounter = () => {
  const [vehicleCount, setVehicleCount] = useState(0);
  const [randomSpeech, setRandomSpeech] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setVehicleCount(Math.floor(Math.random() * 3));
    }, 4000);
    let randomSpeech = "";
    if (vehicleCount > 0) {
      const vehicles = vehicleCount
      if (vehicles==1) {
        randomSpeech = 'Caution 1 vehicle ahead'
      }
      else if(vehicles==2) {
        randomSpeech = 'Caution 2 vehicles ahead';
      }
      else {
        randomSpeech = 'Caution 3 vehicles ahead';
      }
      setRandomSpeech(randomSpeech[Math.floor(Math.random() * randomSpeech.length)]);

      const msg = new SpeechSynthesisUtterance(randomSpeech);
      speechSynthesis.speak(msg);
    }

    return () => clearInterval(interval);
  }, [vehicleCount]);

  return (
    <div>
      <p className='font-bold text-xl uppercase text-gray-800'>Vehicle count: {vehicleCount}</p>
    </div>
  );
};

export default VehicleCounter;

