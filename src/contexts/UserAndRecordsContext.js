import { createContext } from "react";

export const UserAndRecordsContext = createContext({
	loggedInUser: { role: "", fullName: "" },
	records: [],
	singeRecordId: "",
	importedTableContent: [],
	userBalance: "0",
	changeSingleRecordId: (id) => {},
	changeBalance: (balance) => {},
	changeImportedDetails: (headers, content) => {},
	changeRecords: (records) => {},
	changeUser: (role, fullName) => {},
});
