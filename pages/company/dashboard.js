import { Flex, SlideFade, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import React from "react";

import PrivateRoute from "../../components/PrivateRoute";
import MenuBar from "../../components/MenuBar";
import CompanyDetails from "../../components/company_dashboard/CompanyDetails";
import Interviews from "../../components/company_dashboard/Interviews";
import InterviewController from "../../components/company_dashboard/InterviewController";
import CompanySessions from "../../components/company_dashboard/CompanySessions";
import PanelSelector from "../../components/company_dashboard/PanelSelector";

import { getAllPanels, getPanelSessions } from "../../lib/api";
import { useAuth } from "../../lib/auth";
import InterviewProvider from "../../lib/interviews";

const dashboard = () => {
	const { user } = useAuth();
	const [panel, setPanel] = useState(); // selected panel
	const [panels, setPanels] = useState([]);
	const [sessions, setSessions] = useState([]);
	const [currentSession, setCurrentSession] = useState({});

	function handleSelect(e) {
		setPanel(e.target.value);
		//TODO: Handle Panel
	}

	function getCurrentSession(sessions) {
		sessions.forEach((session) => {
			const time_now = new Date().getTime() / 1000;
			if (time_now >= session.start_time._seconds && time_now <= session.end_time._seconds) {
				setCurrentSession(session);
			}
		});
	}

	useEffect(() => {
		if (user) {
			// console.count("Getting Panels and Sessions");
			getAllPanels(user.uuid)
				.then((res) => {
					setPanels(res.data);
				})
				.catch((error) => console.log(error));
			if (panel) {
				getPanelSessions(panel).then((res) => {
					const sessions = res.data;
					setSessions(sessions);
					getCurrentSession(sessions);
				});
			}
		}
	}, [panel, user]);

	return (
		<PrivateRoute endsWith='@company.lk'>
			<Flex height='100vh' flexDirection='column' padding={5}>
				<MenuBar />
				<SlideFade in offsetY='30px'>
					{currentSession ? (
						<Flex flexDirection='row' mt={3}>
							<Flex flexDirection='column' width='20%' mr={3}>
								<PanelSelector data={panels} selected={panel} onSelect={handleSelect} />
								<CompanyDetails />
								<CompanySessions sessions_data={sessions} active_session={currentSession} />
							</Flex>
							<InterviewProvider session_id={currentSession.id}>
								<Flex width='55%'>
									<Interviews session={currentSession} />
								</Flex>
								<Flex width='25%' ml={3} flexDirection='column'>
									<InterviewController panel_id={panel} />
								</Flex>
							</InterviewProvider>
						</Flex>
					) : (
						//TODO: Better No Sessions Available Component
						<Text>No More Sessions Available</Text>
					)}
				</SlideFade>
			</Flex>
		</PrivateRoute>
	);
};

export default React.memo(dashboard);
