import React from "react";
import { useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function GoogleLoginComp() {

    const handleLoginSuccess = async (credentialResponse) => {
        // Toast('success', 'Logged in Succesfully')
        console.log(credentialResponse, "---------------->resp")
        // var decoded = jwtDecode(credentialResponse.credential);
        // const userEmail = decoded.email;
        // localStorage.setItem('userEmail', userEmail);
        // navigate('/vendorlist')
        // const backendResponse = await fetch('http://localhost:3001/api/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: { mail: userEmail },
        // });

        // if (backendResponse.ok) {
        //     const { token } = await backendResponse.json();
        //     localStorage.setItem("token", token)
        //     navigate('/vendorlist')
        // }
    };

    const handleLoginError = () => {
        // Toast("error", "Login Failed Try Again!!!")
        console.log('Login Failed');
    };

    const login = useGoogleLogin({
        onSuccess: tokenResponse => console.log(tokenResponse)
    });

    return (
        // <GoogleOAuthProvider clientId="488243178269-05uai4fivv9c0de3l10k8vv03qqvj2i3.apps.googleusercontent.com">
        //     <GoogleLogin
        //         clientId="488243178269-05uai4fivv9c0de3l10k8vv03qqvj2i3.apps.googleusercontent.com"
        //         buttonText="Sign in with Google"
        //         onSuccess={responseGoogle}
        //         onFailure={responseGoogle}
        //         cookiePolicy={"single_host_origin"}
        //     />
        // </GoogleOAuthProvider>

        // <GoogleLogin
        //     onSuccess={handleLoginSuccess}
        //     onError={handleLoginError}
        // />

        <img className="social-login-icon" src="/google.png" alt="Google" onClick={() => login()} />

    );
}

export default GoogleLoginComp;