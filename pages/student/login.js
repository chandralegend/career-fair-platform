import { useForm } from "react-hook-form";
import {
	Box,
	Button,
	Center,
	Flex,
	Heading,
	Image,
	IconButton,
	Input,
	useColorMode,
	useColorModeValue,
	SlideFade,
	FormControl,
	FormErrorMessage,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useAuth } from "../../lib/auth";
import Head from "next/head";

import Footer from "../../components/Footer";

const login = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const formBackground = useColorModeValue("gray.100", "gray.900");
	const {
		handleSubmit,
		register,
		formState: { errors },
		setError,
	} = useForm();
	const { loading, signin, setLoading } = useAuth();

	function onSubmit(values) {
		signin(values.username + "@uom.lk", values.password, "/student/dashboard")
			.then()
			.catch((err) => {
				setError("submitError", {
					message: "Invalid Credentials",
				});
				setLoading(false);
			});
	}

	return (
		<Flex
			height='100vh'
			alignItems='center'
			justifyContent='center'
			direction='column'
			backgroundImage='https://www.pexels.com/photo/746386/download/?search_query=&tracking_id=ei3wwg0t4lc'
			backgroundSize='cover'>
			<Head>
				<title>Login - Student</title>
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>
			<SlideFade in offsetY='30px'>
				<Box position='absolute' right={5} top={5}>
					<IconButton
						rounded='full'
						onClick={toggleColorMode}
						icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
					/>
				</Box>
				<Center>
					<Image src='https://i.ibb.co/pwJvMbG/EE-spire-logo.png' height={150} />
				</Center>

				<form onSubmit={handleSubmit(onSubmit)}>
					<Center>
						<Flex
							direction='column'
							background={formBackground}
							p={16}
							alignItems='center'
							maxWidth='-webkit-max-content'>
							<FormControl isInvalid={errors.username} mb={3}>
								<Input
									id='username'
									rounded='full'
									placeholder='University ID'
									variant='outline'
									{...register("username", {
										required: "University ID is required",
										minLength: { value: 7, message: "Invalid University ID" },
										maxLength: { value: 7, message: "Invalid University ID" },
									})}
								/>
								<FormErrorMessage flex justifyContent='center'>
									{errors.username && errors.username.message}
								</FormErrorMessage>
							</FormControl>
							<FormControl isInvalid={errors.password} mb={6}>
								<Input
									id='password'
									rounded='full'
									placeholder='Password'
									variant='outline'
									type='password'
									{...register("password", {
										required: "Password is Required",
									})}
								/>
								<FormErrorMessage flex justifyContent='center'>
									{errors.password && errors.password.message}
								</FormErrorMessage>
							</FormControl>
							<FormControl isInvalid={errors.submitError}>
								<Button rounded='full' colorScheme='teal' type='submit' width='100%' mb={3} isLoading={loading}>
									Log in
								</Button>
								<FormErrorMessage flex justifyContent='center'>
									{errors.submitError && errors.submitError.message}
								</FormErrorMessage>
							</FormControl>
						</Flex>
					</Center>
				</form>
			</SlideFade>
			{/* <Flex position='absolute' bottom={5} right={5}>
				<Footer />
			</Flex> */}
		</Flex>
	);
};

export default login;
