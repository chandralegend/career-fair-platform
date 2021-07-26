import { Flex, Heading, Spinner, Center } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

import { getAssignedSessions } from "../../lib/api";
import { useAuth } from "../../lib/auth";
import SessionCard from "./SessionCard";

const AssignedSessions = () => {
	const [sessions, setSessions] = useState([]);
	const [loading, setLoading] = useState(true);
	const { user } = useAuth();

	useEffect(() => {
		getAssignedSessions(user.uuid).then((assignedSessions) => {
			setSessions(assignedSessions.data);
			setLoading(false);
		});
	}, []);

	return (
		<Flex flexDirection='column' width='100%' p={2} overflow='scroll' maxHeight={350}>
			<Heading size='sm'>Your Assigned Interviews</Heading>
			{!loading ? (
				sessions.map((session) => {
					return <SessionCard key={session.id} session={session} />;
				})
			) : (
				<Center>
					<Spinner />
				</Center>
			)}
		</Flex>
	);
};

export default React.memo(AssignedSessions);
