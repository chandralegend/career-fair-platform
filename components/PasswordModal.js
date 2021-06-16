import React from "react";
import { useForm } from "react-hook-form";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	Button,
	FormControl,
	FormErrorMessage,
	Input,
	Center,
	Flex,
	useColorModeValue,
} from "@chakra-ui/react";

import { useAuth } from "../lib/auth";

const ChangePasswordModal = ({ isOpen, onClose }) => {
	const modalBackground = useColorModeValue("gray.100", "gray.900");
	const { updatePassword, signout } = useAuth();

	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
		setError,
	} = useForm();

	function onSubmit(values) {
		if (values.newPassword != values.confirmPassword) {
			setError("confirmPassword", {
				message: "Password Does Not Match",
			});
		} else {
			return updatePassword(values.newPassword)
				.then(() => signout())
				.catch((err) => {
					setError("changePassword", { message: err.message });
				});
		}
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent
				maxWidth='-webkit-max-content'
				backgroundColor={modalBackground}>
				<ModalHeader flex alignSelf='center'>
					Change Password
				</ModalHeader>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Center>
						<Flex
							direction='column'
							p={6}
							alignItems='center'
							maxWidth='-webkit-max-content'>
							<FormControl isInvalid={errors.newPassword} mb={3}>
								<Input
									id='newPassword'
									placeholder='New Password'
									variant='filled'
									type='Password'
									{...register("newPassword", {
										required: "*Required",
										minLength: {
											value: 6,
											message: "Password Should Have At Least 6 Characters",
										},
									})}
								/>
								<FormErrorMessage
									maxWidth='-webkit-fit-content'
									flex
									justifyContent='center'>
									{errors.newPassword && errors.newPassword.message}
								</FormErrorMessage>
							</FormControl>

							<FormControl isInvalid={errors.confirmPassword} mb={6}>
								<Input
									id='confirmPassword'
									placeholder='Confirm Password'
									variant='filled'
									type='password'
									{...register("confirmPassword", {
										required: "*Required",
									})}
								/>
								<FormErrorMessage
									maxWidth='-webkit-fit-content'
									flex
									justifyContent='center'>
									{errors.confirmPassword && errors.confirmPassword.message}
								</FormErrorMessage>
							</FormControl>
							<FormControl isInvalid={errors.changePassword}>
								<Button
									colorScheme='teal'
									type='submit'
									width='100%'
									mb={3}
									disabled={isSubmitting}>
									Submit
								</Button>
								<FormErrorMessage
									maxWidth='-webkit-fit-content'
									flex
									justifyContent='center'>
									{errors.changePassword && errors.changePassword.message}
								</FormErrorMessage>
							</FormControl>
						</Flex>
					</Center>
				</form>
			</ModalContent>
		</Modal>
	);
};

export default ChangePasswordModal;
