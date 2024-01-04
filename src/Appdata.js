import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Header from './shared/Header';


function Appdata() {
    const navigate = useNavigate();
    const location = useLocation();
    const [data, setdata] = useState([])
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
            setdata(response.data)
        } catch (error) {
            console.error('Error:', error);
            alert("An Error occured please retry...")
        }
    }

    useEffect(() => {
        if (location.state?.appId) {
            localStorage.setItem("appID", location.state.appId)
            appdata(location.state.appId)
        } else if (localStorage.getItem("appID")) { appdata(localStorage.getItem("appID")) } else (navigate("/search"))
    }, []);

    const formattedreviews = (number) => {
        return new Intl.NumberFormat('en-US', {
            notation: 'compact',
            compactDisplay: 'short',
        }).format(number);

    }

    return (<>
        <Header />
        <h1>{data?.title}</h1>
        {data && <div className='appdata'>
            <img className='banner' src={data.headerImage} alt="banner" /><br />
            <h5>{data.summary}</h5>
            <Carousel data-bs-theme="dark">
                {data?.screenshots?.map((item) => (<Carousel.Item>
                    <img
                        className="d-block w-600"
                        src={item}
                        alt="First slide"
                    />
                </Carousel.Item>))}
            </Carousel>
            <div className='reviews'>
                <div className='rating'>
                    <h5>{data.score?.toFixed(2)}&nbsp;<svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><path fill="var(--color-five-stars)" d="M11.3944 3.8243C11.5738 3.86916 11.7308 3.95888 11.843 4.09346C11.9551 4.25047 12 4.40748 12 4.58692C12 4.76636 11.9327 4.92336 11.7981 5.05794L9.42056 7.36822L9.98131 10.643C10.0037 10.8224 9.95888 11.0019 9.86916 11.1589C9.77944 11.3159 9.64486 11.4056 9.46542 11.4505C9.28598 11.4953 9.10654 11.4729 8.94953 11.3832L6.01122 9.85794L3.0729 11.3832C2.89346 11.4729 2.73645 11.4953 2.55701 11.4505C2.37757 11.4056 2.22056 11.3159 2.13084 11.1589C2.04112 11.0019 1.99626 10.8224 2.04112 10.643L2.60187 7.36822L0.224299 5.05794C0.0897196 4.92336 0 4.76636 0 4.58692C0 4.40748 0.0448598 4.25047 0.157009 4.09346C0.269159 3.95888 0.426168 3.86916 0.628037 3.8243L3.9028 3.35327L5.36075 0.392523C5.45047 0.213084 5.56262 0.100935 5.74206 0.0336449C5.9215 -0.011215 6.07851 -0.011215 6.25794 0.0336449C6.43738 0.100935 6.57196 0.213084 6.66168 0.392523L8.11963 3.35327L11.3944 3.8243Z"></path></svg></h5>
                    <span>{formattedreviews(data.ratings)}&nbsp;Reviews</span>
                </div>|
                <div className='rating'><span>{formattedreviews(data.minInstalls)}+</span>Downloads</div>|<div className='rating'><span>{data?.contentRating}</span> ContentRating</div> </div><br />
        </div>}
    </>)
}

export default Appdata