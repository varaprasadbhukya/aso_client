import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    const generateProfileName = (name) => {
        const parts = name.split(' ');
        return parts.map(part => part.charAt(0).toUpperCase()).join('');
    }

    // Generate profile abbreviation
    const profileName = generateProfileName("Shashi Kumar");

    const LogOut = () => {
        localStorage.removeItem("token");
        navigate("/signin")
    }

    return (<>
        <div className="d-flex justify-content-end m-2 dropdown"> <div className="circular-profile">
            {profileName}
        </div> <h5 className='m-3 dropbtn'>Mr. Shashi Kumar</h5>
            <div class="dropdown-content">
                <a >Profile</a>
                <a >User Management</a>
                <a onClick={() => { LogOut() }}>Log Out</a>
            </div></div>
    </>)
}

export default Header