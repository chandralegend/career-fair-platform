import React from "react";
import { useAuth } from "../lib/auth";
import { Box, Button, Flex } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Lottie from "react-lottie";
import AccessDeniedLottie from "../lib/lottie_animations/accessdenied.json";
import LoadingLottie from "../lib/lottie_animations/loading.json";

const PrivateRoute = ({ children, endsWith }) => {
	const { user } = useAuth();

	if (user && user.user.email.endsWith(endsWith)) {
		return children;
	} else if (user && !user.user.email.endsWith(endsWith)) {
		return <AccessDenied />;
	} else {
		return <Loading />;
	}
};

const AccessDenied = () => {
	const accessDeniedLottie = {
		loop: false,
		autoplay: true,
		animationData: AccessDeniedLottie,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};
	return (
		<Flex alignItems='center' justifyContent='center' height='100vh'>
			<Box>
				<Lottie options={accessDeniedLottie} width={300} height={300}></Lottie>
				<Flex mt={5} justify='center'>
					<Button p={2} leftIcon={<ArrowBackIcon />} onClick={() => history.back()} variant='link'>
						Back to previous page
					</Button>
				</Flex>
			</Box>
		</Flex>
	);
};

const Loading = () => {
	const loadingLottie = {
		loop: true,
		autoplay: true,
		animationData: LoadingLottie,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	return (
		<Flex justifyContent='center' alignItems='center' height='100vh'>
			<Lottie options={loadingLottie} width={400} height={400}></Lottie>
		</Flex>
	);
};

export default React.memo(PrivateRoute);
