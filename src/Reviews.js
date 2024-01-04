import React, { useEffect, useState } from 'react'
import Header from './shared/Header'
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

function Reviews() {
    const [data, setData] = useState([])

    const reviewsData = async (appid) => {
        try {
            const response = await axios.post(
                `http://localhost:4040/reviewsdata`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: {
                        app_id: appid
                    }
                }
            );
            setData(response.data)
        } catch (error) {
            console.error('Error:', error);
            alert("An Error occured please retry...")
        }
    }

    useEffect(() => {
        if (localStorage.getItem("appID")) {
            reviewsData(localStorage.getItem("appID"))
        }
    }, [])

    return (<>
        <div>
            <Header />
            Reviews</div>
        <div>
            {data?.length > 0 && (
                <table className='table'>
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Rating</th>
                            <th>Review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((review) => (
                            <tr key={review.id}>
                                <td>{review.userName}</td>
                                <td>{review.score}</td>
                                <td>{review.content}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

        </div>
    </>)
}

export default Reviews