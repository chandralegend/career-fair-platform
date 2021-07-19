import { Flex, Heading, Button, ButtonGroup } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useInterview } from "../../lib/interviews";
import CandidateDetails from "./CandidateDetails";
import { getStudent } from "../../lib/api";

//TODO: Comeup with a better solution to Enable Checkin and Walkin Actions

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
			<Flex flexDirection='row' justifyContent='space-evenly'>
				<Button
					colorScheme='orange'
					shadow='md'
					rounded='full'
					onClick={() => {
						EnableWalkin(panel_id);
					}}>
					Walkin
				</Button>
				<Button colorScheme='green' shadow='md' rounded='full' onClick={() => EnableCheckin(panel_id)}>
					CheckIn
				</Button>
			</Flex>
		</Flex>
	);
};

export default InterviewControls;
