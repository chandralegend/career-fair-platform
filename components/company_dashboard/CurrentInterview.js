import { Flex, Button, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useInterview } from "../../lib/interviews";
import CandidateDetails from "./CandidateDetails";
import { getStudent } from "../../lib/api";

const CurrentInterview = () => {
	const { inQueueInterviews } = useInterview();
	const [student, setStudent] = useState();

	useEffect(() => {
		if (inQueueInterviews.length) {
			getStudent(inQueueInterviews[0].student_id).then((res) => {
				setStudent(res.data);
			});
		} else {
			setStudent();
		}
	}, [inQueueInterviews]);

	return (
		<Flex p={3} flexDirection='column' width='95%'>
			<Heading size='md'>Current Interview</Heading>
			<CandidateDetails data={student} />
			<Flex alignItems='center' width='100%' justifyContent='space-between' mt={3}>
				<Button
					colorScheme='green'
					shadow='md'
					rounded='full'
					disabled={!inQueueInterviews.length}
					onClick={() => {
						window.open(inQueueInterviews[0] && inQueueInterviews[0].meet_link, "_blank");
					}}>
					Join Meeting
				</Button>
				<Button
					colorScheme='orange'
					shadow='md'
					rounded='full'
					disabled={!inQueueInterviews.length}
					onClick={() => {
						window.open(inQueueInterviews[0] && "https://www.google.com/forms/about/", "_blank");
					}}>
					Feedback
				</Button>
			</Flex>
		</Flex>
	);
};

export default CurrentInterview;
