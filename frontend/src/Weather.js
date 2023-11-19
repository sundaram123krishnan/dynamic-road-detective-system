import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherForecast = () => {
  // const [forecast, setForecast] = useState(null);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const apiUrl = 'https://api.tomorrow.io/v4/weather/forecast?location=11.4102,76.69506&apikey=4aTGoP6x3MyCHa6tclW4iGsys0ahAt6Y';

  //   const fetchWeather = async () => {
  //     try {
  //       const response = await axios.get(apiUrl);
  //       console.log(response.request.response.minutely)
  //     } catch (error) {
  //       setError('Error fetching weather forecast');
  //       console.error('Error fetching weather forecast:', error);
  //     }
  //   };

  //   fetchWeather();
  // }, []);

  // if (error) {
  //   return <div>Error fetching weather forecast</div>;
  // }

  // if (!forecast) {
  //   return <div>Loading...</div>;
  // }


  return (
      <h1 className="text-lg font-bold text-center">Weather: 15 &deg;/ 59 F</h1>
  );
};

export default WeatherForecast;
