import { Flex, Button, Heading, ButtonGroup } from "@chakra-ui/react";

import CandidateDetails from "./CandidateDetails";

const CurrentInterview = ({ data }) => {
	return (
		<Flex p={3} flexDirection='column' width='95%'>
			<Heading size='md'>Current Interview</Heading>
			<CandidateDetails data={data} />
			<Flex alignItems='center' width='100%' flexDirection='column' justifyContent='center' mt={3}>
				<Button
					colorScheme='green'
					shadow='md'
					rounded='full'
					onClick={() => {
						window.open(data.meet_link, "_blank");
					}}>
					Join Meeting
				</Button>
				<Button
					colorScheme='orange'
					shadow='md'
					rounded='full'
					onClick={() => {
						window.open("https://www.google.com/forms/about/", "_blank");
					}}>
					Feedback
				</Button>
			</Flex>
		</Flex>
	);
};

export default CurrentInterview;
