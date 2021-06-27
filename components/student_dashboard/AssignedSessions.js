import { Flex, Heading, Spinner, Center } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import { db } from "../../lib/firebase";
import { useAuth } from "../../lib/auth";
import SessionCard from "./SessionCard";

const AssignedSessions = () => {
	const [sessions, setSessions] = useState([]);
	const [loading, setLoading] = useState(true);
	const { user } = useAuth();

	const fetchSessions = () => {
		try {
			db.collection("sessions")
				.where("assigned_students", "array-contains", user.uuid)
				.orderBy("start_time")
				.onSnapshot((snapshot) => {
					console.log("Snaphot Recieved");
					setLoading(true);
					const new_sessions = [];
					snapshot.forEach((session) => {
						new_sessions.push(session);
					});
					setLoading(false);
					setSessions(new_sessions);
				});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchSessions();
	}, []);

	return (
		<Flex
			flexDirection='column'
			mt={5}
			width='100%'
			p={2}
			overflow='scroll'
			maxHeight={500}>
			<Heading size='sm' mb={5}>
				Your Assigned Interviews
			</Heading>
			{!loading ? (
				sessions.map((session) => {
					return <SessionCard key={session.id} sessionRef={session} />;
				})
			) : (
				<Center>
					<Spinner />
				</Center>
			)}
		</Flex>
	);
};

export default AssignedSessions;
