import React from "react";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import api from '../../services/api';


function GoogleLoginComp() {

    const navigate = useNavigate();

    const handleLoginSuccess = async (credentialResponse) => {
        // Toast('success', 'Logged in Succesfully')
        var decoded = jwtDecode(credentialResponse.credential);
        const mail = decoded.email;
        // localStorage.setItem('userEmail', mail);
        try {
            let res = await api({
                url: '/auth/googlelogin',
                method: "POST",
                responseType: "json",
                data: {
                    mail
                },
            });
            console.log(res, "------------------>response")
        } catch (error) {
            if (error.response.status === 401) navigate("/");
        }
    };
    const handleLoginError = () => {
        // Toast("error", "Login Failed Try Again!!!")
        console.log('Login Failed');
    }

    return (
        // <img className="social-login-icon" src="/google.png" alt="Google" onClick={() => login()} />
        <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
        />

    );
}

export default GoogleLoginComp;