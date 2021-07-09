import { Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import PrivateRoute from "../../components/PrivateRoute";
import MenuBar from "../../components/MenuBar";
import CompanyDetails from "../../components/company_dashboard/CompanyDetails";
import Interviews from "../../components/company_dashboard/Interviews";
import InterviewController from "../../components/company_dashboard/InterviewController";
import CompanySessions from "../../components/company_dashboard/CompanySessions";
import PanelSelector from "../../components/company_dashboard/PanelSelector";
import { useAuth } from "../../lib/auth";
import InterviewsProvider from "../../components/InterviewDetails";

import {
	getAllPanelKeys,
	getPanel,
	changePanelAvailability,
} from "../../lib/api";

const Dashboard = () => {
	const { user } = useAuth();
	const [panelKeys, setPanelKeys] = useState([]);
	const [selectedPanel, setSelectedPanel] = useState("");
	const [panel, setPanel] = useState({}); // details of panel
	const [key, setKey] = useState(""); //selected panel key
	const sessionsData = panel.sessions;

	const getActiveSession = (allSesions) => {
		const nowTime = new Date().getTime();
		let activeSession = "";
		if (sessionsData) {
			allSesions.forEach((item) => {
				let session_StartTime = item.start_time._seconds;
				let session_EndTime = item.end_time._seconds;
				if (
					(session_StartTime < nowTime / 1000) &
					(nowTime / 1000 < session_EndTime)
				) {
					activeSession = item.sessionId;
				}
			});
		}

		return activeSession; //---sessionID
	};
	const handleSelect = async (e) => {
		try {
			setSelectedPanel(e.target.value);
			setKey(panelKeys[e.target.value].panelID);

			await changePanelAvailability(panelKeys[e.target.value].panelID, {
				availability: true,
			});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getAllPanelKeys(user.user.uid).then((response) => {
			setPanelKeys(response.data);
		});
	}, []);
	useEffect(() => {
		if (key != "") {
			getPanel(key).then((response) => {
				setPanel(response.data);
			});
		}
	}, [key]);

	return (
		<Flex height="100vh" flexDirection="column" padding={5}>
			<MenuBar />
			<Flex flexDirection="row" mt={3}>
				<Flex flexDirection="column" width="20%" mr={3}>
					<PanelSelector
						onSelect={handleSelect}
						selected={selectedPanel}
						data={panelKeys}
					/>
					<CompanyDetails />
					<CompanySessions
						allSessions={
							sessionsData != undefined ? sessionsData : []
						}
						activeSession={getActiveSession(sessionsData)}
					/>
				</Flex>
				<InterviewsProvider sessionID={getActiveSession(sessionsData)}>
					<Flex width="55%">
						<Interviews
							activeSession={getActiveSession(sessionsData)}
						/>
					</Flex>
					<Flex width="25%" ml={3} flexDirection="column">
						<InterviewController panelID={key} />
					</Flex>
				</InterviewsProvider>
			</Flex>
		</Flex>
	);
};

const dashboard = () => {
	return (
		<PrivateRoute endsWith="@company.lk">
			<Dashboard />
		</PrivateRoute>
	);
};

export default dashboard;
