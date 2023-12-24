"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Loading from "../loading";

export default function Location() {
  const [loading, setLoading] = useState(false);
  const [placeName, setPlaceName] = useState("");

  const [locationData, setLocationData] = useState({
    latitude: 0,
    longitude: 0,
  });

  async function getLocationName(
    apiKey: string | undefined,
    latitude: number,
    longitude: number
  ) {
    const baseUrl = "https://maps.googleapis.com/maps/api/geocode/json";
    const params = {
      latlng: `${latitude},${longitude}`,
      key: apiKey,
    };
    try {
      const response = await axios.get(baseUrl, { params });
      if (response.status === 200) {
        const data = response.data;
        if (data.status === "OK") {
          const locationName = data.results[6].formatted_address.split(",");
          setPlaceName(locationName[0]);
        } else {
          return "Location not found";
        }
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return "error";
    }
  }

  function displayError() {
    //TODO: Error display
    console.log("error occured");
  }

  useEffect(() => {
    if (global.navigator.geolocation) {
      global.navigator.geolocation?.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          };
          setLocationData(pos);
          setLoading(true);
        }
      ),
        displayError,
        {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: Infinity,
        };
    }
  }, []);

  if (loading) {
    const { latitude, longitude } = locationData;
    if (latitude !== 0 && longitude !== 0) {
      const apiKey = process.env.apiKey;
      const response = getLocationName(apiKey, latitude, longitude);
    }
  }

  {
    while (placeName === "") {
      return <Loading />;
    }
  }
  return (
    <div className="text-xl uppercase font-bold">You are in {placeName}</div>
  );
}
