import { Flex, Heading, Button, ButtonGroup } from "@chakra-ui/react";

import CandidateDetails from "./CandidateDetails";

const InterviewControls = ({ data }) => {
	return (
		<Flex height='-webkit-fit-content' flexDirection='column' p={3}>
			<Heading size='md'>Upcoming Interview</Heading>
			<CandidateDetails data={data} />
			<ButtonGroup flexDirection='column'>
				<Button colorScheme='teal' shadow='md' m={3}>
					Next Interview
				</Button>
				<Button colorScheme='orange' shadow='md' m={3}>
					Enable Walkin Interviews
				</Button>
			</ButtonGroup>
		</Flex>
	);
};

export default InterviewControls;
