import { Flex, Avatar, Text, Button, Skeleton } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { db } from "../../lib/firebase";
import { getPanel, getCompany, createInterview } from "../../lib/api";
import moment from "moment";
import { useAuth } from "../../lib/auth";

async function formatData(session_data) {
	const panel = await getPanel(session_data.panel_id);
	const company = await getCompany(panel.data.company_id);
	return {
		...session_data,
		panel_no: panel.data.panel_no,
		company_name: company.data.name,
		company_logo: company.data.photoUrl,
		interview_schedule: session_data.start_time,
		company_id: panel.data.company_id,
	};
}

const SessionCard = ({ session }) => {
	const [
		{ company_logo, company_name, assigned_students, isCheckinEnabled, interview_schedule, panel_no, company_id },
		setSession,
	] = useState({});
	const [loading, setLoading] = useState(true);
	const { user } = useAuth();

	const fetchSession = () => {
		try {
			const unsubscribe = db
				.collection("sessions")
				.doc(session.id)
				.onSnapshot((snapshot) => {
					const session_data = snapshot.data();
					formatData(session_data).then((session) => {
						setSession(session);
					});
					setLoading(false);
				});
			return unsubscribe;
		} catch (error) {
			console.log(error);
		}
	};

	const handleCheckIn = (session, userID) => {
		const data = {
			studentId: userID,
			sessionId: session.id,
			isWalkin: false,
			companyId: company_id,
		};
		createInterview(data);
	};

	useEffect(() => {
		const unsubscribe = fetchSession();
		return () => unsubscribe();
	}, []);

	return (
		<Flex boxShadow='base' p={3} flexDirection='column' mt={5} width='100%'>
			<Skeleton isLoaded={!loading} rounded='xl' fadeDuration={3}>
				<Flex alignItems='center'>
					<Flex width='30%'>
						<Avatar size='md' src={company_logo} mr={3} backgroundColor='white' boxShadow='lg' />
						<Flex flexDirection='column'>
							<Text noOfLines={1} fontSize='larger'>
								{company_name}
							</Text>
							<Text fontSize='smaller'>Panel {panel_no}</Text>
						</Flex>
					</Flex>
					<Flex width='55%'>
						<Text fontSize='large'>{assigned_students && assigned_students.length} people are assigned</Text>
					</Flex>
					<Flex width='15%'>
						<Button
							colorScheme='blue'
							variant={user.completed_companies && user.completed_companies.includes(company_id) ? "outline" : "solid"}
							disabled={
								!isCheckinEnabled ||
								user.checkedin ||
								(user.completed_companies && user.completed_companies.includes(company_id))
							}
							rounded='full'
							onClick={() => handleCheckIn(session, user.uuid)}>
							{user.completed_companies && user.completed_companies.includes(company_id) ? "Complete" : "Check-In"}
						</Button>
					</Flex>
				</Flex>
				<Flex justifyContent='flex-end'>
					<Text fontSize='xs'>
						{interview_schedule && moment.unix(interview_schedule.seconds).format("dddd, MMMM Do YYYY, h:mm:ss a")}
					</Text>
				</Flex>
			</Skeleton>
		</Flex>
	);
};

export default React.memo(SessionCard);
