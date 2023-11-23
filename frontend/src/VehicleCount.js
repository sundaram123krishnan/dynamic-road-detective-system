
import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { FaCar, FaBicycle, FaTruck, FaExclamationTriangle, FaUser, FaDog, FaBus } from 'react-icons/fa';

const VehicleCounter = () => {
  const [count, setCount] = useState(0);
  const [objType, setObjType] = useState('');
  const videoRef = useRef(null);

  useEffect(() => {
    const socket = io('http://192.168.1.102:5000');

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
    const iconSize = 80; // Set your desired icon size

    switch (objType) {
      case 'car':
        return <FaCar className="text-blue-500" size={iconSize} />;
      case 'bicycle':
        return <FaBicycle className="text-green-500" size={iconSize} />;
      case 'truck':
        return <FaTruck className="text-red-500" size={iconSize} />;
      case 'person':
        return <FaUser className="text-purple-500" size={iconSize} />;
      case 'animal':
        return <FaDog className="text-brown-500" size={iconSize} />;
      case 'bus':
        return <FaBus className="text-orange-500" size={iconSize} />;
      default:
        return <FaExclamationTriangle className="text-yellow-500" size={iconSize} />;
    }
  };


  return (
    <div className="container mx-auto p-8 gap-2 flex flex-col ">
      <h1 className="text-xl font-bold">Real-Time Detections Count of objects: {count}</h1>
      <div className="flex items-center gap-2">
        <div className="mr-4 flex flex-col items-center justify-center gap-2">
          <p className="text-lg flex flex-wrap text-center font-bold uppercase ">Object Type: {objType}</p>
          {renderIcon()}
        </div>
      </div>
    </div>
  );
};

export default VehicleCounter;
