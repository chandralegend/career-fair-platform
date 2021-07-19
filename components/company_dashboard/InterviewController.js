import { Flex, useColorModeValue } from "@chakra-ui/react";

import CurrentInterview from "./CurrentInterview";
import InterviewControls from "./InterviewControls";

const InterviewController = ({ panel_id }) => {
	const cardBackground = useColorModeValue("gray.100", "gray.900");

	return (
		<Flex
			width='100%'
			justifyContent='center'
			flexDirection='column'
			background={cardBackground}
			overflow='auto'
			rounded='2xl'
			p={3}>
			<CurrentInterview />
			<InterviewControls panel_id={panel_id} />
		</Flex>
	);
};

export default InterviewController;
