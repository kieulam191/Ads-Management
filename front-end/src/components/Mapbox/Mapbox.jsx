import { useRef, useEffect, useState } from 'react';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { token } from "../../constains/token";
import mapboxgl from 'mapbox-gl';

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './mapbox.css'

mapboxgl.accessToken = token;

const Mapbox = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(106.6822);
    const [lat, setLat] = useState(10.7623);
    const [zoom, setZoom] = useState(17);

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });

        map.current.addControl(
            new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                //limited searching VN
                countries:'vn',
                // //limited searching TPHCM 
                bbox: [106.358, 10.313, 107.377, 11.183],
                mapboxgl: mapboxgl
            })
        );
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });

    return (
        <div>
            <div className="sidebar">
                Kinh độ: {lng} | Vĩ độ: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className='container'/>
        </div>
    )
}

export default Mapbox