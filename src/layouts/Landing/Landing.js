import { UserAndRecordsContext } from "contexts/UserAndRecordsContext";
import React from "react";
import { useHistory } from "react-router-dom";

import "./landing.css";

export default function Landing() {
	const history = useHistory();

	const handleRouting = (setCurrentUser, userType) => {
		setCurrentUser(userType);
		history.push("/admin");
	};
	return (
		<UserAndRecordsContext.Consumer>
			{({ changeUser }) => (
				<div className='whoIsWatching'>
					<div className='logo-section'>
						<h1>ARDHILETU</h1>
					</div>

					<div className='main-div'>
						<h2>Who's logging in?</h2>
						<div className='memberDiv'>
							<div className='user-btn'>
								<button
									className='btn'
									onClick={() => handleRouting(changeUser, "admin")}
								></button>
								<span>Admin</span>
							</div>
							<div className='user-btn'>
								<button
									className='btn btn-2'
									onClick={() => handleRouting(changeUser, "buyer")}
								></button>
								<span>Buyer</span>
							</div>
							<div className='user-btn'>
								<button
									className='btn btn-3'
									onClick={() => handleRouting(changeUser, "seller")}
								></button>
								<span>Seller</span>
							</div>
						</div>
					</div>
				</div>
			)}
		</UserAndRecordsContext.Consumer>
	);
}
