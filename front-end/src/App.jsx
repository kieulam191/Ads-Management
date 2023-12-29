import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Mapbox from "./components/Mapbox/Mapbox";
import DistrictList from "./components/admin/District/DistrictList";
import DistrictForm from "./components/admin/District/DistrictForm";
import AdPointList from "./components/admin/AdPoint/AdPointList";
import AdPointForm from "./components/admin/AdPoint/AdPointForm";
import AdBoardList from "./components/admin/AdBoard/AdBoardList";
import AdBoardForm from "./components/admin/AdBoard/AdBoardForm";
import AdvertisingList from "./components/admin/Type/ads/AdvertisingList";
import AdvertisingForm from "./components/admin/Type/ads/AdvertisingForm";
import AdTableList from "./components/admin/Type/AdsTable/AdTableList";
import AdTableForm from "./components/admin/Type/AdsTable/AdTableForm";
import PositionForm from "./components/admin/Type/position/PositionForm";
import PositionList from "./components/admin/Type/position/PositionList";
import ReportForm from "./components/admin/Type/report/ReportForm";
import ReportList from "./components/admin/Type/report/ReportList";
import AreaList from "./components/admin/Areas/AreaList";
import AreaForm from "./components/admin/Areas/AreaForm";
import Sidebar from "./components/Sidebar";
import AccountList from "./components/admin/account/AccountList";
import { AppProvider } from "./context/AppContext";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <AppProvider>
          <Sidebar />
          <div className="content">
            <Switch>
              <Route path="/" exact component={Mapbox} />
              <Route path="/districts" exact component={DistrictList} />
              <Route path="/districts/add" exact component={DistrictForm} />
              <Route path="/districts/:id" exact component={DistrictForm} />
              <Route path="/adpoints" exact component={AdPointList} />
              <Route path="/adpoints/add" exact component={AdPointForm} />
              <Route path="/adpoints/:id" exact component={AdPointForm} />
              <Route path="/adboards" exact component={AdBoardList} />
              <Route path="/adboards/add" exact component={AdBoardForm} />
              <Route path="/adboards/:id" exact component={AdBoardForm} />
              <Route path="/advertisings" exact component={AdvertisingList} />
              <Route
                path="/advertisings/add"
                exact
                component={AdvertisingForm}
              />
              <Route
                path="/advertisings/:id"
                exact
                component={AdvertisingForm}
              />
              <Route path="/adtables" exact component={AdTableList} />
              <Route path="/adtables/add" exact component={AdTableForm} />
              <Route path="/adtables/:id" exact component={AdTableForm} />
              <Route path="/positions" exact component={PositionList} />
              <Route path="/positions/add" exact component={PositionForm} />
              <Route path="/positions/:id" exact component={PositionForm} />
              <Route path="/reports" exact component={ReportList} />
              <Route path="/reports/add" exact component={ReportForm} />
              <Route path="/reports/:id" exact component={ReportForm} />
              <Route path="/areas" exact component={AreaList} />
              <Route path="/areas/add" exact component={AreaForm} />
              <Route path="/accounts" exact component={AccountList} />
            </Switch>
          </div>
        </AppProvider>
      </div>
    </Router>
  );
}

export default App;
