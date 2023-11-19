import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VehicleCounter from './VehicleCount';
import Weather from './Weather';
import MapContainer from './MapContainer';
import LiveClock from './LiveClock';

const LocationTracker = () => {
  const [locationData, setLocationData] = useState({});
  const [placeName, setPlaceName] = useState({});
  const [imageUrl, setImageUrl] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [welcomeMessage, setWelcomeMessage] = useState(null);
  const [hasSpoken, setHasSpoken] = useState(false); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const newLocationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        setLocationData(newLocationData);

        const { latitude, longitude } = newLocationData;
        const apiKey = 'AIzaSyDkRb7OLdil8cgM2b5ZRvbbJYzZZvtNBBE';

        fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.results && data.results.length > 0) {
              setPlaceName(data.results[6].address_components[0].long_name);
            } else {
              setPlaceName('Location not found');
            }
          })
          .catch((error) => {
            console.error('Error fetching place name:', error);
          });
      } catch (error) {
        console.error('Error getting location:', error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchData().catch((error) => {
      console.error('Error getting location:', error);
      setError('Please enable your device location to use this feature.');
      setIsLoading(false);
    });;
  }, []); 

  useEffect(() => {
    if (!isLoading) {
      sendDataToAPI({ ...locationData, imageUrl });
    }
  }, [isLoading, locationData, imageUrl]);

    const sendDataToAPI = async () => {
    const apiUrl = 'https://zc9vil92x3.execute-api.us-east-1.amazonaws.com/dev/';
    
    const data = {
      body: JSON.stringify({
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        image_source: imageUrl,
        text: 'hello world', 
      }),
    };
  
    const headers = {
      'Content-Type': 'application/json',
    };
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Response:', responseData);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-2xl font-bold text-gray-800">Loading...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <h1 className="text-2xl font-bold uppercase text-center text-gray-800 mb-4">
            Dynamic Road Detective System
          </h1>
  
          <div className="flex flex-col items-center space-y-2 lg:space-y-4 lg:flex-row lg:space-x-4">
            <Weather className="mb-2" /> {/* Added margin bottom class */}
            <LiveClock className="mb-2" /> {/* Added margin bottom class */}
          </div>
  
          <div className="flex flex-col items-center space-y-4 text-gray-800 mt-2 lg:mt-4">
            <p className="text-2xl font-bold text-center lg:text-left uppercase mt-4 mb-4">
              You are in {placeName.toString()}
            </p>
          </div>
          <MapContainer userLocation={locationData} className="mt-4" /> {/* Added margin top class */}
          <VehicleCounter />
        </div>
      )}
    </div>
  );
  
  

};

export default LocationTracker;




  

