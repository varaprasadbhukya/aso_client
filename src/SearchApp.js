import React, { useState } from 'react'
import axios from 'axios';

function SearchApp() {
    const [appname, setAppname] = useState('');
    const [icon, seticon] = useState('');
    const [appid, setAppid] = useState('');
    const [rating, setRating] = useState('');
    const [reviews, setReviews] = useState('');

    const Search = async () => {
        try {
            const response = await axios.post(
                `http://localhost:4040/search_app`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: {
                        appname: appname
                    }
                }
            );
            console.log(response.data, "-----------------------")
            setAppid(response.data[0].appId);
            seticon(response.data[0].icon);
        } catch (error) {
            console.error('Error:', error);
            alert("An Error occured please retry...")
        }
    }

    const appdata = async () => {
        try {
            const response = await axios.post(
                `http://localhost:4040/appdata`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: {
                        app_id: appid
                    }
                }
            );
            console.log(response, "-----------------------");
            setRating(response.data.ratings);
            setReviews(response.data.reviews);
        } catch (error) {
            console.error('Error:', error);
            alert("An Error occured please retry...")
        }
    }

    return (<>
        <input placeholder='search for your app here...' className='text' onChange={(e) => { setAppname(e.target.value) }} />
        <br />
        <button onClick={Search}>
            search
        </button>
        <br />
        {icon && appid && <> <img src={icon} alt='icon' onClick={appdata} />
            <br />
            <span>appId : {appid}</span>
        </>
        }<br /><br />
        {rating && reviews && <div>
            <span>Ratings: <h2>{rating}</h2></span> &nbsp; <span>Reviews: <h2>{reviews}</h2></span>
        </div>}
    </>)
}

export default SearchApp 