import { Flex, Fade } from "@chakra-ui/react";

import MenuBar from "../../components/MenuBar";
import UserDetails from "../../components/UserDetails";
import WalkInInterviews from "../../components/WalkInInterviews";
import Interviews from "../../components/Interviews";
import PrivateRoute from "../../components/PrivateRoute";

const dashboard = () => {
	return (
		<PrivateRoute endsWith='uom.lk'>
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
		</PrivateRoute>
	);
};

export default dashboard;
