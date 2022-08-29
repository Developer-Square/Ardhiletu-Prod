import React, { useState } from "react";
import { UserAndRecordsContext } from "contexts/UserAndRecordsContext";

export default function UserAndRecordsWrapper(props) {
	const [user, setUser] = useState("");
	const [role, setRole] = useState("");
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [userBalance, setUserBalance] = useState("0");
	const [importedHeaders, setImportedHeaders] = useState([]);
	const [importedTableContent, setImportedTableContent] = useState([]);

	function changeUser(role, user) {
		setRole(role);
		setUser(user);
	}

	function changeRecords(name, price) {
		setName(name);
		setPrice(price);
	}

	function changeImportedDetails(headers, content) {
		setImportedHeaders(headers);
		setImportedTableContent(content);
	}

	function changeBalance(balance) {
		setUserBalance(balance);
	}

	return (
		<UserAndRecordsContext.Provider
			value={{
				loggedInUser: { role: role, fullName: user },
				records: { name: name, price: price },
				importedHeaders: importedHeaders,
				importedTableContent: importedTableContent,
				userBalance: userBalance,
				changeBalance: changeBalance,
				changeImportedDetails: changeImportedDetails,
				changeRecords: changeRecords,
				changeUser: changeUser,
			}}
		>
			{props.children}
		</UserAndRecordsContext.Provider>
	);
}
