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
	Input,
	useToast,
} from "@chakra-ui/react";
import React, { useState, useRef } from "react";

import { useAuth } from "../../lib/auth";
import { updateStudentCV } from "../../lib/api";
import { storage } from "../../lib/firebase";
import ChangePasswordModal from "./PasswordModal";

const UserDetails = () => {
	const cardBackground = useColorModeValue("gray.100", "gray.900");
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { user, updateUser } = useAuth();
	const toast = useToast();
	const hiddenFileInput = useRef(null);

	const [uploadingCV, setUploadingCV] = useState(false);

	const handleCvUpload = async (event) => {
		const file = event.target.files[0];

		if (file && file.type === "application/pdf") {
			setUploadingCV(true);
			try {
				const fileName =
					new Date().getTime().toString() +
					(Math.ceil(Math.random() * 1000000) + 100000).toString();

				const locationRef = storage.ref("Student_CV").child(fileName);
				await locationRef.put(file, { contentType: file.type });
				locationRef.getDownloadURL().then((url) => {
					setUploadingCV(false);
					updateUser({ cvUrl: url });
					updateStudentCV(user.uuid, url)
						.then(() => {
							toast({
								title: "Uploaded Successfully",
								description: "Your CV uploaded successfully",
								status: "success",
								duration: 5000,
								isClosable: true,
							});
						})
						.catch((err) => {
							toast({
								title: "Upload Failed",
								description: "Failed to upload the CV",
								status: "error",
								duration: 5000,
								isClosable: true,
							});
							return err;
						});
				});
			} catch (error) {
				toast({
					title: "Upload Failed",
					description: "Failed to upload the CV[UNKNOWN ERROR]",
					status: "error",
					duration: 5000,
					isClosable: true,
				});
				setUploadingCV(false);
			}
		} else {
			toast({
				title: "Upload Failed",
				description: "Please Select A Valid PDF Document",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	const handleClick = () => {
		hiddenFileInput.current.click();
	};

	return (
		<Flex width='20%' justifyContent='center'>
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
				<Avatar size='2xl' name={user.name} shadow='2xl' src={user.photoUrl} />
				<Heading size='md' m={4} textAlign='center'>
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
						<Button
							boxShadow='2xl'
							variant='solid'
							isLoading={uploadingCV}
							onClick={handleClick}>
							Upload CV
						</Button>
						<Input
							hidden
							type='file'
							ref={hiddenFileInput}
							onChange={handleCvUpload}></Input>
						<Button
							boxShadow='2xl'
							disabled={!user.cvUrl}
							onClick={() => window.open(user.cvUrl, "_blank")}>
							View CV
						</Button>
					</ButtonGroup>
					<Button onClick={onOpen} width='100%' boxShadow='2xl'>
						Change Password
					</Button>
				</Center>
			</Flex>
		</Flex>
	);
};

export default React.memo(UserDetails);
