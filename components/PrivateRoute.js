import React from "react";
import { useAuth } from "../lib/auth";
import router from "next/router";

const PrivateRoute = ({ children, endsWith }) => {
	const { loading, user } = useAuth();

	if (!loading && (!user || !user.user.email.endsWith(endsWith))) {
		router.push("/");
	}
	return <>{user && children}</>;
};

export default PrivateRoute;
