import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidenav from "./shared/Sidenav";
import Home from "./Home";
import SearchApp from "./SearchApp";
import Appdata from "./Appdata";
import Integrations from "./Integrations";
import Reviews from "./Reviews";
import Ratings from "./Ratings";
import Registration from "./components/registration/Registration";
import OrgForm from "./components/registration/OrgForm";
import MailVerify from "./components/registration/MailVerify";
import RegSuccess from "./components/registration/RegSuccess";
import HomeDashboard from "./components/dashboard/HomeDashboard";
import ReviewsFeed from "./components/dashboard/ReviewsFeed";

function App() {
  return (
    <div className="App">
      <Router>
        <Sidenav /> {/* Include the Sidenav component here */}
        <Routes>
          {/* Define your routes here */}
          <Route exact path="/signin" element={<Registration />} />
          <Route exact path="/reviews-feed" element={<ReviewsFeed />} />
          <Route exact path="/about-org" element={<OrgForm />} />
          <Route exact path="/reg_success" element={<RegSuccess />} />
          <Route exact path="/search" element={<SearchApp />} />
          <Route exact path="/appdata" element={<Appdata />} />
          <Route exact path="/integrations" element={<Integrations />} />
          <Route exact path="/reviews" element={<Reviews />} />
          <Route exact path="/ratings" element={<Ratings />} />
          <Route path="/verify/:token" element={<MailVerify />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
