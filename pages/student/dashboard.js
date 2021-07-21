import { Flex, SlideFade } from "@chakra-ui/react";

import MenuBar from "../../components/MenuBar";
import PrivateRoute from "../../components/PrivateRoute";
import UserDetails from "../../components/student_dashboard/UserDetails";
import WalkInInterviews from "../../components/student_dashboard/WalkInInterviews";
import Interviews from "../../components/student_dashboard/Interviews";
import Footer from "../../components/Footer";

const dashboard = () => {
	return (
		<PrivateRoute endsWith='uom.lk'>
			<Flex height='100vh' flexDirection='column' padding={5} backgroundSize='cover'>
				<MenuBar />
				<SlideFade in offsetY='30px'>
					<Flex flexDirection='row' mt={3}>
						<UserDetails />
						<Interviews />
						<WalkInInterviews />
					</Flex>
				</SlideFade>
				<Flex position='absolute' bottom={5} width='100%'>
					<Footer />
				</Flex>
			</Flex>
		</PrivateRoute>
	);
};

export default dashboard;
