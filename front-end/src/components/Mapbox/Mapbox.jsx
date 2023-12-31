import { useRef, useEffect, useState } from 'react';
//import ReactMapboxGl from "react-mapbox-gl";
import { token } from "../../constains/token";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import './mapbox.css'

mapboxgl.accessToken = token;

const Mapbox = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [lng, lat],
          zoom: zoom
        });
    });

    return (
        <div>
            <div ref={mapContainer} className='container'/>
        </div>
    )
}

export default Mapbox