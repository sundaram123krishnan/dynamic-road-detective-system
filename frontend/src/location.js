import React, { useState, useEffect } from 'react';

const LocationTracker = () => {
  const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    // Fetch the device's location when the component mounts
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

  const saveLocation = () => {
    if (locationData) {
      fetch('/api/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(locationData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // You can handle the response as needed
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div>
      {locationData ? (
        <div>
          <p>Latitude: {locationData.latitude}</p>
          <p>Longitude: {locationData.longitude}</p>
          <button onClick={saveLocation}>Save Location</button>
        </div>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

export default LocationTracker;
