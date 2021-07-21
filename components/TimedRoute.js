import React from "react";
import router from "next/router";

const TimedRoute = ({ children, expiringDate }) => {
	const today = new Date();
	const isExpired = expiringDate < today.getTime() / 1000;

	if (isExpired) {
		router.push("/");
	}

	return <>{!isExpired && children}</>;
};

export default TimedRoute;
