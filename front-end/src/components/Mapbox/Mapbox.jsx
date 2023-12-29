import { useRef, useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
//import ReactMapboxGl from "react-mapbox-gl";
import { token } from "../../constains/token";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "./mapbox.css";
import { AppContext } from "../../context/AppContext";
import Report from "../resident/report/ReportList";
import axios from "axios";

mapboxgl.accessToken = token;

const Mapbox = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(106.6822);
  const [lat, setLat] = useState(10.7623);
  const [zoom, setZoom] = useState(17);
  const [isAnyClicked, setIsAnyClicked] = useState(true);
  const { state, dispatch } = useContext(AppContext);

  const [adGeo, setAdGeo] = useState([
    [106.6842, 10.7623],
    [106.6817, 10.7632],
    [106.6847, 10.7619],
  ]);

  const [report, setReport] = useState([
    [106.6842, 10.7623],
    [106.6817, 10.7632],
  ]);

  const navigate = useHistory();
  let flag = false;
  let popup;

  const handleClick = () => {
    console.log("da click remove");
  };

  useEffect(() => {
    if (map.current && state.isCheckUrbaned) {
      console.log("da thay doi souce");
      const updatedGeoJSONData = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              loc_id: 1,
              description:
                "<strong>Cổ động chính trị</strong><p>Đất công viên, nguyễn du, Phường Bến Nghé, Quận 1</p><strong>Đã quy hoạch</strong>",
              icon: "theatre",
            },
            geometry: {
              type: "Point",
              coordinates: adGeo[0],
            },
          },
        ],
      };
      map.current.getSource("places").setData(updatedGeoJSONData);
    }
  }, [state.isCheckUrbaned]);

  useEffect(() => {
    if (map.current && state.isCheckReportHide)
      dispatch({
        type: "SET_REPORT_BOARDS",
        payload: report.map((r) => <Report />),
      });
  }, [state.isCheckReportHide]);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("load", () => {
      map.current.addSource("places", {
        // This GeoJSON contains features that include an "icon"
        // property. The value of the "icon" property corresponds
        // to an image in the Mapbox Streets style's sprite.
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {
                loc_id: 1,
                description:
                  "<strong>Cổ động chính trị</strong><p>Đất công viên, nguyễn du, Phường Bến Nghé, Quận 1</p><strong>Đã quy hoạch</strong>",
                icon: "theatre",
              },
              geometry: {
                type: "Point",
                coordinates: adGeo[0],
              },
            },
            {
              type: "Feature",
              properties: {
                loc_id: 2,
                description:
                  "<strong>Cổ động chính trị</strong><p>Đất công viên, nguyễn du, Phường Bến Nghé, Quận 1</p><strong>Đã quy hoạch</strong>",
                icon: "theatre",
              },
              geometry: {
                type: "Point",
                coordinates: adGeo[1],
              },
            },
            {
              type: "Feature",
              properties: {
                loc_id: 3,
                description:
                  "<strong>Cổ động chính trị</strong><p>Đất công viên, nguyễn du, Phường Bến Nghé, Quận 1</p><strong>Đã quy hoạch</strong>",
                icon: "theatre",
              },
              geometry: {
                type: "Point",
                coordinates: adGeo[2],
              },
            },
          ],
        },
      });

      //new souce
      map.current.addSource("places-new", {
        // This GeoJSON contains features that include an "icon"
        // property. The value of the "icon" property corresponds
        // to an image in the Mapbox Streets style's sprite.
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {
                loc_id: 1,
                description:
                  "<strong>Cổ động chính trị</strong><p>Đất công viên, nguyễn du, Phường Bến Nghé, Quận 1</p><strong>Đã quy hoạch</strong>",
                icon: "theatre",
              },
              geometry: {
                type: "Point",
                coordinates: adGeo[0],
              },
            },
          ],
        },
      });

      // Add a layer showing the places.
      map.current.addLayer({
        id: "places",
        type: "symbol",
        source: "places",
        layout: {
          "icon-image": ["get", "icon"],
          "icon-allow-overlap": true,
        },
      });

      // When a click event occurs on a feature in the places layer, open a popup at the
      // location of the feature, with description HTML from its properties.
      map.current.on("click", "places", (e) => {
        console.log("da click marker");

        // Copy coordinates array.
        // const coordinates = e.features[0].geometry.coordinates.slice();
        // const description = e.features[0].properties.description;
        // const loc_id = e.features[0].properties.loc_id;

        // // Ensure that if the map is zoomed out such that multiple
        // // copies of the feature are visible, the popup appears
        // // over the copy being pointed to.
        // while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        //   coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        // }
        // new mapboxgl.Popup({
        //   className: "mapboxgl-popup",
        //   offset: [0, -10],
        //   closeButton: false,
        // })
        //   .setLngLat(coordinates)
        //   .setHTML(description)
        //   .addTo(map.current);
        navigate.push("/adboardlistloc");
      });

      map.current.on("click", (e) => {
        if (!flag) {
          const lng = e.lngLat.lng;
          const lat = e.lngLat.lat;
          axios
            .get(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng}%2C%20${lat}.json?access_token=${token}`
            )
            .then((res) => {
              const address = res.data.features[0]["place_name"];
              var button = `<button id="report" type="submit" className="button" onClick={${handleClick()}}>Button</button>`;
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
                  navigate.push("/reports");
                });
            });
        }
      });

      // Change the cursor to a pointer when the mouse is over the places layer.
      map.current.on("mouseenter", "places", (e) => {
        map.current.getCanvas().style.cursor = "pointer";

        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;
        const loc_id = e.features[0].properties.loc_id;
        flag = true;
        popup = new mapboxgl.Popup({
          className: "mapboxgl-popup",
          offset: [0, -10],
          closeButton: false,
        })
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(map.current);

        //nếu tồn tại report của location id này
      });

      // Change it back to a pointer when it leaves.
      map.current.on("mouseleave", "places", () => {
        map.current.getCanvas().style.cursor = "";
        flag = false;
        popup.remove();
      });

      map.current.on("move", () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      });
    });
  });

  return (
    <div>
      <div>
        Kinh độ: {lng} | Vĩ độ: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="container" />
    </div>
  );
};

export default Mapbox;
