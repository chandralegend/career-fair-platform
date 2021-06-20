import React from "react";
import { useForm } from "react-hook-form";

import {
  Center,
  Input,
  useColorModeValue,
  Flex,
  SlideFade,
  Heading,
  Select,
  Button,
  Tag,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Stack,
  Avatar,
} from "@chakra-ui/react";

const CreateUser = () => {
  const formBackground = useColorModeValue("gray.100", "gray.900");
  const image = "https://bit.ly/ryan-florence";
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = (data) => {
    if (data.password !== data.confirmpassword) {
      setError("confirmpassword", { message: "passwords doesn't match" });
    } else {
      setValue("username", "");
      setValue("fullname", "");

      setValue("email", "");
      setValue("department", "");
      setValue("password", "");
      setValue("confirmpassword", "");
    }
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" mt={3}>
      <SlideFade in offsetY="30px">
        <form onSubmit={handleSubmit(onSubmit)} maxLength="100vh">
          <Center>
            <Flex
              direction="column"
              p={20}
              alignItems="center"
              rounded={7}
              background={formBackground}
            >
              <Center>
                <Heading mb={10} size="md">
                  EE Career Fair 2021
                </Heading>
              </Center>

              <Flex width="100%" size="2x1" flex justify="center">
                <Avatar
                  id="image"
                  name="Ryan Florence"
                  src={image}
                  size="xl"
                  onClick={() => console.log("clicked")}
                ></Avatar>
              </Flex>

              <br />
              <FormControl isInvalid={errors.username}>
                <Flex>
                  <Tag size="lg" w="200px" mr={5}>
                    University ID :
                  </Tag>

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

              <br />
              <FormControl isInvalid={errors.fullname}>
                <Flex>
                  <Tag size="lg" w="200px" mr={5}>
                    Full Name :
                  </Tag>
                  <Input
                    colorScheme="blackAlpha"
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

              <br />
              <FormControl isInvalid={errors.email}>
                <Flex>
                  <Tag size="lg" w="200px" mr={5}>
                    E-mail :
                  </Tag>
                  <Input
                    id="email"
                    placeholder="E-mail Address"
                    variant="outline"
                    type="email"
                    {...register("email", { required: "E-mail is Required" })}
                  />
                </Flex>
                <FormErrorMessage flex justifyContent="center">
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>

              <br />
              <FormControl isInvalid={errors.department}>
                <Flex>
                  <Tag size="lg" w="200px" pr={10} pl={3}>
                    Department :
                  </Tag>
                  <Select
                    placeholder="Select Department"
                    size="md"
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
              <br />
              <FormControl isInvalid={errors.pref1}>
                <Flex width="100%">
                  <Tag size="lg"> Company Preferences :</Tag>
                  <Stack width="100%" ml={7}>
                    <Flex direction="row">
                      <FormLabel alignSelf="center">1.</FormLabel>
                      <Select
                        id="pref1"
                        variant="flushed"
                        placeholder="Secelct a Company"
                        {...register("pref1", {
                          required: "This field is Required",
                        })}
                      >
                        <option value="company1">Company1</option>
                        <option value="company2">Company2</option>
                        <option value="company3">Company3</option>
                        <option value="company4">Company4</option>
                      </Select>
                    </Flex>
                    <Flex direction="row">
                      <FormLabel alignSelf="center">2.</FormLabel>
                      <Select
                        id="pref2"
                        variant="flushed"
                        placeholder="Secelct a Company"
                        {...register("pref2", {
                          required: "This field is Required",
                        })}
                      >
                        <option value="company1">Company1</option>
                        <option value="company2">Company2</option>
                        <option value="company3">Company3</option>
                        <option value="company4">Company4</option>
                      </Select>
                    </Flex>
                    <Flex direction="row">
                      <FormLabel alignSelf="center">3.</FormLabel>
                      <Select
                        id="pref3"
                        variant="flushed"
                        placeholder="Secelct a Company"
                        {...register("pref3", {
                          required: "This field is Required",
                        })}
                      >
                        <option value="company1">Company1</option>
                        <option value="company2">Company2</option>
                        <option value="company3">Company3</option>
                        <option value="company4">Company4</option>
                      </Select>
                    </Flex>
                    <Flex direction="row">
                      <FormLabel alignSelf="center">4.</FormLabel>
                      <Select
                        id="pref4"
                        variant="flushed"
                        placeholder="Secelct a Company"
                        {...register("pref4", {
                          required: "This field is Required",
                        })}
                      >
                        <option value="company1">Company1</option>
                        <option value="company2">Company2</option>
                        <option value="company3">Company3</option>
                        <option value="company4">Company4</option>
                      </Select>
                    </Flex>
                  </Stack>
                </Flex>
                <FormErrorMessage flex justifyContent="center">
                  {errors.pref1 && errors.pref1.message}
                </FormErrorMessage>
              </FormControl>

              <br />
              <FormControl isInvalid={errors.password}>
                <Flex>
                  <Tag size="lg" w="200px" mr={5}>
                    Password :
                  </Tag>

                  <Input
                    id="password"
                    placeholder="Password"
                    variant="outline"
                    type="password"
                    {...register("password", {
                      required: "Password is Required",
                      minLength: {
                        value: 8,
                        message:
                          "Your password should have at least 8 charactors",
                      },
                    })}
                  />
                </Flex>
                <FormErrorMessage flex justifyContent="center">
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>

              <br />
              <FormControl isInvalid={errors.confirmpassword}>
                <Flex>
                  <Tag size="lg" w="200px" mr={5}>
                    Confirm Password :
                  </Tag>

                  <Input
                    id="confirmpassword"
                    placeholder="Confirm Password"
                    variant="outline"
                    type="password"
                    {...register("confirmpassword", {
                      required: "Password is Required",
                      minLength: {
                        value: 6,
                        message:
                          "Your password should have at least 8 charactors",
                      },
                    })}
                  />
                </Flex>
                <FormErrorMessage flex justifyContent="center">
                  {errors.confirmpassword && errors.confirmpassword.message}
                </FormErrorMessage>
              </FormControl>
              <br />

              <Button type="submit" colorScheme="teal">
                Register
              </Button>
            </Flex>
          </Center>
        </form>
      </SlideFade>
    </Flex>
  );
};

export default CreateUser;
