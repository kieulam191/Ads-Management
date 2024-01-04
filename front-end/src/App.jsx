import React from "react";
import Mapbox from "./components/Mapbox/Mapbox";
import "./App.css";
import ResidentSideBar from "./components/resident/sidebar/SideBar";

function App() {
  return (
    <div className="app">
      <ResidentSideBar />
      <div className="content">
        <Mapbox />
      </div>
    </div>
  );
}

export default App;
