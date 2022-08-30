import { createContext } from "react";

export const UserAndRecordsContext = createContext({
	loggedInUser: { role: "", fullName: "" },
	records: { name: "", price: "" },
	importedTableContent: [],
	userBalance: "0",
	changeBalance: (balance) => {},
	changeImportedDetails: (headers, content) => {},
	changeRecords: (name, price) => {},
	changeUser: (role, fullName) => {},
});
