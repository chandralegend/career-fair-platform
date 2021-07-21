import React from "react";
import { useAuth } from "../lib/auth";

const PrivateRoute = ({ children, endsWith }) => {
	const { user } = useAuth();

	if (user && user.user.email.endsWith(endsWith)) {
		return children;
	} else if (user && !user.user.email.endsWith(endsWith)) {
		//TODO: Create a Access Denied Page with Button to Index @Geshan
		return <a>Access Denied</a>;
	} else {
		//TODO: Create a Loading Page @Geshan
		return <a>loading</a>;
	}
};

export default React.memo(PrivateRoute);
