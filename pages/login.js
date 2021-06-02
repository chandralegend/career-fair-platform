import {
	Box,
	Button,
	Center,
	Flex,
	Heading,
	IconButton,
	Input,
	useColorMode,
	useColorModeValue,
	Image,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const login = () => {
	// TODO: Login and Input handlers
	const { colorMode, toggleColorMode } = useColorMode();
	const formBackground = useColorModeValue("gray.100", "gray.900");
	return (
		<Flex
			height='100vh'
			alignItems='center'
			justifyContent='center'
			direction='column'>
			<Box position='absolute' right={5} top={5}>
				<IconButton
					onClick={toggleColorMode}
					icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
				/>
			</Box>
			<Center>
				<Heading mb={10} size='2xl'>
					EE Career Fair 2021
				</Heading>
			</Center>
			<Flex direction='column' background={formBackground} p={12} rounded={6}>
				<Heading mb={6}>Log In</Heading>
				<Input
					placeholder='University ID'
					variant='filled'
					mb={3}
					type='email'
				/>
				<Input placeholder='Password' variant='filled' mb={6} type='password' />
				<Button colorScheme='teal' type='submit'>
					Log in
				</Button>
			</Flex>
		</Flex>
	);
};

export default login;
