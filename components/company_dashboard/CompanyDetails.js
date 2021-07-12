import { Flex, Avatar, useColorModeValue, Heading } from "@chakra-ui/react";

const CompanyDetails = () => {
	const cardBackground = useColorModeValue("gray.100", "gray.900");
	const user = {
		name: "WSO2",
		avatar_img:
			"https://th.bing.com/th/id/OIP.czoTouAYtIYcLzXq9JEkFAAAAA?pid=ImgDet&rs=1",
		email: "wso2@gmail.com",
	};
	return (
		<Flex
			mt={3}
			alignItems='center'
			background={cardBackground}
			rounded='2xl'
			width='100%'
			p={3}>
			<Avatar size='md' name={user.name} src={user.avatar_img} shadow='base' />
			<Heading size='md' ml={3}>
				Welcome
			</Heading>
		</Flex>
	);
};

export default CompanyDetails;
