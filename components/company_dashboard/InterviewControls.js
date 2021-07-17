import { Flex, Heading, Button, ButtonGroup } from "@chakra-ui/react";

import CandidateDetails from "./CandidateDetails";
import { updateInterview, updateWalkinStatus } from "../../lib/api";

const InterviewControls = ({ data, panel_id }) => {
	return (
		<Flex height='-webkit-fit-content' flexDirection='column' p={3}>
			<Heading size='md'>Upcoming Interview</Heading>
			<CandidateDetails data={data} />
			<Button
				colorScheme='teal'
				shadow='md'
				m={3}
				rounded='full'
				onClick={() => {
					updateInterview(data.current_interview);
				}}>
				Next Interview
			</Button>
			<ButtonGroup flexDirection='column'>
				<Button
					colorScheme='orange'
					shadow='md'
					m={3}
					rounded='full'
					onClick={() => {
						updateWalkinStatus(panel_id, { status: true });
					}}>
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
