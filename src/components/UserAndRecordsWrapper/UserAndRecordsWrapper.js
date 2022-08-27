import React, { useState } from "react";
import { UserAndRecordsContext } from "contexts/UserAndRecordsContext";

export default function UserAndRecordsWrapper(props) {
	const [user, setUser] = useState("");
	const [records, setRecords] = useState("");
	const [importedHeaders, setImportedHeaders] = useState([]);
	const [importedTableContent, setImportedTableContent] = useState([]);

	function changeUser(user) {
		setUser(user);
	}

	function changeRecords(rec) {
		setRecords(rec);
	}

	function changeImportedDetails(headers, content) {
		setImportedHeaders(headers);
		setImportedTableContent(content);
	}

	return (
		<UserAndRecordsContext.Provider
			value={{
				user: user,
				records: records,
				importedHeaders: importedHeaders,
				importedTableContent: importedTableContent,
				changeImportedDetails: changeImportedDetails,
				changeRecords: changeRecords,
				changeUser: changeUser,
			}}
		>
			{props.children}
		</UserAndRecordsContext.Provider>
	);
}
