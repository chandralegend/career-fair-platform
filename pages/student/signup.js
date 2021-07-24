import React, { useState } from "react";
import {
	FormControl,
	Text,
	Flex,
	FormErrorMessage,
	Input,
	Select,
	Center,
	Box,
	Avatar,
	AvatarBadge,
	useColorModeValue,
	Heading,
	Icon,
	Spinner,
	useToast,
	useColorMode,
	Button,
	IconButton,
	Image,
	SlideFade,
} from "@chakra-ui/react";
import { AddIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import CompanyChooser from "../../components/CompanyChooser";
import { storage } from "../../lib/firebase";
import { useAuth } from "../../lib/auth";
import { updateStudentDetails } from "../../lib/api";
import Footer from "../../components/Footer";

const studentRegister = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const cardBackground = useColorModeValue("gray.100", "gray.900");
	const history = useRouter();

	const toast = useToast();
	const { signup } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm();

	const [imageData, setimageData] = useState();
	const [loadingImage, setloadingimage] = useState(false);
	const [imageURL, setimageURL] = useState("");
	const [loadingFormsubmit, setloadingFormsubmit] = useState(false);
	const [isSubmitForm, setisSubmitForm] = useState(false);
	const [uidState, setuidState] = useState("");

	const submitForm = async (data) => {
		if (data.password != data.confirmpassword) {
			setError("password", { message: "Password Does not Match" });
		} else if (imageURL == "") {
			setError("image", { message: "Upload Error" });
		} else {
			setloadingFormsubmit(true);
			const info = {
				universityid: data.username,
				email: data.email,
				name: data.fullname,
				department: data.department,
				phone: data.phone,
				photoUrl: imageURL,
			};
			if (uidState) {
				const body = {
					email: info.email,
					name: info.name,
					department: info.department,
					phone: info.phone,
					photoUrl: info.photoUrl,
				};
				const response = await updateStudentDetails(uidState, body);

				if (response && response.status == 200) {
					toast({
						title: "Successfully Updated Account .",
						description: "Your Account has been updated",
						status: "success",
						duration: 5000,
						isClosable: true,
					});
				} else {
					toast({
						title: "Faild to  Update Account .",
						description: "Faild to Update",
						status: "error",
						duration: 5000,
						isClosable: true,
					});
				}
			} else {
				try {
					const response = await signup(data.username + "@uom.lk", data.password, info);

					if (response.response.status == 200) {
						setuidState(response.uid);
						setisSubmitForm(true);
						toast({
							title: "Account created.",
							description: `We've created your account for ${data.username}.`,
							status: "success",

							duration: 5000,
							isClosable: true,
						});
					} else {
						toast({
							title: "Faild to  Create Account.",
							description: response.error && response.error.message,
							status: "error",

							duration: 5000,
							isClosable: true,
						});
					}
				} catch (error) {
					toast({
						title: "Faild to  Create Account .",
						description: error && error.message,
						status: "error",

						duration: 5000,
						isClosable: true,
					});
				}
			}
			setloadingFormsubmit(false);
		}
	};

	const handleImageUpload = async (event) => {
		const file = event.target.files[0];

		if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
			setError("image", { message: "" });
			setloadingimage(true);

			try {
				const reader = new FileReader();
				reader.readAsDataURL(file);

				reader.onloadend = () => {
					setimageData(reader.result);
				};
				const fileName =
					new Date().getTime().toString() + (Math.ceil(Math.random() * 1000000) + 100000).toString();

				const locationRef = storage.ref("Student_Photos").child(fileName);
				await locationRef.put(file, { contentType: file.type });
				setimageURL(await locationRef.getDownloadURL());
				setloadingimage(false);
			} catch (error) {
				toast({
					id: "imageError",
					status: "error",
					title: "Faild!",
					duration: 3000,
					description: error,
				});
				setloadingimage(false);
			}
		} else {
			setError("image", { message: "Invalid Image File" });
		}
	};

	return (
		<Flex
			flexDirection="column"
			p={5}
			backgroundSize="cover"
			height="100vh"
			backgroundImage="https://www.pexels.com/photo/746386/download/?search_query=&tracking_id=ei3wwg0t4lc"
			backgroundSize="cover"
		>
			<Flex mb={6} alignItems="center" justifyContent="space-between">
				<Image src="https://i.ibb.co/pwJvMbG/EE-spire-logo.png" height={10} />
				<IconButton
					onClick={toggleColorMode}
					backgroundColor={cardBackground}
					rounded="full"
					icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
				/>
			</Flex>
			<SlideFade in offsetY="100px">
				<Flex>
					<Flex width="30%" p={6} shadow="md" flexDirection="column" background={cardBackground}>
						<Center>
							<Heading size="md" mb={5}>
								Student Details
							</Heading>
						</Center>
						<form onSubmit={handleSubmit(submitForm)}>
							<Flex flexDirection="column" alignItems="center">
								<Box mb={6}>
									<FormControl isInvalid={errors.image}>
										<Center>
											<label htmlFor="avatarUpload">
												<Avatar size="2xl" src={imageData}>
													<AvatarBadge boxSize="1.25em" bg="teal.300">
														{loadingImage ? (
															<Spinner color="white" />
														) : (
															<Icon p={3} color="white" as={AddIcon}></Icon>
														)}
													</AvatarBadge>
												</Avatar>
											</label>
											<Input
												hidden={true}
												id="avatarUpload"
												type="file"
												{...register("image", {
													required: "Please Upload A Profile Picture",
												})}
												onChange={handleImageUpload}
											></Input>
										</Center>
										<FormErrorMessage pt={3} flex justifyContent="center">
											{errors.image && errors.image.message}
										</FormErrorMessage>
									</FormControl>
								</Box>
								<FormControl mb={2} isInvalid={errors.username}>
									<Flex>
										<Input
											id="username"
											rounded="full"
											placeholder="University ID"
											variant="outline"
											disabled={uidState}
											{...register("username", {
												required: "University ID is Required",
												minLength: { value: 7, message: "Invalid University ID" },
												maxLength: { value: 7, message: "Invalid University ID" },
											})}
										/>
									</Flex>
									<FormErrorMessage flex justifyContent="center">
										{errors.username && errors.username.message}
									</FormErrorMessage>
								</FormControl>
								<FormControl mb={2} isInvalid={errors.fullname}>
									<Flex>
										<Input
											rounded="full"
											id="fullname"
											placeholder="Full Name"
											variant="outline"
											{...register("fullname", {
												required: "Full Name is Required",
											})}
										/>
									</Flex>
									<FormErrorMessage flex justifyContent="center">
										{errors.fullname && errors.fullname.message}
									</FormErrorMessage>
								</FormControl>
								<FormControl mb={2} isInvalid={errors.email}>
									<Flex>
										<Input
											rounded="full"
											id="email"
											placeholder="E-mail Address"
											variant="outline"
											type="email"
											{...register("email", {
												required: "E-mail is Required",
											})}
										></Input>
									</Flex>
									<FormErrorMessage flex justifyContent="center">
										{errors.email && errors.email.message}
									</FormErrorMessage>
								</FormControl>
								<FormControl mb={2} isInvalid={errors.phone}>
									<Flex>
										<Input
											rounded="full"
											id="phone"
											placeholder="Phone Number"
											variant="outline"
											{...register("phone", {
												required: "University ID is Required",
												minLength: { value: 10, message: "Invalid Phone Number" },
												maxLength: { value: 13, message: "Invalid Phone Number" },
											})}
										/>
									</Flex>
									<FormErrorMessage flex justifyContent="center">
										{errors.phone && errors.phone.message}
									</FormErrorMessage>
								</FormControl>
								<FormControl mb={2} isInvalid={errors.department}>
									<Flex>
										<Select
											rounded="full"
											placeholder="Select Department"
											size="md"
											variant="outline"
											{...register("department", {
												required: "Select the Department",
											})}
										>
											<option value="Electrical Engineering">Electrical Engineering</option>
											<option value="Computer Science and Engineering">
												Computer Science and Engineering
											</option>
											<option value="Electronics and Telecommunications Engineering">
												Electronics and Telecommunications Engineering
											</option>
											<option value="Mechanical Engineering">Mechanical Engineering</option>
											<option value="Material Engineering">Material Engineering</option>
											<option value="Chemical Engineering">Chemical Engineering</option>
										</Select>
									</Flex>
									<FormErrorMessage flex justifyContent="center">
										{errors.department && errors.department.message}
									</FormErrorMessage>
								</FormControl>
								<FormControl mb={2} isInvalid={errors.password}>
									<Flex>
										<Input
											rounded="full"
											id="password"
											placeholder="Password"
											variant="outline"
											type="password"
											disabled={uidState}
											{...register("password", {
												required: "Password is Required",
												minLength: {
													value: 6,
													message: "Your password should have at least 6 charactors",
												},
											})}
										/>
									</Flex>
									<FormErrorMessage flex justifyContent="center">
										{errors.password && errors.password.message}
									</FormErrorMessage>
								</FormControl>
								<FormControl mb={2} isInvalid={errors.confirmpassword}>
									<Flex>
										<Input
											rounded="full"
											id="confirmpassword"
											placeholder="Confirm Password"
											variant="outline"
											type="password"
											disabled={uidState}
											{...register("confirmpassword", {
												required: "Password is Required",
												minLength: {
													value: 6,
													message: "Your password should have at least 6 charactors",
												},
											})}
										/>
									</Flex>
									<FormErrorMessage flex justifyContent="center">
										{errors.confirmpassword && errors.confirmpassword.message}
									</FormErrorMessage>
								</FormControl>
								<Button
									rounded="full"
									mt={2}
									isLoading={loadingFormsubmit}
									type="submit"
									variant="filled"
									bg="teal.400"
									textColor="white"
									value="Register"
								>
									{uidState ? "Update" : "Register"}
								</Button>
							</Flex>
						</form>
					</Flex>
					<Flex
						ml={3}
						background={cardBackground}
						shadow="md"
						flexDirection="column"
						width="100%"
						height="-webkit-fit-content"
						maxHeight="80vh"
						overflow="auto"
						p={6}
					>
						<Center mb={4}>
							<Heading size="md">Select Companies</Heading>
						</Center>
						{isSubmitForm ? (
							<CompanyChooser userID={uidState} />
						) : (
							<Center>
								<Text>Submit Your Details to Select Company Priority List</Text>
							</Center>
						)}
					</Flex>
				</Flex>
				<Flex mt={10} justifyContent="flex-end">
					<Button
						disabled={!uidState}
						colorScheme="teal"
						rounded="full"
						hidden={!uidState}
						onClick={() => {
							history.push("/student/login");
						}}
					>
						Finish SignUp
					</Button>
				</Flex>
			</SlideFade>

			<Flex position="absolute" bottom={3} right={3}>
				<Footer />
			</Flex>
		</Flex>
	);
};

export default studentRegister;
