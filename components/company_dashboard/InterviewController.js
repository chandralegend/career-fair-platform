import { useState, useEffect } from "react";
import { Flex, useColorModeValue } from "@chakra-ui/react";

import { useInterview } from "../../lib/interviews";
import CurrentInterview from "./CurrentInterview";
import InterviewControls from "./InterviewControls";
import { getStudent } from "../../lib/api";

const InterviewController = ({ panel_id }) => {
	const cardBackground = useColorModeValue("gray.100", "gray.900");
	const { inQueueInterviews } = useInterview();
	const [currentStudent, setCurrentStudent] = useState();
	const [nextStudent, setNextStudent] = useState();

	useEffect(() => {
		if (inQueueInterviews.length >= 2) {
			getStudent(inQueueInterviews[0].student_id).then((res) => {
				setCurrentStudent({
					...res.data,
					meet_link: inQueueInterviews[0].meet_link,
				});
			});
			getStudent(inQueueInterviews[1].student_id).then((res) => {
				setNextStudent({
					...res.data,
					current_interview: inQueueInterviews[0].id,
				});
			});
		}
	}, [inQueueInterviews]);

	return (
		<Flex
			width='100%'
			justifyContent='center'
			flexDirection='column'
			background={cardBackground}
			overflow='auto'
			rounded='2xl'
			p={3}>
			<CurrentInterview data={currentStudent} />
			<InterviewControls data={nextStudent} panel_id={panel_id} />
		</Flex>
	);
};

export default InterviewController;
