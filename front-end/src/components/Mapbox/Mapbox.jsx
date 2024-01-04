import { useRef, useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
//import ReactMapboxGl from "react-mapbox-gl";
import { token } from "../../constains/token";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "./mapbox.css";
import { AppContext } from "../../context/AppContext";
import Report from "../resident/report/ReportList";
import axios from "axios";
import hostAxios from "../../services/api";

mapboxgl.accessToken = token;

const Mapbox = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(106.6822);
  const [lat, setLat] = useState(10.7623);
  const [zoom, setZoom] = useState(17);
  const [adLocation, setAdLocation] = useState([]);
  const { state, dispatch } = useContext(AppContext);

  const navigate = useHistory();
  let flag = false;
  let popup;

  const handleClick = () => {
    console.log("da click remove");
  };

  const createGeoJson = async (locations) => {
    const geoJson = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: locations.map((loc) => {
          return {
            type: "Feature",
            properties: {
              loc_id: loc[0],
              description: `<strong>${loc[1]}</strong><p>${loc[2]}</p>${
                loc[3]
              }<p>${loc[4] ? "Đã quy hoạch" : "Chưa quy hoạch"}</p></strong>`,
              wards: loc[5],
              districts: loc[6],
              icon: `${
                loc[7] === null ? (loc[4] ? "planed" : "plan") : "report"
              }`,
            },
            geometry: {
              type: "Point",
              coordinates: loc[8],
            },
          };
        }),
      },
    };
    return await geoJson;
  };

  useEffect(() => {
    if (map.current) {
      try {
        const features = adLocation
          .filter((f) => {
            if (state.isCheckUrbaned === false) {
              return f;
            }
            return f[4] === state.isCheckUrbaned;
          })
          .map((ad) => {
            return {
              type: "Feature",
              properties: {
                loc_id: ad[0],
                description: `<strong>${ad[1]}</strong><p>${ad[2]}</p>${
                  ad[3]
                }<p>${ad[4] ? "Đã quy hoạch" : "Chưa quy hoạch"}</p></strong>`,
                wards: ad[5],
                districts: ad[6],
                icon: `${
                  ad[7] === null ? (ad[4] ? "planed" : "plan") : "report"
                }`,
              },
              geometry: {
                type: "Point",
                coordinates: ad[8],
              },
            };
          });

        const updatedGeoJSONData = {
          type: "FeatureCollection",
          features: features,
        };
        map.current.getSource("places").setData(updatedGeoJSONData);
      } catch (err) {
        console.log("map chua khoi tao");
      }
    }
  }, [state.isCheckUrbaned]);

  useEffect(() => {
    if (map.current && state.isCheckReportHide) {
      const fetchReport = async () =>
        hostAxios.post("/reportviolations").then((res) => {
          const reports = res.data;

          dispatch({
            type: "SET_REPORT_BOARDS",
            payload: reports.map((report) => <Report report={report} />),
          });
        });

      fetchReport();
    }
  }, [state.isCheckReportHide]);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("load", async () => {
      console.log("da load");

      //add icon
      const nameImg = ["report", "plan", "planed"];
      const nameSrc = [
        "./src/assets/qc1.png",
        "./src/assets/qc2.png",
        "./src/assets/qc3.png",
      ];

      for (let i = 0; i < nameImg.length; i++) {
        const name = nameImg[i];
        const src = nameSrc[i];

        // Create a new Image object for each image
        const img = new Image();

        // Handle image loading
        img.onload = () => {
          map.current.addImage(name, img); // Add the image to the map
        };

        // Set the image source
        img.src = src;
      }

      const locations = await hostAxios
        .post("/advertisinglocations")
        .then((res) =>
          res.data.map((ad) => [
            ad.location_id,
            ad.advertising_methods_name,
            ad.positiontype_name,
            ad.address,
            ad.is_planning,
            ad.wards_fullname,
            ad.districts_fullname,
            ad.reportviolations_id,
            [ad.lng, ad.lat],
          ])
        );

      const geoJson = await createGeoJson(locations);
      setAdLocation(locations);

      map.current.addSource("places", geoJson);

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
        const loc_id = e.features[0].properties.loc_id;
        const ward = e.features[0].properties.wards;
        const district = e.features[0].properties.districts;

        navigate.push({
          pathname: "/adboardlistloc",
          state: { loc_id: loc_id, ward: ward, district: district },
        });
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
              var button = `<button id="report" type="submit" className="button" onClick={${handleClick()}}>Báo cáo vi phạm</button>`;
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
          closeButton: false,
        })
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(map.current);
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

    map.current.on("styleimagemissing", (e) => {
      console.log("loading missing image: " + e.id);
      let img = new Image();
      img.onload = () => {
        map.current.addImage(e.id, img);
      };
      img.src = "./src/assets/react.svg";
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
