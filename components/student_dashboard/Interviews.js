import { Flex, useColorModeValue } from "@chakra-ui/react";

import InterviewUpdates from "./InterviewUpdates";
import AssignedSessions from "./AssignedSessions";

const Interviews = () => {
	const cardBackground = useColorModeValue("gray.100", "gray.900");
	return (
		<Flex width='56%' justifyContent='center' maxHeight='60%'>
			<Flex
				p={3}
				height='-webkit-fit-content'
				width='100%'
				rounded={6}
				background={cardBackground}
				flexDirection='column'
				alignItems='center'
				shadow='md'
				ml={3}
				mr={3}>
				<InterviewUpdates />
				<AssignedSessions />
			</Flex>
		</Flex>
	);
};

export default Interviews;
