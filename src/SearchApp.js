import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SearchApp() {
    const [data, setdata] = useState([]);
    const [appname, setAppname] = useState('');
    // const [icon, seticon] = useState('');
    const [appid, setAppid] = useState('');
    const navigate = useNavigate();
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
            setdata(response.data)
            // setAppid(response.data[0].appId);
            // seticon(response.data[0].icon);
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
        {data && data.map((item) => (<div className='search-list'> <div className='search-inner'><ul> <img className='icon' src={item.icon} alt='icon' onClick={() => navigate("/appdata", { state: { appId: item.appId } })} />
            <br />
            <span>appId : {item.appId}</span></ul></div>
        </div>))
        }<br /><br />
        {data.length > 0 && <div>
            <span>Didn't Found Your App ?</span><br />
            <span>Try Giving your Package Name !</span> <br />
            <input placeholder='search for your app here...' className='text' onChange={(e) => { setAppid(e.target.value) }} />
            <br />
            <button onClick={() => navigate("/appdata", { state: { appId: appid } })}>
                search
            </button>
        </div>}
    </>)
}

export default SearchApp 