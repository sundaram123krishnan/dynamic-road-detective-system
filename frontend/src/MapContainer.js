// import React, { useEffect, useState } from 'react';
// import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
// import { useLoadScript } from '@react-google-maps/api';

// const libraries = ['places', 'geometry'];

// const MapWithRoute = ({ userLocation }) => {
//   const [map, setMap] = useState(null);
//   const [directions, setDirections] = useState(null);

//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: 'AIzaSyDkRb7OLdil8cgM2b5ZRvbbJYzZZvtNBBE',
//     libraries: libraries, 
//   });

//   const onMapLoad = (map) => {
//     setMap(map);
//   };

//   let lat = parseFloat(userLocation.latitude).toFixed(6);
//   let lng = parseFloat(userLocation.longitude).toFixed(6);

//   useEffect(() => {
//     if (map && userLocation) {
//       const directionsService = new window.google.maps.DirectionsService();

//       directionsService.route(
//         {
//           origin: {
//             lat: Number(lat),
//             lng: Number(lng),
//           },
//           destination: {
//             lat: Number(23.0834),
//             lng: Number(80.2343),
//           },
//           travelMode: window.google.maps.TravelMode.DRIVING,
//         },
//         (result, status) => {
//           if (status === window.google.maps.DirectionsStatus.OK) {
//             setDirections(result);
//             console.log(directions)
//           } else {
//             console.error(`Directions request failed due to ${status}`);
//           }
//         }
//       );
//     }
//   }, [map, userLocation]);

//   if (loadError) return 'Error loading maps';
//   if (!isLoaded) return 'Loading maps';

//   return (
//     <GoogleMap
//       center={{
//         lat: Number(lat),
//         lng: Number(lng),
//       }}
//       zoom={13}
//       onLoad={onMapLoad}
//       mapContainerStyle={{ minHeight: '300px', height: '100%', width: '100%', padding: '0 25px' }}
//     >
//       {userLocation && <Marker position={{ lat: Number(lat), lng: Number(lng) }} />}
//       {directions && (
//         <Polyline
//           path={directions.routes[0].overview_path}
//           options={{
//             strokeColor: '#0000FF',
//             strokeOpacity: 0.7,
//             strokeWeight: 5,
//           }}
//         />
//       )}
//     </GoogleMap>
//   );
// };

// export default MapWithRoute;

// MapWithRoute.js
// MapWithRoute.js
import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
import { useLoadScript } from '@react-google-maps/api';

// Define the loadScriptConfig outside of the component
const loadScriptConfig = {
  googleMapsApiKey: 'AIzaSyDkRb7OLdil8cgM2b5ZRvbbJYzZZvtNBBE',
  libraries: ['places', 'geometry'],
};

const MapWithRoute = ({ userLocation }) => {
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [cameraLocations, setCameraLocations] = useState([]);

  const { isLoaded, loadError } = useLoadScript(loadScriptConfig);

  let lat = parseFloat(userLocation.latitude).toFixed(6);
  let lng = parseFloat(userLocation.longitude).toFixed(6);

  const randomLocation = () => ({
    lat: parseFloat(lat) + (Math.random() - 0.5) * 0.02,
    lng: parseFloat(lng) + (Math.random() - 0.5) * 0.02,
  });

  useEffect(() => {
    if (isLoaded) {
      const randomCameras = Array.from({ length: 5 }, () => randomLocation());
      setCameraLocations(randomCameras);

      const directionsService = new window.google.maps.DirectionsService();

      const randomDestination = randomCameras[Math.floor(Math.random() * randomCameras.length)];

      directionsService.route(
        {
          origin: { lat: Number(lat), lng: Number(lng) },
          destination: new window.google.maps.LatLng(
            randomDestination.lat,
            randomDestination.lng
          ),
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`Directions request failed due to ${status}`);
          }
        }
      );
    }
  }, [isLoaded, userLocation]);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading maps';

  return (
    <GoogleMap
      center={{
        lat: Number(lat),
        lng: Number(lng),
      }}
      zoom={14} // Adjust the zoom level as needed
      onLoad={(map) => setMap(map)}
      mapContainerStyle={{ height: '300px', width: '100%' }}
    >
      {userLocation && <Marker position={{ lat: parseFloat(lat), lng: parseFloat(lng) }} />}
      {cameraLocations.map((camera, index) => (
        <Marker
          key={index}
          position={{ lat: camera.lat, lng: camera.lng }}
          icon={{
            url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png', // Use a green marker
          }}
        />
      ))}
      {directions && (
        <Polyline
          path={directions.routes[0].overview_path}
          options={{
            strokeColor: '#0000FF',
            strokeOpacity: 0.7,
            strokeWeight: 5,
          }}
        />
      )}
    </GoogleMap>
  );
};

export default MapWithRoute;
