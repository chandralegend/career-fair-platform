import { Flex, useColorModeValue } from "@chakra-ui/react";

import InterviewUpdates from "./InterviewUpdates";
import AssignedSessions from "./AssignedSessions";

const Interviews = () => {
	const cardBackground = useColorModeValue("gray.100", "gray.900");
	return (
		<Flex width='56%' maxHeight='60%' flexDirection='column' ml={3} mr={3}>
			<Flex p={3} background={cardBackground} flexDirection='column' alignItems='center' shadow='md' mb={3}>
				<InterviewUpdates />
			</Flex>

			<Flex
				p={3}
				height='-webkit-fit-content'
				background={cardBackground}
				flexDirection='column'
				alignItems='center'
				shadow='md'>
				<AssignedSessions />
			</Flex>
		</Flex>
	);
};

export default Interviews;
