import React, { useState } from 'react';
import Signup from './Signup';
import SignIn from './SignIn';

const Registration = () => {
  const [activeTab, setActiveTab] = useState('signin');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="auth-container">
      <div className="auth-tabs">
        <button
          className={`auth-tab ${activeTab === 'signup' ? 'active' : ''}`}
          onClick={() => handleTabChange('signup')}
        >
          Sign Up
        </button>
        <button
          className={`auth-tab ${activeTab === 'signin' ? 'active' : ''}`}
          onClick={() => handleTabChange('signin')}
        >
          Sign In
        </button>
      </div>
      {activeTab === 'signup' && <Signup />}
      {activeTab === 'signin' && <SignIn setActiveTab={setActiveTab} />}
    </div>
  );
};

export default Registration;