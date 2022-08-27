import React, { useState } from "react";
import { UserAndRecordsContext } from "contexts/UserAndRecordsContext";

export default function UserAndRecordsWrapper(props) {
	const [user, setUser] = useState("");
	const [records, setRecords] = useState("");

	function changeUser(user) {
		setUser(user);
	}

	function changeRecords(rec) {
		setRecords(rec);
	}

	return (
		<UserAndRecordsContext.Provider
			value={{
				user: user,
				records: records,
				changeRecords: changeRecords,
				changeUser: changeUser,
			}}
		>
			{props.children}
		</UserAndRecordsContext.Provider>
	);
}
