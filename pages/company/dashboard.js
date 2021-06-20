import { Flex } from "@chakra-ui/react";

import PrivateRoute from "../../components/PrivateRoute";
import MenuBar from "../../components/MenuBar";
import CompanyDetails from "../../components/company_dashboard/CompanyDetails";
import Interviews from "../../components/company_dashboard/Interviews";
import InterviewController from "../../components/company_dashboard/InterviewController";
import CompanySessions from "../../components/company_dashboard/CompanySessions";
import PanelSelector from "../../components/company_dashboard/PanelSelector";

const dashboard = () => {
	return (
		<PrivateRoute endsWith='@company.lk'>
			<Flex height='100vh' flexDirection='column' padding={5}>
				<MenuBar />
				<Flex flexDirection='row' mt={3}>
					<Flex flexDirection='column' width='20%' mr={3}>
						<PanelSelector />
						<CompanyDetails />
						<CompanySessions />
					</Flex>
					<Flex width='55%'>
						<Interviews />
					</Flex>
					<Flex width='25%' ml={3} flexDirection='column'>
						<InterviewController />
					</Flex>
				</Flex>
			</Flex>
		</PrivateRoute>
	);
};

export default dashboard;
