import { Flex, Heading, Button, ButtonGroup } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useInterview } from "../../lib/interviews";
import CandidateDetails from "./CandidateDetails";
import { getStudent } from "../../lib/api";

//TODO: Comeup with a better solution to Enable Checkin and Walkin Actions @Janith

const InterviewControls = ({ session, panels }) => {
	const { inQueueInterviews, NextInterview, UpdateCheckin, UpdateWalkin, panel_id, session_id } = useInterview();
	const [student, setStudent] = useState();
	const [walkin, setWalkin] = useState(false);
	const [checkin, setCheckin] = useState(false);

	useEffect(() => {
		setWalkin(panel_id && panels.filter((panel) => panel.id === panel_id)[0].isWalkinEnabled);
		setCheckin(session && session.isCheckinEnabled);
		console.log(walkin, checkin);
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
				colorScheme='green'
				shadow='md'
				width='100%'
				mt={3}
				rounded='full'
				disabled={!inQueueInterviews.length}
				onClick={() => {
					NextInterview();
				}}>
				Next Interview
			</Button>
			<ButtonGroup mt={3}>
				<Button
					disabled={!panel_id}
					flex={1}
					colorScheme='orange'
					shadow='md'
					rounded='full'
					fontSize='small'
					onClick={() => {
						UpdateWalkin(!walkin);
						setWalkin(!walkin);
					}}>
					{walkin ? "Disable" : "Enable"} Walkin
				</Button>
				<Button
					disabled={!panel_id}
					colorScheme='green'
					shadow='md'
					rounded='full'
					fontSize='small'
					onClick={() => {
						UpdateCheckin(!checkin);
						setCheckin(!checkin);
					}}
					flex={1}>
					{checkin ? "Disable" : "Enable"} CheckIn
				</Button>
			</ButtonGroup>
		</Flex>
	);
};

export default InterviewControls;
