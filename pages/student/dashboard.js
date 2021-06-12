import { Flex, Fade } from "@chakra-ui/react";

import MenuBar from "../../components/MenuBar";
import UserDetails from "../../components/UserDetails";
import WalkInInterviews from "../../components/WalkInInterviews";
import Interviews from "../../components/Interviews";
import { useAuth } from "../../lib/auth";
import router from "next/router";

const dashboard = () => {
	const { loading, user } = useAuth();

	if (!loading && !user) {
		router.push("/");
	}

	return (
		<>
			{user ? (
				<Flex height='100vh' flexDirection='column' padding={5}>
					<MenuBar />
					<Fade in>
						<Flex flexDirection='row' mt={5}>
							<UserDetails />
							<Interviews />
							<WalkInInterviews />
						</Flex>
					</Fade>
				</Flex>
			) : null}
		</>
	);
};

export default dashboard;
