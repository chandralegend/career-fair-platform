import { Flex, Heading, Button, ButtonGroup } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useInterview } from "../../lib/interviews";
import CandidateDetails from "./CandidateDetails";
import { getStudent } from "../../lib/api";

const InterviewControls = ({ panel_id }) => {
	const { inQueueInterviews, NextInterview, EnableCheckin, EnableWalkin } = useInterview();
	const [student, setStudent] = useState();

	useEffect(() => {
		if (inQueueInterviews.length >= 2) {
			getStudent(inQueueInterviews[1].student_id).then((res) => {
				setStudent(res.data);
			});
		} else {
			setStudent();
		}
	}, [inQueueInterviews]);

	return (
		<Flex height='-webkit-fit-content' flexDirection='column' p={3}>
			<Heading size='md'>Upcoming Interview</Heading>
			<CandidateDetails data={student} />
			<Button
				colorScheme='teal'
				shadow='md'
				m={3}
				rounded='full'
				disabled={!inQueueInterviews.length}
				onClick={() => {
					NextInterview();
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
						EnableWalkin(panel_id);
					}}>
					Enable Walkin Interviews
				</Button>
				<Button colorScheme='green' shadow='md' m={3} rounded='full' onClick={() => EnableCheckin(panel_id)}>
					Enable CheckIns
				</Button>
			</ButtonGroup>
		</Flex>
	);
};

export default InterviewControls;
