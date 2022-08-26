import React, { useState } from "react";
import { LoggedInUserContext } from "contexts/LoggedInUserContext";

export default function LoggedInUserWrapper(props) {
	const [user, setUser] = useState('');

	function changeUser(user) {
		setUser(user);
	}

	return (
		<LoggedInUserContext.Provider
			value={{ user: user, changeUser: changeUser }}
		>
			{props.children}
		</LoggedInUserContext.Provider>
	);
}
