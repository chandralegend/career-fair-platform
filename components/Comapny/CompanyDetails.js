import {
	Flex,
	Avatar,
	useColorModeValue,
	Heading
} from "@chakra-ui/react";

const CompanyDetails = () => {
	const cardBackground = useColorModeValue("gray.100", "gray.900");
	const user = {
		name: "WSO2",
		avatar_img: "https://th.bing.com/th/id/OIP.czoTouAYtIYcLzXq9JEkFAAAAA?pid=ImgDet&rs=1",
		email: "wso2@gmail.com",
	};
	return (
		<Flex
		mt={3}
		mb={3}
		flexDirection='row' 
		alignItems='center'
		background={cardBackground}
		rounded={7}
		>
			<Flex
				p={6}
				height='-webkit-fit-content'
				width='40%'
				rounded={6}
				flexDirection='column'
				alignItems='center'
				background={cardBackground}
				>
				<Avatar size='2xl' name={user.name} src={user.avatar_img} shadow='base' />
			</Flex>
			<Heading size='md' ml={3}>
				Welcome
			</Heading>
		</Flex>
	);
};

export default CompanyDetails;
