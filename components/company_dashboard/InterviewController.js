import { Flex, useColorModeValue } from "@chakra-ui/react";

import CurrentInterview from "./CurrentInterview";
import InterviewControls from "./InterviewControls";

const InterviewController = ({ panel_id }) => {
	const cardBackground = useColorModeValue("gray.100", "gray.900");

	return (
		<Flex flexDirection='column'>
			<Flex
				width='100%'
				justifyContent='center'
				flexDirection='column'
				background={cardBackground}
				overflow='auto'
				shadow='md'
				p={3}>
				<CurrentInterview />
			</Flex>
			<Flex
				width='100%'
				justifyContent='center'
				flexDirection='column'
				background={cardBackground}
				overflow='auto'
				shadow='md'
				mt={3}
				p={3}>
				<InterviewControls panel_id={panel_id} />
			</Flex>
		</Flex>
	);
};

export default InterviewController;
