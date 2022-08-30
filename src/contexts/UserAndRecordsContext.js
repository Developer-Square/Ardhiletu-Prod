import { createContext } from "react";

export const UserAndRecordsContext = createContext({
	loggedInUser: { role: "", fullName: "" },
	records: [],
	singeRecordId: "",
	importedTableContent: [],
	singleRecordBalance: 0,
	changeSingleRecordId: (id) => {},
	changeRecordBalance: (balance) => {},
	changeImportedDetails: (headers, content) => {},
	changeRecords: (records) => {},
	changeUser: (role, fullName) => {},
});
