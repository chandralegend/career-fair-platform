import { Flex, useColorModeValue } from "@chakra-ui/react";

import CurrentInterview from "./CurrentInterview";
import InterviewControls from "./InterviewControls";

const InterviewController = () => {
	const cardBackground = useColorModeValue("gray.100", "gray.900");

	const data = [
		{
			name: "John Doe",
			department: "Electrical Engineering",
			avatar_img: "https://bit.ly/prosper-baba",
			email: "john@gmail.com",
			cv: "CV",
		},
		{
			name: "Ryan Florence",
			department: "Electrical Engineering",
			avatar_img: "https://bit.ly/code-beast",
			email: "ryan@gmail.com",
			cv: "CV",
		},
	];

	return (
		<Flex
			width='100%'
			justifyContent='center'
			flexDirection='column'
			background={cardBackground}
			overflow='auto'
			rounded={7}
			p={3}>
			<CurrentInterview data={data[0]} />
			<InterviewControls data={data[1]} />
		</Flex>
	);
};

export default InterviewController;
