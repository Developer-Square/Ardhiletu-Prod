import Dashboard from "views/Dashboard.js";
import Map from "views/Map.js";
import UserProfile from "views/UserProfile.js";

var routes = [
	{
		path: "/dashboard",
		name: "Dashboard",
		rtlName: "لوحة القيادة",
		icon: "tim-icons icon-chart-pie-36",
		component: Dashboard,
		layout: "/admin",
	},
	{
		path: "/map",
		name: "Map",
		rtlName: "خرائط",
		icon: "tim-icons icon-pin",
		component: Map,
		layout: "/admin",
	},
	{
		path: "/user-profile",
		name: "User Profile",
		rtlName: "ملف تعريفي للمستخدم",
		icon: "tim-icons icon-single-02",
		component: UserProfile,
		layout: "/admin",
	},
];
export default routes;
