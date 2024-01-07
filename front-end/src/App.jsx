import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import Mapbox from "./components/Mapbox/Mapbox";
import HomePage from './pages/CB_PHUONG/CB_PHUONG'
import LoginForm from "./pages/LoginPage/LoginForm";

import { fetchPlaces } from "./redux/Slice/placeSlice";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const places = useSelector(state => state.places.places)
  const status = useSelector(state => state.places.status)

  const [userLocation, setUserLocation] = useState(null);
  
  useEffect(() => {
    dispatch(fetchPlaces());
 },[dispatch])

 useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Lấy vị trí thành công
        const { latitude, longitude } = position.coords;
        setUserLocation({ lng: longitude, lat: latitude });
      },
      (error) => {
        console.error('Error getting user location:', error.message);
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
}, []);

 if(status == 'loading'){
  return (
    <div>
      <div>Loading...</div>
    </div>
  )
}

if(status == 'error'){
  return (
    <div>
      <div>Error: {error}</div>
    </div>
  )
}

const handlePlaces = () => {
  dispatch(fetchPlaces());
}

  return (
    <>
      {(places.length > 0) && <Mapbox handlePlaces={handlePlaces} places={places} userLocation={userLocation} />}
    </>
  )
}

export default App;
