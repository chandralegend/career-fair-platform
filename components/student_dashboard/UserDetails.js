import {
	Flex,
	Avatar,
	Heading,
	Text,
	useColorModeValue,
	ButtonGroup,
	Button,
	useDisclosure,
	Center,
} from "@chakra-ui/react";
import { useAuth } from "../../lib/auth";
import ChangePasswordModal from "./PasswordModal";

const UserDetails = () => {
	const cardBackground = useColorModeValue("gray.100", "gray.900");
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { user } = useAuth();
	return (
		<Flex width='23%' justifyContent='center'>
			<ChangePasswordModal isOpen={isOpen} onClose={onClose} />
			<Flex
				p={6}
				height='-webkit-fit-content'
				width='100%'
				rounded={6}
				background={cardBackground}
				flexDirection='column'
				alignItems='center'
				shadow='md'>
				<Avatar size='2xl' name={user.name} src={user.photoUrl} />
				<Heading size='md' m={4}>
					{user.name}
				</Heading>
				<Flex flexDirection='column' alignItems='center'>
					<Text fontSize='small'>{user.username}</Text>
					<Text fontSize='small'>{user.email}</Text>
					<Text fontSize='small'>{user.phone} (Mobile)</Text>
					<Text fontSize='small'>{user.department}</Text>
				</Flex>
				<Center flexDirection='column'>
					<ButtonGroup mt={4} mb={2}>
						<Button>Upload CV</Button>
						<Button disabled={!user.cvUrl}>View CV</Button>
					</ButtonGroup>
					<Button onClick={onOpen} width='100%'>
						Change Password
					</Button>
				</Center>
			</Flex>
		</Flex>
	);
};

export default UserDetails;
