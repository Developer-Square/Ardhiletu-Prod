import { createContext } from "react";

export const UserAndRecordsContext = createContext({
	loggedInUser: "",
	records: "",
	changeRecords: (record) => {},
	changeUser: (user) => {},
});
