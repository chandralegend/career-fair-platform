import { useForm } from "react-hook-form";
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
	SlideFade,
	FormControl,
	FormErrorMessage,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useAuth } from "../../lib/auth";

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
				setError("password", { message: "Invalid Credentials" });
				setLoading(false);
			});
	}

	return (
		<Flex
			height='100vh'
			alignItems='center'
			justifyContent='center'
			direction='column'>
			<SlideFade in offsetY='30px'>
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

				<form onSubmit={handleSubmit(onSubmit)}>
					<Center>
						<Flex
							direction='column'
							background={formBackground}
							p={12}
							rounded={6}
							alignItems='center'
							maxWidth='-webkit-max-content'>
							<FormControl isInvalid={errors.username} mb={3}>
								<Input
									id='username'
									placeholder='University ID'
									variant='filled'
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
									placeholder='Password'
									variant='filled'
									type='password'
									{...register("password", {
										required: "Password is Required",
									})}
								/>
								<FormErrorMessage flex justifyContent='center'>
									{errors.password && errors.password.message}
								</FormErrorMessage>
							</FormControl>
							<Button
								colorScheme='teal'
								type='submit'
								width='100%'
								mb={3}
								isLoading={loading}>
								Log in
							</Button>
						</Flex>
					</Center>
				</form>
			</SlideFade>
		</Flex>
	);
};

export default login;
