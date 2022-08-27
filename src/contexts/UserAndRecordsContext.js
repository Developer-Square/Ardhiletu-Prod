import { createContext } from "react";

export const UserAndRecordsContext = createContext({
	loggedInUser: "",
	records: "",
	importedHeaders: [],
	importedTableContent: [],
	changeImportedDetails: (headers, content) => {},
	changeRecords: (record) => {},
	changeUser: (user) => {},
});
