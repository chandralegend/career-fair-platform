import { Flex, Heading, useColorModeValue, Text } from "@chakra-ui/react";
import moment from "moment";
import React from "react";

const CompanySessions = ({ sessions_data, active_session }) => {
	const cardBackground = useColorModeValue("gray.100", "gray.900");

	return (
		<Flex width='100%' justifyContent='center' mt={3} p={3} background={cardBackground} rounded='2xl'>
			<Flex width='100%' flexDirection='column' alignItems='center'>
				<Heading size='md'>Sessions</Heading>
				<Flex flexDirection='column' width='100%' overflow='scroll' maxHeight={300}>
					{sessions_data &&
						sessions_data.map((session, idx) => {
							return (
								<SessionCard session_index={idx + 1} data={session} key={session.id} acitve_session={active_session} />
							);
						})}
				</Flex>
			</Flex>
		</Flex>
	);
};

const SessionCard = ({ session_index, data, acitve_session }) => {
	const session_schedule = `${moment.unix(data.start_time._seconds).format("dddd, MMMM Do , h:mm a")} - ${moment
		.unix(data.end_time._seconds)
		.format("dddd, MMMM Do , h:mm a")}`;
	const isActive = acitve_session.id === data.id;

	return (
		<Flex
			shadow='md'
			rounded={5}
			p={3}
			flexDirection='column'
			mt={5}
			width='100%'
			borderLeft={isActive ? "5px solid teal" : ""}>
			<Flex flexDirection='column'>
				<Text fontSize='larger'>Session {session_index}</Text>
				<Text fontSize='xs'>{session_schedule}</Text>
			</Flex>
		</Flex>
	);
};

export default React.memo(CompanySessions);
