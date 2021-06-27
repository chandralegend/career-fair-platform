import { Flex, Avatar, Text, Button } from "@chakra-ui/react";
import { useState } from "react";

import { db } from "../../lib/firebase";

async function getSession(sessionRef) {
	const session = await sessionRef.data();

	const panelRef = await db.collection("panels").doc(session.panel_id).get();
	const panel = await panelRef.data();

	const companyRef = await db
		.collection("companies")
		.doc(panel.company_id)
		.get();
	const company = await companyRef.data();

	const interviews = await db
		.collection("interviews")
		.where("session_id", "==", sessionRef.id)
		.get();

	const panel_no = panel.panel_no;
	const company_name = company.name;
	const company_logo = company.photoUrl;
	const interview_schedule = session.start_time.toDate().toISOString();
	const queue_length = interviews.size;

	return {
		panel_no,
		company_name,
		company_logo,
		interview_schedule,
		queue_length,
	};
}

const SessionCard = ({ sessionRef }) => {
	const [session, setSession] = useState({});
	getSession(sessionRef).then((session_data) => {
		setSession(session_data);
	});

	return (
		<Flex
			boxShadow='md'
			rounded={5}
			p={3}
			flexDirection='column'
			mb={5}
			width='100%'>
			<Flex justifyContent='space-between'>
				<Flex alignItems='center'>
					<Avatar
						size='md'
						src={session.company_logo}
						mr={3}
						backgroundColor='white'
						boxShadow='lg'
					/>
					<Flex flexDirection='column'>
						<Text fontSize='larger'>{session.company_name}</Text>
						<Text fontSize='smaller'>Panel {session.panel_no}</Text>
					</Flex>
				</Flex>
				<Flex alignItems='center'>
					<Text fontSize='large'>
						{session.queue_length} people in the queue
					</Text>
				</Flex>
				<Flex alignItems='center'>
					<Button colorScheme='blue'>Check-In</Button>
				</Flex>
			</Flex>
			<Flex justifyContent='flex-end'>
				<Text fontSize='xs'>{session.interview_schedule}</Text>
			</Flex>
		</Flex>
	);
};

export default SessionCard;
