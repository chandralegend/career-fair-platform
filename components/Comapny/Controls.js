import {
	Flex,
	useColorModeValue
} from "@chakra-ui/react";

import ControlCurrentCandidate from "./ControlCurrentCandidate";
import OtherControls from "./OtherControls";

const Controls = () => {
	
    const cardBackground = useColorModeValue("gray.100", "gray.900");
	const user = {
		name: "wso2",
		avatar_img: "https://th.bing.com/th/id/OIP.czoTouAYtIYcLzXq9JEkFAAAAA?pid=ImgDet&rs=1",
		email: "wso2@gmail.com",
	};

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
			<ControlCurrentCandidate data={data[0]} cardBackground={cardBackground} />
			<OtherControls data={data[1]} cardBackground={cardBackground} />
		</Flex>
	);
};

export default Controls;
