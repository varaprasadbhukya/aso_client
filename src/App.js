import "./App.css";
import React, { useState } from "react";
import Appdata from "./Appdata";
import SearchApp from "./SearchApp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Integrations from "./components/monitor/Integrations";
import Reviews from "./Reviews";
import Ratings from "./Ratings";
import Registration from "./components/registration/Registration";
import OrgForm from "./components/registration/OrgForm";
import MailVerify from "./components/registration/MailVerify";
import RegSuccess from "./components/registration/RegSuccess";
import HomeDashboard from "./components/dashboard/HomeDashboard";
import MainContent from "./components/registration/MainContent";
import ReviewsFeed from "./components/monitor/ReviewsFeed";
import SideNav from "./components/navbar/SideNav";
// import Sidebar from "./components/navbar/Sidebar"

function App() {
  // const token = localStorage.getItem("token");
  return (
    <div className="App">
      <MainContent />
      <BrowserRouter>
        {/* {token && <Sidebar />} */}
        <Routes>
          <Route exact path="/signin" element={<Registration />}></Route>
          <Route exact path="/*" element={<SideNav />}>
            <Route path="dashboard" element={<HomeDashboard />}></Route>
            <Route path="integrations" element={<Integrations />}></Route>
            <Route path="reviews-feed" element={<ReviewsFeed />}></Route></Route>
          <Route exact path="/about-org" element={<OrgForm />}></Route>
          <Route exact path="/reg_success" element={<RegSuccess />}></Route>
          <Route exact path="/search" element={<SearchApp />}></Route>
          <Route exact path="/appdata" element={<Appdata />}></Route>
          <Route exact path="/reviews" element={<Reviews />}></Route>
          <Route exact path="/ratings" element={<Ratings />}></Route>
          <Route path="/verify/:token" element={<MailVerify />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
