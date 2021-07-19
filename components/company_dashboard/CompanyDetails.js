import { Flex, Avatar, useColorModeValue, Heading } from "@chakra-ui/react";
import { useAuth } from "../../lib/auth";

//TODO: Add details about the Representative Assigned to the Panel (Name, Contacts)

const CompanyDetails = () => {
	const cardBackground = useColorModeValue("gray.100", "gray.900");
	const { user } = useAuth();
	return (
		<Flex mt={3} alignItems='center' background={cardBackground} rounded='2xl' width='100%' p={3} shadow='md'>
			<Avatar size='md' name={user.name} src={user.photoUrl} shadow='base' />
			<Heading size='md' ml={4}>
				Welcome {user.name}
			</Heading>
		</Flex>
	);
};

export default CompanyDetails;
