import {
	Flex
} from "@chakra-ui/react";

import ControlCandidate from "./ControlCandidate";
import OtherControls from "./OtherControls";

const Controls = ({cardBackground}) => {

	const data = [
		{	name: "John Doe",
			department: "Electrical Engineering",
			avatar_img: "https://bit.ly/prosper-baba",
			email: "john@gmail.com",
			cv: "CV"
		},
		{
			name: "Ryan Florence",
			department: "Electrical Engineering",
			avatar_img: "https://bit.ly/code-beast",
			email: "ryan@gmail.com",
			cv: "CV"
		}
	];

	return (
		<Flex 
		width='100%' 
		justifyContent='center' 
		flexDirection="column" 
		background={cardBackground}
		overflow='auto'
		rounded={7}
		p={3}
		>
			<ControlCandidate data={data[0]} cardBackground={cardBackground} />
			<OtherControls data={data[1]} cardBackground={cardBackground} />
		</Flex>
	);
};

export default Controls;
