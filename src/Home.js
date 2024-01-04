import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
    const Navigate = useNavigate();
    return (<>
        <div>Home</div><br />
        <button onClick={() => Navigate('/search')}>Get Started</button>
    </>)
}

export default Home