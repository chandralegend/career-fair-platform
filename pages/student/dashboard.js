import { Center, Flex, SlideFade } from "@chakra-ui/react";
import Head from "next/head";

import MenuBar from "../../components/MenuBar";
import PrivateRoute from "../../components/PrivateRoute";
import UserDetails from "../../components/student_dashboard/UserDetails";
import WalkInInterviews from "../../components/student_dashboard/WalkInInterviews";
import Interviews from "../../components/student_dashboard/Interviews";
import Footer from "../../components/Footer";

const dashboard = () => {
	return (
		<PrivateRoute endsWith='uom.lk'>
			<Flex
				height='100vh'
				flexDirection='column'
				padding={5}
				backgroundColor='teal'
				// backgroundImage='https://www.pexels.com/photo/746386/download/?search_query=&tracking_id=ei3wwg0t4lc'
				backgroundSize='cover'>
				<Head>
					<title>Dashboard - Student</title>
					<meta name='viewport' content='initial-scale=1.0, width=device-width' />
				</Head>
				<Center>
					<Flex flexDirection='column' width='1300px' minWidth='1300px'>
						<MenuBar />
						<SlideFade in offsetY='30px'>
							<Flex flexDirection='row' mt={3}>
								<UserDetails />
								<Interviews />
								<WalkInInterviews />
							</Flex>
						</SlideFade>
					</Flex>
				</Center>
				{/* <Flex position='absolute' bottom={5} right={5}>
					<Footer />
				</Flex> */}
			</Flex>
		</PrivateRoute>
	);
};

export default dashboard;
