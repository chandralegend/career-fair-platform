import { Flex, useColorModeValue } from "@chakra-ui/react";
import { useInterview } from "../InterviewDetails";
import CurrentInterview from "./CurrentInterview";
import InterviewControls from "./InterviewControls";
import { getStudent } from "../../lib/api";
import { useState, useEffect } from "react";

const InterviewController = ({ panelID }) => {
	const cardBackground = useColorModeValue("gray.100", "gray.900");
	const { inqueueList } = useInterview();
	const [currentStudent, setCurrentStudent] = useState();
	const [nextStudent, setNextStudent] = useState();

	useEffect(() => {
		if (inqueueList.length >= 2) {
			getStudent(inqueueList[0].studentID).then((response) => {
				setCurrentStudent({
					...response.data,
					meetLink: inqueueList[0].meetLink,
				});
			});
			getStudent(inqueueList[1].studentID).then((response) => {
				setNextStudent({
					...response.data,
					currentInterviewID: inqueueList[0].interviewID,
				});
			});
		}
	}, [inqueueList]);

	return (
		<Flex
			width="100%"
			justifyContent="center"
			flexDirection="column"
			background={cardBackground}
			overflow="auto"
			rounded={7}
			p={3}
		>
			<CurrentInterview data={currentStudent} />
			<InterviewControls data={nextStudent} panelID={panelID} />
		</Flex>
	);
};

export default InterviewController;
