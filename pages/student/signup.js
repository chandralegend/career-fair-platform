import React, { useState } from "react";
import {
 FormControl,
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
 Text,
 Button,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";

import CompanyChooserGrid from "../../components/CompanyChooserGrid";
import firebase from "../../lib/firebase";
import { useAuth } from "../../lib/auth";
import { updateStudentDetails } from "../../lib/api";

const studentRegister = () => {
 const cardBackground = useColorModeValue("gray.100", "gray.900");

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
     uuid: uidState,
     universityid: info.universityid,
     email: info.email,
     name: info.name,
     department: info.department,
     phone: info.phone,
     photoUrl: info.photoUrl,
    };
    const response = await updateStudentDetails(body);

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
     const response = await signup(
      data.username + "@uom.lk",
      data.password,
      info
     );

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
     new Date().getTime().toString() +
     (Math.ceil(Math.random() * 1000000) + 100000).toString();

    const locationRef = firebase
     .storage()
     .ref("Student_Photos")
     .child(fileName);
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
  <Flex>
   <Flex
    width="-moz-fit-content"
    m={5}
    padding="10"
    rounded={10}
    shadow="md"
    flexDirection="column"
    background={cardBackground}
    boxSizing="content-box"
    overflowX="auto"
    minWidth="400px"
   >
    <Center>
     <Heading mb={5}>Student Details</Heading>
    </Center>
    <form onSubmit={handleSubmit(submitForm)}>
     <Box m={3}>
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
         {...register("image", { required: "Please Upload A Profile Picture" })}
         onChange={handleImageUpload}
        ></Input>
       </Center>
       <FormErrorMessage pt={3} flex justifyContent="center">
        {errors.image && errors.image.message}
       </FormErrorMessage>
      </FormControl>
     </Box>

     <FormControl m={3} isInvalid={errors.username}>
      <Flex>
       <Flex alignItems="center" width="240px">
        <Text size="lg" mr={5} fontWeight="bold">
         University ID :
        </Text>
       </Flex>

       <Input
        id="username"
        placeholder="University ID"
        variant="outline"
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
     <FormControl m={3} isInvalid={errors.fullname}>
      <Flex>
       <Flex alignItems="center" width="240px">
        <Text size="lg" mr={5} fontWeight="bold">
         Full Name :
        </Text>
       </Flex>

       <Input
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
     <FormControl m={3} isInvalid={errors.email}>
      <Flex>
       <Flex alignItems="center" width="240px">
        <Text size="lg" mr={5} fontWeight="bold">
         Email :
        </Text>
       </Flex>
       <Input
        id="email"
        placeholder="E-mail Address"
        variant="outline"
        type="email"
        {...register("email", { required: "E-mail is Required" })}
       ></Input>
      </Flex>
      <FormErrorMessage flex justifyContent="center">
       {errors.email && errors.email.message}
      </FormErrorMessage>
     </FormControl>
     <FormControl m={3} isInvalid={errors.phone}>
      <Flex>
       <Flex alignItems="center" width="240px">
        <Text size="lg" mr={5} fontWeight="bold">
         Phone Number :
        </Text>
       </Flex>

       <Input
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
     <FormControl m={3} isInvalid={errors.department}>
      <Flex>
       <Flex alignItems="center" width="240px">
        <Text size="lg" mr={5} fontWeight="bold">
         Department :
        </Text>
       </Flex>
       <Select
        placeholder="Select Department"
        size="md"
        variant="outline"
        {...register("department", {
         required: "Select the Department",
        })}
       >
        <option value="electrical">Electrical</option>
        <option value="computerscience">Computer Science</option>
        <option value="electronic">Electronic</option>
       </Select>
      </Flex>
      <FormErrorMessage flex justifyContent="center">
       {errors.department && errors.department.message}
      </FormErrorMessage>
     </FormControl>
     <FormControl m={3} isInvalid={errors.password}>
      <Flex>
       <Flex alignItems="center" width="240px">
        <Text size="lg" mr={5} fontWeight="bold">
         Password :
        </Text>
       </Flex>

       <Input
        id="password"
        placeholder="Password"
        variant="outline"
        type="password"
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
     <FormControl m={3} isInvalid={errors.confirmpassword}>
      <Flex>
       <Flex alignItems="center" width="240px">
        <Text size="lg" mr={5} fontWeight="bold">
         Confirm Password :
        </Text>
       </Flex>

       <Input
        id="confirmpassword"
        placeholder="Confirm Password"
        variant="outline"
        type="password"
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
     <Center>
      <Button
       m={3}
       width1="100%"
       isLoading={loadingFormsubmit}
       type="submit"
       variant="filled"
       bg="teal.400"
       textColor="white"
       value="Register"
      >
       {uidState ? "Update" : "Register"}
      </Button>
     </Center>
    </form>
   </Flex>
   <Flex
    width="55%"
    m={5}
    background={cardBackground}
    shadow="md"
    rounded={10}
    flexDirection="column"
    minWidth="450px"
    p={5}
   >
    <Center mt={5}>
     <Heading>Select Companies</Heading>
    </Center>
    {isSubmitForm ? (
     <CompanyChooserGrid userID={uidState}></CompanyChooserGrid>
    ) : (
     <></>
    )}
   </Flex>
  </Flex>
 );
};

export default studentRegister;
