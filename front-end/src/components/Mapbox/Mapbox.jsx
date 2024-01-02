import { useRef, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from "mapbox-gl"; 

import { token } from "../../constains/token";
import { AppContext } from "../../context/AppContext";
import Report from "../resident/report/ReportList";
import axios from "axios";

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import "./mapbox.css";

mapboxgl.accessToken = token;

const Mapbox = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(106.6822);
  const [lat, setLat] = useState(10.7623);
  const [zoom, setZoom] = useState(17);

  let popup;

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("click", (e) => {
      if (true) {
        const lng = e.lngLat.lng;
        const lat = e.lngLat.lat;
        axios
          .get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng}%2C%20${lat}.json?access_token=${token}`
          )
          .then((res) => {
            const address = res.data.features[0]["place_name"];
            var button = `<button>Button</button>`;
            popup = new mapboxgl.Popup({
              className: "mapboxgl-popup",
              offset: [0, -10],
              closeButton: true,
            })
              .setLngLat(e.lngLat)
              .setHTML(`<p>${address}}</p>${button}`)
              .addTo(map.current);
            document
              .getElementById("report")
              .addEventListener("click", () => {
                navigate("/reports");
              });
          });
        }
    });


    map.current.addControl(
      new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          countries:'vn',
          bbox: [106.358, 10.313, 107.377, 11.183],
          mapboxgl: mapboxgl
      })
    );

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

  });

  return (
    <div className="map-box">
      <div className="sidebar">
        Kinh độ: {lng} | Vĩ độ: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="container" />
    </div>
  );
};

export default Mapbox;
