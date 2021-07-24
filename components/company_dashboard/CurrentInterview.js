import { Flex, Button, Heading, ButtonGroup } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useInterview } from "../../lib/interviews";
import CandidateDetails from "./CandidateDetails";
import { getStudent, createMeeting } from "../../lib/api";
import { useAuth } from "../../lib/auth";

const CurrentInterview = ({ session, panel }) => {
	const { inQueueInterviews } = useInterview();
	const [student, setStudent] = useState();
	const [isloading, setisloading] = useState(false);
	const { user } = useAuth();
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
					isLoading={isloading}
					disabled={!inQueueInterviews.length && !session}
					onClick={async () => {
						if (session && student.name && panel.assign_representative.email && user) {
							setisloading(true);
							createMeeting({
								interviewId: inQueueInterviews[0].id,
								coordinatorEmail: panel.assign_representative.email,
								studentName: student.name,
								companyName: user.name,
							})
								.then((response) => {
									setisloading(false);
									window.open(response.data, "_blank");
								})
								.catch((e) => console.log(e));
						} else {
							console.log(No);
						}
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
