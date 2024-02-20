
import React, { useState } from 'react';
import { loginRequest } from '../../authConfig';
import { callMsGraph } from '../../graph';
import MicrosoftSignout from './MicrosoftSignout';

import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';



const ProfileContent = () => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  function RequestProfileData() {
    // Silently acquires an access token which is then attached to a request for MS Graph data
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        callMsGraph(response.accessToken).then((response) => setGraphData(response));
      });
  }

  return (
    <>
      {console.log(accounts[0], "------------------------------------------>Accounts Information")}
      <h5 className="card-title">Welcome {accounts[0]?.name}</h5>
      <br />
      {/* {graphData ? (
        <ProfileContent graphData={graphData} />
      ) : (
        <button variant="secondary" onClick={RequestProfileData}>
          Request Profile Information
        </button>
      )} */}
    </>
  );
};

const MainContent = () => {
  return (
    <div className="App">
      <AuthenticatedTemplate>
        <ProfileContent />
        {/* <MicrosoftSignout /> */}

      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        {/* <h5>
            <center>
              Please sign-in to see your profile information.
            </center>
          </h5>
          <MicrosoftLogins /> */}

      </UnauthenticatedTemplate>
    </div>
  );
};

export default MainContent