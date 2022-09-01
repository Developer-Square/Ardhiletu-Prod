import React, { useState } from "react";
import { UserAndRecordsContext } from "contexts/UserAndRecordsContext";

export default function UserAndRecordsWrapper(props) {
	const [user, setUser] = useState("");
	const [role, setRole] = useState("");
	const [id, setID] = useState("");
	const [records, setRecords] = useState([]);
	const [singleRecordBalance, setRecordBalance] = useState(0);
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

	function changeRecordBalance(balance) {
		setRecordBalance(balance);
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
				singleRecordBalance: singleRecordBalance,
				singeRecordId: id,
				changeRecordBalance: changeRecordBalance,
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
