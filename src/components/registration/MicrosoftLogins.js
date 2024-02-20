import React from 'react'
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";

function MicrosoftLogins() {

    const { instance } = useMsal();

    const handleLogin = (loginType) => {
        if (loginType === "popup") {
            instance.loginPopup(loginRequest).catch((e) => {
                console.log(e);
            });
        } else if (loginType === "redirect") {
            instance.loginRedirect(loginRequest).catch((e) => {
                console.log(e);
            });
        }
    };

    return (
        <>
            <button onClick={() => handleLogin("popup")}> Sign in using Popup</button>
            {/* <button onClick={() => handleLogin("redirect")}>
                Sign in using Redirect
            </button> */}

        </>

    );
}

export default MicrosoftLogins