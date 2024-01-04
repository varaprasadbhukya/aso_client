import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';


function Appdata() {
    const navigate = useNavigate();
    const location = useLocation();

    const [rating, setRating] = useState('');
    const [reviews, setReviews] = useState('');
    const [banner, setBanner] = useState('');
    const [histogram, setHistogram] = useState([]);
    const [screenshots, setScreenshots] = useState([])
    const appdata = async (appid) => {
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
            setBanner(response.data.headerImage);
            setHistogram(response.data.histogram);
            setScreenshots(response.data.screenshots);
        } catch (error) {
            console.error('Error:', error);
            alert("An Error occured please retry...")
        }
    }

    useEffect(() => {
        if (location.state.appId) {
            appdata(location.state.appId)
        }
    }, [])
    return (<>
        <div>Appdata</div><br />
        {rating && reviews && <div className='appdata'>
            <img className='banner' src={banner} alt="banner" /><br />
            <Carousel data-bs-theme="dark">
                {screenshots.map((item) => (<Carousel.Item>
                    <img
                        className="d-block w-600"
                        src={item}
                        alt="First slide"
                    />
                </Carousel.Item>))}
            </Carousel>

            <span>Ratings: <h2>{rating}</h2></span> &nbsp; <span>Reviews: <h2>{reviews}</h2></span><br />
        </div>}
    </>)
}

export default Appdata