import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UnsplashImage from './UnsplashImage';



const LocationTracker = () => {
  const [locationData, setLocationData] = useState(null);
  const [placeName, setPlaceName] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setLocationData({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        // Call the API function right here after obtaining the location data
        await sendDataToAPI();
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  useEffect(() => {
    // Use the Google Maps Geocoding API to convert coordinates into a place name
    if (locationData) {
      const { latitude, longitude } = locationData;
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

      // Fetch an image from Unsplash
      const unsplashAccessKey = 'jqMGMmZjaap48DsE7mlb6F2UhWXALiYcB0Ge7SS1qLQ';
      axios
        .get('https://api.unsplash.com/photos/random', {
          params: {
            client_id: unsplashAccessKey,
            query: placeName, // Use the place name as a search query
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
        parameter2: 'Value2', 
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
    <div className='flex flex-col items-center justify-center gap-5'>
      {locationData ? (
        <div>
          <p className='font-bold uppercase text-2xl text-center'>
            You are in {placeName}
          </p>
          {imageUrl && (
            <img
            src={imageUrl}
            alt="Location"
            style={{ width: '400px', height: '400px' }}
          />
          )}
        </div>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

export default LocationTracker;
