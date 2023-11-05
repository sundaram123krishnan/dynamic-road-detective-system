import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VehicleCount from './VehicleCount';


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
      // Handle errors when accessing location
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

  useEffect(() => {
    if (!isLoading) {
      const unsplashAccessKey = 'jqMGMmZjaap48DsE7mlb6F2UhWXALiYcB0Ge7SS1qLQ';
      axios
        .get('https://api.unsplash.com/photos/random', {
          params: {
            client_id: unsplashAccessKey,
            query: 'city', 
          },
        })
        .then((response) => {
          const imageSrc = response.data.urls.regular;
          setImageUrl(imageSrc);
        })
        .catch((error) => {
          console.error('Error fetching image from Unsplash:', error);
        });
    }
  }, [locationData, placeName]);

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

  useEffect(() => {
    if (!isLoading && !hasSpoken && !error) {
      const welcomeText = `Welcome to nilgiri district, ooty, The weather here is 23 degrees. Please Don't drink and drive`;
      
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(welcomeText);

        speechSynthesis.speak(utterance);

        setHasSpoken(true);
      }
    }
  }, [isLoading, placeName, hasSpoken]);



  return (
    <div className="min-h-screen bg-gray-100">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-2xl font-bold">Loading...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-5 lg:space-y-10">
          <h1 className="text-3xl font-bold uppercase text-center">
            Dynamic Road Detective System
          </h1>
          <div className="flex flex-col items-center space-y-5 lg:space-y-10">
            <p className="text-2xl font-bold text-center lg:text-left">
              You are in {placeName.toString()}
            </p>
            <img
              src="abc.jpeg"
              alt="Location"
              className="w-full lg:w-64 h-auto rounded-md shadow-md max-w-screen-md"
            />
          </div>
          <VehicleCount />
        </div>
      )}
    </div>
  );

};

export default LocationTracker;




  

