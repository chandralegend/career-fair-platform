import { Flex, Avatar, Text, Button, Skeleton } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { db } from "../../lib/firebase";
import { getPanel, getCompany } from "../../lib/api";
import moment from "moment";

async function formatData(session_data) {
	const panel = await getPanel(session_data.panel_id);
	const company = await getCompany(panel.data.company_id);
	return {
		...session_data,
		panel_no: panel.data.panel_no,
		company_name: company.data.name,
		company_logo: company.data.photoUrl,
		interview_schedule: session_data.start_time,
	};
}

//TODO: Add Checkin Fuctionality @Janith

const SessionCard = ({ session }) => {
	const [
		{ company_logo, company_name, assigned_students, isCheckinEnabled, interview_schedule, panel_no },
		setSession,
	] = useState({});
	const [loading, setLoading] = useState(true);

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

	useEffect(() => {
		const unsubscribe = fetchSession();
		return () => unsubscribe();
	}, []);

	return (
		<Flex boxShadow='base' p={3} flexDirection='column' mt={5} width='100%' rounded='md'>
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
						<Button colorScheme='blue' disabled={!isCheckinEnabled} rounded='full'>
							Check-In
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

export default SessionCard;
