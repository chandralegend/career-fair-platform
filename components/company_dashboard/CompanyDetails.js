import { Flex, Avatar, useColorModeValue, Heading } from "@chakra-ui/react";
import { useAuth } from "../../lib/auth";

//TODO: Add details about the Representative Assigned to the Panel (Name, Contacts and Also Change Password Button) @Janith

const CompanyDetails = () => {
	const cardBackground = useColorModeValue("gray.100", "gray.900");
	const { user } = useAuth();
	return (
		<Flex mt={3} alignItems='center' background={cardBackground} width='100%' p={3} shadow='md' flexDirection='column'>
			<Flex alignItems='center'>
				<Avatar size='lg' name={user.name} src={user.photoUrl} shadow='base' />
				<Heading size='md' ml={4}>
					Hello, {user.name}
				</Heading>
			</Flex>
		</Flex>
	);
};

export default CompanyDetails;
