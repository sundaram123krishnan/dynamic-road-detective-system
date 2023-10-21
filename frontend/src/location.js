import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoadPhoto from './RoadPhoto';


const LocationTracker = () => {
  const [locationData, setLocationData] = useState(null);
  const [placeName, setPlaceName] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationData({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
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
          // console.log(data);
        })
        .catch((error) => {
          console.error('Error fetching place name:', error);
        });
    }
  }, [locationData]);

  
  const sendLocationData = async () => {
    try {

      const response = await axios.post('https://cnp23bo3zj.execute-api.us-east-1.amazonaws.com/dev/save-location', {
        latitude: locationData.latitude,
        longitude: locationData.longitude,
      });
     
      console.log(response.data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // AxiosError specific handling
        console.error('Axios error:', error.response);
        console.error('Axios request config:', error.config);
      } else {
        // Generic error handling
        console.error('Error sending location data:', error);
      }
    }
  };
  async function sendDataToAPI() {
    const apiUrl = 'https://cnp23bo3zj.execute-api.us-east-1.amazonaws.com/dev';
  
    const data = {
      latitude: locationData.latitude, // Replace with your latitude data
      longitude: locationData.longitude, // Replace with your longitude data
      Image_source: "hello image", 
      Text: "hello text",
    };
  
    const headers = {
      'Content-Type': 'application/json',
    };
  
    try {
      const response = await axios.post(apiUrl, data, { headers });
      console.log('Response:', response.data);
      // You can handle the response here, e.g., show a success message to the user.
    } catch (error) {
      console.error('Error:', error);
      // Handle any errors, e.g., show an error message to the user.
    }
  }
  
  return (
    <div>
      {locationData ? (
        <div>
          {/* <p>Latitude: {locationData.latitude}</p>
          <p>Longitude: {locationData.longitude}</p> */}
          <p className='font-bold uppercase text-2xl text-center'>You are in {placeName}</p>
          <RoadPhoto latitude={locationData.latitude} longitude={locationData.longitude}/>
        </div>
      ) : (
        <p>Fetching location...</p>
      )}
      
      <button onClick={sendDataToAPI}>Send Location Data</button>
    </div>
  );
};

export default LocationTracker;
