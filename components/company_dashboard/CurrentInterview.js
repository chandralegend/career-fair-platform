import { Flex, Button, Heading, ButtonGroup } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useInterview } from "../../lib/interviews";
import CandidateDetails from "./CandidateDetails";
import { getStudent } from "../../lib/api";

const CurrentInterview = () => {
	const { inQueueInterviews } = useInterview();
	const [student, setStudent] = useState();

	useEffect(() => {
		if (inQueueInterviews.length) {
			console.count("current Interview get Student");
			getStudent(inQueueInterviews[0].student_id).then((res) => {
				setStudent(res.data);
			});
		} else {
			setStudent();
		}
	}, [inQueueInterviews]);

	return (
		<Flex p={3} flexDirection='column' width='100%'>
			<Heading size='md'>Current Interview</Heading>
			<CandidateDetails data={student} />
			<ButtonGroup mt={3}>
				<Button
					flex={1}
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
					flex={1}
					colorScheme='orange'
					shadow='md'
					rounded='full'
					disabled={!inQueueInterviews.length}
					onClick={() => {
						window.open(inQueueInterviews[0] && "https://www.google.com/forms/about/", "_blank");
					}}>
					Feedback
				</Button>
			</ButtonGroup>
		</Flex>
	);
};

export default CurrentInterview;
