import React from "react";
import { useHistory } from "react-router-dom";

import "./landing.css";

const Landing = () => {
	const history = useHistory();

    const handleRouting = () => {
        history.push('/admin')
    }
	return (
		<div className='whoIsWatching'>
			<div className='logo-section'>
				<h1>ARDHILETU</h1>
			</div>

			<div className='main-div'>
				<h2>Who's logging in?</h2>
				<div className='memberDiv'>
					<div className='user-btn'>
						<button class='btn' onClick={() => handleRouting()}></button>
						<span>Admin</span>
					</div>
					<div className='user-btn'>
						<button class='btn btn-2' onClick={() => handleRouting()}></button>
						<span>Buyer</span>
					</div>
					<div className='user-btn'>
						<button class='btn btn-3' onClick={() => handleRouting()}></button>
						<span>Seller</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Landing;
