import { Flex } from "@chakra-ui/react";

import MenuBar from "../../components/MenuBar";
import UserDetails from "../../components/UserDetails";
import WalkInInterviews from "../../components/WalkInInterviews";
import Interviews from "../../components/Interviews";

const dashboard = () => {
	return (
		<Flex
			height='100vh'
			flexDirection='column'
			padding={5}
			backgroundImage='https://bit.ly/3yXTlvM'>
			<MenuBar />
			<Flex flexDirection='row' mt={5}>
				<UserDetails />
				<Interviews />
				<WalkInInterviews />
			</Flex>
		</Flex>
	);
};

export default dashboard;
