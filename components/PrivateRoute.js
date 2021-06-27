import React from "react";
import { useAuth } from "../lib/auth";
import router from "next/router";
import { Flex } from "@chakra-ui/react";

const PrivateRoute = ({ children, endsWith }) => {
	const { loading, user } = useAuth();

	if (!loading && (!user || !user.user.email.endsWith(endsWith))) {
		router.push("/");
	}
	return (
		<>
			{user ? (
				children
			) : (
				<Flex
					backgroundImage='https://www.pexels.com/photo/2397414/download/'
					backgroundSize='cover'
				/>
			)}
		</>
	);
};

export default PrivateRoute;
