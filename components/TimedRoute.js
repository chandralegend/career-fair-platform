import React from "react";
import router from "next/router";

const TimedRoute = ({ children, expiringDate }) => {
	const today = new Date();

	if (expiringDate < today.getTime() / 1000) {
		router.push("/");
	}

	return <>{children}</>;
};

export default TimedRoute;
