import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Mapbox from "./components/Mapbox/Mapbox";
import DistrictList from "./components/District/DistrictList";
import DistrictForm from "./components/District/DistrictForm";
import AdPointList from "./components/AdPoint/AdPointList";
import AdPointForm from "./components/AdPoint/AdPointForm";
import AdBoardList from "./components/AdBoard/AdBoardList";
import AdBoardForm from "./components/AdBoard/AdBoardForm";

import AdboardListLocation from "./components/resident/AdBoardLocation";
import ReportForm from "./components/resident/report/ReportForm";

import Sidebar from "./components/Sidebar";
import { AppProvider } from "./context/AppContext";

import "./App.css";
import ResidentSideBar from "./components/resident/sidebar/SideBar";
import SignInForm from "./components/officer/SignIn/SignInForm";
import SignUpForm from "./components/officer/SignUp/SignUpForm";
import ForgotPassForm from "./components/officer/SignIn/ForgotPasswordForm";
import OTPForm from "./components/officer/SignIn/OTPForm";
import ResetPassowordForm from "./components/officer/SignIn/ResetPasswordForm";

function App() {
  return (
    <Router>
      <div className="app">
        <AppProvider>
          <ResidentSideBar />
          <div className="content">
            <Route path="/" exact component={Mapbox} />
            <Route
              path="/adboardlistloc"
              exact
              component={AdboardListLocation}
            />
            <Route path="/reports" exact component={ReportForm} />
            <Route path="/officers/signup" exact component={SignUpForm} />
            <Route path="/officers/signin" exact component={SignInForm} />
            <Route
              path="/officers/forgot-password"
              exact
              component={ForgotPassForm}
            />
            <Route path="/officers/auth/OTP" exact component={OTPForm} />
            <Route
              path="/officers/resetpassword"
              exact
              component={ResetPassowordForm}
            />
          </div>
          {/* <div className="content">
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
            </Switch>
          </div> */}
        </AppProvider>
      </div>
    </Router>
  );
}

export default App;
