import { useForm } from "react-hook-form";
import Router from "next/router";
import {
	Box,
	Button,
	Center,
	Flex,
	IconButton,
	Input,
	useColorMode,
	useColorModeValue,
	SlideFade,
	FormControl,
	FormErrorMessage,
	Image,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useAuth } from "../../lib/auth";
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
	const { loading, signin } = useAuth();

	function onSubmit(values) {
		signin(values.username + "@company.lk", values.password, "/company/dashboard")
			.then()
			.catch((err) => {
				setError("password", {
					message: "Invalid Credentials",
					shouldFocus: false,
				});
				console.log(err);
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
			<SlideFade in offsetY='30px'>
				<Box position='absolute' right={5} top={5}>
					<IconButton
						backgroundColor={formBackground}
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
							shadow='md'
							direction='column'
							background={formBackground}
							p={16}
							alignItems='center'
							maxWidth='-webkit-max-content'>
							<FormControl isInvalid={errors.username} mb={3}>
								<Input
									rounded='full'
									id='username'
									placeholder='Username'
									variant='outline'
									{...register("username", {
										required: "Username is required",
									})}
								/>
								<FormErrorMessage flex justifyContent='center'>
									{errors.username && errors.username.message}
								</FormErrorMessage>
							</FormControl>
							<FormControl isInvalid={errors.password} mb={6}>
								<Input
									rounded='full'
									id='password'
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
							<Button rounded='full' colorScheme='teal' type='submit' width='100%' mb={3} isLoading={loading}>
								Log in
							</Button>
						</Flex>
					</Center>
				</form>
			</SlideFade>
			<Flex position='absolute' bottom={5} right={5}>
				<Footer />
			</Flex>
		</Flex>
	);
};

export default login;
