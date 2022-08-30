import React, { useState } from "react";
import { UserAndRecordsContext } from "contexts/UserAndRecordsContext";

export default function UserAndRecordsWrapper(props) {
	const [user, setUser] = useState("");
	const [role, setRole] = useState("");
	const [id, setID] = useState("");
	const [records, setRecords] = useState([]);
	const [userBalance, setUserBalance] = useState("0");
	const [importedTableContent, setImportedTableContent] = useState([]);

	function changeUser(role, user) {
		setRole(role);
		setUser(user);
	}

	function changeRecords(records) {
		setRecords(records);
	}

	function changeImportedDetails(content) {
		setImportedTableContent(content);
	}

	function changeBalance(balance) {
		setUserBalance(balance);
	}

	function changeId(id) {
		setID(id);
	}

	return (
		<UserAndRecordsContext.Provider
			value={{
				loggedInUser: { role: role, fullName: user },
				records: records,
				importedTableContent: importedTableContent,
				userBalance: userBalance,
				singeRecordId: id,
				changeBalance: changeBalance,
				changeImportedDetails: changeImportedDetails,
				changeRecords: changeRecords,
				changeUser: changeUser,
				changeId: changeId,
			}}
		>
			{props.children}
		</UserAndRecordsContext.Provider>
	);
}
