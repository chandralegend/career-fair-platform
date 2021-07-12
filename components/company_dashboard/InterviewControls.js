import { Flex, Heading, Button, ButtonGroup } from "@chakra-ui/react";

import CandidateDetails from "./CandidateDetails";

const InterviewControls = ({ data }) => {
	return (
		<Flex height='-webkit-fit-content' flexDirection='column' p={3}>
			<Heading size='md'>Upcoming Interview</Heading>
			<CandidateDetails data={data} />
			<Button colorScheme='teal' shadow='md' m={3} rounded='full'>
				Next Interview
			</Button>
			<ButtonGroup flexDirection='column'>
				<Button colorScheme='orange' shadow='md' m={3} rounded='full'>
					Enable Walkin Interviews
				</Button>
				<Button colorScheme='green' shadow='md' m={3} rounded='full'>
					Enable CheckIns
				</Button>
			</ButtonGroup>
		</Flex>
	);
};

export default InterviewControls;
