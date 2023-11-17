
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { FaCar, FaBicycle, FaTruck, FaExclamationTriangle } from 'react-icons/fa';

const VehicleCounter = () => {
  const [count, setCount] = useState(0);
  const [objType, setObjType] = useState('');

  useEffect(() => {
    const socket = io('http://localhost:5000');
    socket.on('new_detection', (data) => {
      console.log('New detection:', data);
      setCount(data.count);
      setObjType(data.object_type);

      speakObjectType(data.object_type);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const speakObjectType = (type) => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(`Caution! ${type} detected.`);
      synth.speak(utterance);
    }
  };

  const renderIcon = () => {
    switch (objType) {
      case 'car':
        return <FaCar className="text-blue-500" size={30} />;
      case 'bicycle':
        return <FaBicycle className="text-green-500" size={30} />;
      case 'truck':
        return <FaTruck className="text-red-500" size={30} />;
      default:
        return <FaExclamationTriangle className="text-yellow-500" size={30} />;
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Real-Time Detections Count: {count}</h1>
      <div className="flex items-center">
        {objType && (
          <>
            <p className="text-lg mr-4">Object Type: {objType}</p>
            {renderIcon()}
          </>
        )}
      </div>
    </div>
  );
};

export default VehicleCounter;









