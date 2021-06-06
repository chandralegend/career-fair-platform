import {
	Flex,
	Box,
	Avatar,
	Heading,
	Text,
	useColorModeValue,
	ButtonGroup,
	Button,
} from "@chakra-ui/react";

const UserDetails = () => {
	const cardBackground = useColorModeValue("gray.100", "gray.900");
	const user = {
		name: "Chandra Irugalbandara",
		avatar_img: "https://bit.ly/34L4l1H",
		uni_id: "170238C",
		email: "chandra.legendary@gmail.com",
		mobile_no: "0719102569",
		department: "ELectrical Engineering",
	};
	return (
		<Flex width='23%' justifyContent='center'>
			<Flex
				p={6}
				height='-webkit-fit-content'
				width='100%'
				rounded={6}
				background={cardBackground}
				flexDirection='column'
				alignItems='center'
				shadow='md'>
				<Avatar size='2xl' name={user.name} src={user.avatar_img} />
				<Heading size='md' m={4}>
					Chandra Irugalbandara
				</Heading>
				<Flex flexDirection='column' alignItems='center'>
					<Text fontSize='small'>{user.uni_id}</Text>
					<Text fontSize='small'>{user.email}</Text>
					<Text fontSize='small'>{user.mobile_no} (Mobile)</Text>
					<Text fontSize='small'>{user.department}</Text>
				</Flex>
				<ButtonGroup mt={4}>
					<Button>Upload CV</Button>
					<Button disabled>View CV</Button>
				</ButtonGroup>
			</Flex>
		</Flex>
	);
};

export default UserDetails;
