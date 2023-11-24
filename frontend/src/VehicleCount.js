
import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { FaCar, FaBicycle, FaTruck, FaExclamationTriangle, FaUser, FaDog, FaBus } from 'react-icons/fa';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const VehicleCounter = () => {
  const [count, setCount] = useState(0);
  const [objType, setObjType] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const socket = io('http://127.0.0.1:5000');

    socket.on('new_detection', (data) => {
      console.log('New detection:', data);
      setCount(data.count);
      setObjType(data.object_type);
      setShowAlert(true); // Show the alert when a new detection occurs

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAlert(false); 
    }, 3000);

    return () => clearTimeout(timeout);
  }, [showAlert]);

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
      <h1 className="text-xl font-bold">Total Count of objects: {count}</h1>
      {showAlert && (
        <div className="mb-4 flex items-center gap-2">
          {renderIcon()}
          <Alert severity="warning">
            <AlertTitle>Warning</AlertTitle>
            {`New detection: ${objType} incoming`}
          </Alert>
        </div>
      )}
    </div>
  );
};

export default VehicleCounter;
