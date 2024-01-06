"use client";

import { useEffect, useMemo, useState } from "react";
import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  CircleF,
} from "@react-google-maps/api";
import axios from "axios";
import Loading from "../loading";

export default function Location() {
  const [loading, setLoading] = useState(false);
  const [placeName, setPlaceName] = useState("");
  const libraries = useMemo(() => ["places"], []);

  const [locationData, setLocationData] = useState({
    latitude: 0,
    longitude: 0,
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.apiKey as string,
    libraries: libraries as any,
  });

  async function getLocationName(
    apiKey: string | undefined,
    latitude: number,
    longitude: number,
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
      console.error("Error fetching location:", error);
      return "Location not found";
    }
  }

  function displayError() {
    console.log("error occurred");
    setLoading(false);
  }

  useEffect(() => {
    if (global.navigator.geolocation) {
      global.navigator?.geolocation?.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          };
          setLocationData(pos);
          setLoading(true);
        },
        displayError,
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: Infinity,
        },
      );
    }
  }, []);

  const mapCenter = useMemo(() => {
    if (locationData.latitude !== 0 && locationData.longitude !== 0) {
      return {
        lat: locationData.latitude,
        lng: locationData.longitude,
      };
    }
  }, [locationData.latitude, locationData.longitude]);

  useEffect(() => {
    const { latitude, longitude } = locationData;
    const apiKey = process.env.apiKey as string;
    getLocationName(apiKey, latitude, longitude);
  }, [locationData]);

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    [],
  );

  while ((placeName === "" && !loading) || !isLoaded) {
    return <Loading />;
  }

  return (
    <>
      <div className="text-xl uppercase font-bold flex flex-col items-center justify-center gap-2 rounded-lg">
        You are in {placeName}
        <GoogleMap
          options={mapOptions}
          zoom={14}
          center={mapCenter}
          mapTypeId="terrain"
          mapContainerStyle={{ width: "400px", height: "350px" }}
          onLoad={() => console.log("Map Component Loaded...")}
        >
          {[1000, 2500].map((radius, idx) => (
            <CircleF
              key={idx}
              center={mapCenter}
              radius={radius}
              onLoad={() => console.log("Circle Load...")}
              options={{
                fillColor: radius > 1000 ? "red" : "green",
                strokeColor: radius > 1000 ? "red" : "green",
                strokeOpacity: 0.8,
              }}
            />
          ))}
        </GoogleMap>
      </div>
    </>
  );
}
