import React from 'react'
import config from '../../config';
// import MicrosoftLogin from "react-microsoft-login"
import { PublicClientApplication } from '@azure/msal-browser'

function MicrosoftLogins() {

    const msalConfig = {
        auth: {
            clientId: `53252f99-c23e-419d-aa8c-d2df14a84155`,
            redirectUri: 'http://localhost:3000', // Redirect URI configured in Azure portal
        }
    };
    const loginRequest = {
        scopes: ['user.read'] // Specify the scopes your application needs
    };

    const msalInstance = new PublicClientApplication(msalConfig);

    async function login() {
        try {
            // Ensure that the PublicClientApplication instance is initialized before calling loginPopup
            await msalInstance.handleRedirectPromise();
            const loginResponse = await msalInstance.loginPopup(loginRequest);
            console.log('Login Response:', loginResponse);
            // You can now use the loginResponse to access user information or tokens
        } catch (error) {
            console.error('Login Error:', error);
        }
    }

    // Call the logout function when needed
    async function logout() {
        try {
            await msalInstance.logout();
            console.log('Logout successful');
        } catch (error) {
            console.error('Logout Error:', error);
        }
    }

    // Add this line to initialize the MSAL instance

    return (
        <img className="social-login-icon" src="/microsoft.png" alt="Microsoft" onClick={() => login()} />

        // <MicrosoftLogin clientId={"e7eb7a65-d97c-4121-a928-7f1d96ff136e"} authCallback={authHandler} />

    )
}

export default MicrosoftLogins