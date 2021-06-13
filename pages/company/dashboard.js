import React from "react";
import PrivateRoute from "../../components/PrivateRoute";

const dashboard = () => {
	return (
		<PrivateRoute endsWith='company.lk'>
			<div>Company Dashboard</div>
		</PrivateRoute>
	);
};

export default dashboard;
