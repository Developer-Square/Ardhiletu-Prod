import React, { useEffect } from 'react'

import './landing.css'

const Landing = () => {

  return (
    <div className="whoIsWatching">
        <div className="logo-section">
            <h1>ARDHILETU</h1>
        </div>

        <div className="main-div">
            <h2>Who's logging in?</h2>
            <div className="memberDiv">
                <div className='user-btn'>
                    <button class="btn"></button>
                    <span>Admin</span>
                </div>
                <div className='user-btn'>
                    <button class="btn btn-2"></button>
                    <span>Buyer</span>
                </div>
                <div className='user-btn'>
                    <button class="btn btn-3"></button>
                    <span>Seller</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Landing