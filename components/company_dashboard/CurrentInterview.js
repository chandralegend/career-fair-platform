import { Flex, Button, Heading, ButtonGroup } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useInterview } from "../../lib/interviews";
import CandidateDetails from "./CandidateDetails";
import { getStudent, createMeeting } from "../../lib/api";

const CurrentInterview = ({ session }) => {
	const { inQueueInterviews } = useInterview();
	const [student, setStudent] = useState();
	const [isloading, setisloading] = useState(false);
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
		<Flex p={3} flexDirection="column" width="100%">
			<Heading size="md">Current Interview</Heading>
			<CandidateDetails data={student} />
			<ButtonGroup mt={3}>
				<Button
					flex={1}
					colorScheme="green"
					shadow="md"
					rounded="full"
					isLoading={isloading}
					disabled={!inQueueInterviews.length && !session}
					onClick={async () => {
						setisloading(true);
						createMeeting({
							interviewId: inQueueInterviews[0].id,
							sessionTime: session.start_time._seconds * 1000,
						})
							.then((response) => {
								setisloading(false);
								window.open(response.data, "_blank");
							})
							.catch((e) => console.log(e));
					}}
				>
					Join Meeting
				</Button>
				<Button
					flex={1}
					colorScheme="orange"
					shadow="md"
					rounded="full"
					disabled={!inQueueInterviews.length}
					onClick={() => {
						window.open(inQueueInterviews[0] && "https://www.google.com/forms/about/", "_blank");
					}}
				>
					Feedback
				</Button>
			</ButtonGroup>
		</Flex>
	);
};

export default CurrentInterview;
