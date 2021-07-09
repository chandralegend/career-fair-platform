import { Flex, Heading, useColorModeValue, Text } from "@chakra-ui/react";

const Sessions = (prop) => {
	const allSessions = prop.allSessions;

	const cardBackground = useColorModeValue("gray.100", "gray.900");
	return (
		<Flex
			width="100%"
			justifyContent="center"
			mt={3}
			p={3}
			background={cardBackground}
			rounded={6}
		>
			<Flex width="100%" flexDirection="column" alignItems="center">
				<Heading size="md" mb={3}>
					Sessions
				</Heading>
				<Flex
					flexDirection="column"
					width="100%"
					overflow="scroll"
					maxHeight={300}
				>
					{allSessions.map((session) => {
						const sessionNumber = allSessions.indexOf(session) + 1;
						return (
							<SessionCard
								sessionNumber={sessionNumber}
								data={session}
								key={session.sessionId}
								activeSession={prop.activeSession}
							/>
						);
					})}
				</Flex>
			</Flex>
		</Flex>
	);
};

const SessionCard = ({ data, sessionNumber, activeSession }) => {
	const startTime = new Date(data.start_time._seconds * 1000);
	const endTime = new Date(data.end_time._seconds * 1000);
	let activeColor = "red";
	data.sessionId === activeSession ? (activeColor = "5px solid teal") : "";

	return (
		<Flex
			shadow="md"
			rounded={5}
			p={3}
			flexDirection="column"
			mb={5}
			width="100%"
			borderLeft={activeColor}
		>
			<Flex flexDirection="column">
				<Text fontSize="larger">{`Sesion ${sessionNumber}`}</Text>
				<Text fontSize="xs">{`${startTime.toDateString()}`}</Text>
				<Text fontSize="xs">{`${startTime.toLocaleTimeString()} - ${endTime.toLocaleTimeString()}`}</Text>
			</Flex>
		</Flex>
	);
};

export default Sessions;
