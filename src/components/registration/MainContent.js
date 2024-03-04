import React, { useEffect } from 'react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom'; // Import BrowserRouter and useNavigate
import api from '../../services/api';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';

const ProfileContent = () => {
  const navigate = useNavigate();
  const { instance, accounts } = useMsal();

  const handleReg = async (email) => {
    try {
      let res = await api({
        url: "/auth/signup",
        method: "POST",
        responseType: "json",
        data: {
          email,
          password: "microsoft",
        },
      });
      if (res.code === 200) {
        localStorage.setItem("token", res.data.authorization);
        navigate("/about-org");
      }
      if (res?.data?.code === 400) {
        alert("Mail Registered please signin");
        navigate("/signin");
      }
      console.log(res, "---------------->response");
    } catch (error) {
      if (error?.response?.status === 401) navigate("/");
    }
  }

  useEffect(() => {
    console.log(accounts[0], "------------------------------------------>Accounts Information")
    if (accounts[0]?.username !== null) {
      handleReg(accounts[0]?.username)
    }
  }, [accounts])

  return (
    <>
      <h5 className="card-title">Welcome {accounts[0]?.name}</h5>
      <br />
    </>
  );
};

const MainContent = () => {
  return (
    <Router> {/* Wrap your component with Router */}
      <div className="App">
        <AuthenticatedTemplate>
          <ProfileContent />
        </AuthenticatedTemplate>

        <UnauthenticatedTemplate>
          {/* Your unauthenticated content */}
        </UnauthenticatedTemplate>
      </div>
    </Router>
  );
};

export default MainContent;
