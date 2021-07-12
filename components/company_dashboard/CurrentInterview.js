import { Flex, Button, Heading, ButtonGroup } from "@chakra-ui/react";

import CandidateDetails from "./CandidateDetails";

const CurrentInterview = ({ data }) => {
	return (
		<Flex p={3} flexDirection='column' width='95%'>
			<Heading size='md'>Current Interview</Heading>
			<CandidateDetails data={data} />
			<Flex
				alignItems='center'
				width='100%'
				flexDirection='row'
				justifyContent='center'
				mt={3}>
				<ButtonGroup>
					<Button colorScheme='green' shadow='md' rounded='full'>
						Join Meeting
					</Button>
					<Button colorScheme='orange' shadow='md' rounded='full'>
						Feedback
					</Button>
				</ButtonGroup>
			</Flex>
		</Flex>
	);
};

export default CurrentInterview;
