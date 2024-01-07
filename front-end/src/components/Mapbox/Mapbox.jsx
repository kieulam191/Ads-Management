import { useRef, useEffect, useState } from "react";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from "mapbox-gl"; 
import axios from "axios";

import { token } from "../../constains/token";
import { useSelector, useDispatch } from "react-redux";
import ShowAds from "../ShowAds/ShowAds";
import { fetchAds } from "../../redux/Slice/adsSlice";



import {
  StarOutlined,
} from '@ant-design/icons';

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import "./mapbox.css";

mapboxgl.accessToken = token;

const nameImage = 'Be'
const srcImage = 'https://unsplash.com/fr/photos/blanc-et-rouge-betail-traversant-signe-photographie-en-gros-plan-2ayzQETlloM'

const Mapbox = ({places, reports, userLocation}) => {
  const mapContainer = useRef(null);
  const dispatch = useDispatch();

  const ADS_OF_PLACE_FROM_API = useSelector(state => state.ads.ads)

  const map = useRef(null);
  const [lng, setLng] = useState(106.6822);
  const [lat, setLat] = useState(10.7623);
  const [zoom, setZoom] = useState(17);
  const [infoLocation, setInfoLocation] = useState(null);
  const [ads, setAds] = useState(null)
  const [isOpen, setOpen] = useState(false)
 
  let flag = false;
  let popup;

const handleOpen = (value) => {
  setOpen(value)
}

  const createGeoJson = async (data) => {
    const geoJson = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: data.map((value) => {
          return {
            type: "Feature",
            properties: {
              id: value.id,
              url: value.url,
              address: value.address,
              positiontype_name: value.positiontype_name,
              districts_fullname: value.districts_fullname,
              wards_fullname: value.wards_fullname,
              planned: value.planned
            },
            geometry: {
              type: "Point",
              coordinates: [value.lng, value.lat],
            },
          };
        }),
      },
    };
    return await geoJson;
  };

  useEffect(() => {
    console.log("infoLocation?.legnth: ", infoLocation)
    if(infoLocation != null){
      setOpen(true);
    }
  },[infoLocation])

  useEffect(() => {
    console.log("ads?.legnth: ", ads)
    if(ads != null){
      setOpen(true);
    }
  },[ads])

  useEffect(() => {
    console.log("ADS_OF_PLACE_FROM_API?.length: ", ADS_OF_PLACE_FROM_API?.length)
    if(ADS_OF_PLACE_FROM_API?.length > 0){
      setAds(ADS_OF_PLACE_FROM_API)
    }
  },[dispatch])


  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [userLocation?.lng, userLocation?.lat],
      zoom: zoom,
    });

    map.current.on("click", (e) => {
      if (true) {
        const lngClicked = e.lngLat.lng;
        const latClicked = e.lngLat.lat;
        axios
          .get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngClicked}%2C%20${latClicked}.json?access_token=${token}`
          )
          .then((res) => {
            console.log("res: ", res.data)
            const place_name = res.data.features[0].text;
            const place_address = res.data.features[0].place_name;
            const wards_fullname = res.data.features[0].context[0].text;
            const districts_fullname = res.data.features[0].context[0].text;

            const dataLocationClicked = {
              name: place_name,
              address: place_address,
              wards_fullname: wards_fullname,
              districts_fullname: districts_fullname,
              lng: lngClicked,
              lat: latClicked,
            }
            console.log("data clicked: ", dataLocationClicked)
            setInfoLocation(dataLocationClicked);
          });
        }
    });

    map.current.on('load', async (e) => {
      const marker = new mapboxgl.Marker({draggable: true})
        .setLngLat(userLocation)
        .addTo(map.current)

      if(places){
        const img = new Image();
        img.onload = () => {
          map.current.addImage(nameImage,srcImage);
        };

        const geoJson = await createGeoJson(places);
        console.log("geojson: ", geoJson.data)
        map.current.addSource("places", geoJson); 


         // Add a layer showing the places.
        map.current.addLayer({
          // Add a new layer to the map style: https://docs.mapbox.com/mapbox-gl-js/api/#map#addlayer
          id: 'places',
          type: 'circle',
          source: 'places', // Set the layer source
          paint: {
            'circle-stroke-color': 'white',
            'circle-stroke-width': {
              // Set the stroke width of each circle: https://docs.mapbox.com/style-spec/reference/layers/#paint-circle-circle-stroke-width
              stops: [
                [0, 5],
                [18, 10]
              ],
              base: 20
            },
            'circle-radius': {
              // Set the radius of each circle, as well as its size at each zoom level: https://docs.mapbox.com/style-spec/reference/layers/#paint-circle-circle-radius
              stops: [
                [12, 5],
                [22, 180]
              ],
              base: 5
            },
            'circle-color': [
              // Specify the color each circle should be
              'match', // Use the 'match' expression: https://docs.mapbox.com/style-spec/reference/expressions/#match
              ['get', 'STORE_TYPE'], // Use the result 'STORE_TYPE' property
              'Small Grocery Store',
              '#008000',
              'Supercenter',
              '#008000',
              'Superette',
              '#008000',
              'Supermarket',
              '#008000',
              'Warehouse Club Store',
              '#008000',
              'Specialty Food Store',
              '#9ACD32',
              'Convenience Store',
              '#FF8C00',
              'Convenience Store With Gas',
              '#FF8C00',
              'Pharmacy',
              '#FF8C00',
              '#FF0000' // any other store type
            ],
          }
        });
      }
    })

     // When a click event occurs on a feature in the places layer, open a popup at the
      // location of the feature, with description HTML from its properties.
    map.current.on("click", "places", (e) => {
      const location_id = e.features[0].properties.id;
      const address = e.features[0].properties.address;
      const position_type = e.features[0].properties.positiontype_name;

      console.log("local id: ", location_id)

      popup = new mapboxgl.Popup({
        className: "mapboxgl-popup",
        offset: [0, -10],
        closeButton: true,
      })
        .setLngLat(e.lngLat)
        .setHTML(`<div>
              <div>Loại: ${position_type}}</div>
              <div>Địa chỉ: ${address}}</div>
          </div>`)
        .addTo(map.current);

      dispatch(fetchAds(location_id))
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

    // Clean up the map instance on component unmount
  });

  const handleData = () => {
    setInfoLocation(null);
  }

  return (
    <>
        {isOpen && <ShowAds ads={ads} data={infoLocation} handleData={handleData} handleOpen={handleOpen} />}
        <div className="map-box">
          <div className="sidebar">
            Kinh độ: {lng} | Vĩ độ: {lat} | Zoom: {zoom}
          </div>
          <div ref={mapContainer} className="container" />
        </div>
    </>
  );
};

export default Mapbox;
