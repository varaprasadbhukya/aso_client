import './App.css';
import React, { useState } from 'react';
import Appdata from './Appdata';
import Home from './Home';
import SearchApp from './SearchApp';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Integrations from './Integrations';
import Reviews from './Reviews';
import Ratings from './Ratings';
import Registration from './components/registration/Registration';
import OrgForm from './components/registration/OrgForm';
import MailVerify from './components/registration/MailVerify';
import RegSuccess from "./components/registration/RegSuccess";
import HomeDashboard from './components/dashboard/HomeDashboard';
import MainContent from './components/registration/MainContent';
import ReviewsFeed from "./components/dashboard/ReviewsFeed";


function App() {


  return (
    <div className="App">
      <MainContent />
      <BrowserRouter>
        <Routes>
          {/* <Route exact path='/' element={< Home />}></Route> */}
          <Route exact path="/signin" element={<Registration />}></Route>
          <Route exact path="/reviews-feed" element={<ReviewsFeed />}></Route>
          <Route exact path="/about-org" element={<OrgForm />}></Route>
          <Route exact path="/reg_success" element={<RegSuccess />}></Route>
          <Route exact path="/search" element={<SearchApp />}></Route>
          <Route exact path="/appdata" element={<Appdata />}></Route>
          <Route exact path="/integrations" element={<Integrations />}></Route>
          <Route exact path="/reviews" element={<Reviews />}></Route>
          <Route exact path="/ratings" element={<Ratings />}></Route>
          <Route path="/verify/:token" element={<MailVerify />} />
        </Routes >
      </BrowserRouter >
    </div >
  );
}

export default App;
