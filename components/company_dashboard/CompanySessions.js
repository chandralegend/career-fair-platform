import { Flex, Heading, useColorModeValue, Text } from "@chakra-ui/react";
import moment from "moment";
import React from "react";

//TODO: Change Styles make it more appealing

const CompanySessions = ({ sessions_data, active_session }) => {
	const cardBackground = useColorModeValue("gray.100", "gray.900");

	return (
		<Flex width='100%' justifyContent='center' mt={3} shadow='md' p={3} background={cardBackground}>
			<Flex width='100%' flexDirection='column' alignItems='center'>
				<Heading size='md'>Sessions</Heading>
				{sessions_data.length ? (
					<Flex flexDirection='column' width='100%' overflow='scroll' maxHeight={300}>
						{sessions_data &&
							sessions_data.map((session, idx) => {
								return (
									<SessionCard
										session_index={idx + 1}
										data={session}
										key={session.id}
										acitve_session={active_session}
									/>
								);
							})}
					</Flex>
				) : (
					<div>No Sessions Available</div>
				)}
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
			shadow={isActive ? "md" : ""}
			rounded={5}
			p={3}
			flexDirection='column'
			mt={5}
			width='100%'
			borderLeft={isActive ? "5px solid darkcyan" : ""}
			fontWeight={isActive ? "normal" : "thin"}>
			<Flex flexDirection='column'>
				<Text fontSize={isActive ? "xl" : "large"}>Session {session_index}</Text>
				<Text fontSize={isActive ? "small" : "xs"}>{session_schedule}</Text>
			</Flex>
		</Flex>
	);
};

export default React.memo(CompanySessions);
