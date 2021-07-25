import { useRouter } from "next/router";
import {
	Flex,
	Box,
	IconButton,
	useColorMode,
	Heading,
	Button,
	SlideFade,
	useColorModeValue,
	Image,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import { StudentIcon, CompanyIcon } from "../components/icons";
import Head from "next/head";
import Footer from "../components/Footer";

const index = () => {
	const buttonColor = useColorModeValue("gray.100", "gray.900");
	const router = useRouter();
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Flex
			height='100vh'
			alignItems='center'
			justifyContent='center'
			direction='column'
			backgroundImage='https://www.pexels.com/photo/746386/download/?search_query=&tracking_id=ei3wwg0t4lc'
			backgroundSize='cover'
			p={5}>
			<Head>
				<title>EESpire 2021</title>
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>
			<Box position='absolute' right={5} top={5}>
				<IconButton
					backgroundColor={buttonColor}
					rounded='full'
					onClick={toggleColorMode}
					icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
				/>
			</Box>
			<SlideFade in offsetY='30px'>
				<Flex alignItems='center' justifyContent='center' direction='column'>
					<Image src='https://i.ibb.co/pwJvMbG/EE-spire-logo.png' height={150} mb={100} />
					<Heading size='md' mb={5} color='white'>
						Login As
					</Heading>
					<Flex alignContent='center'>
						<Button
							backgroundColor={buttonColor}
							boxShadow='2xl'
							rounded='full'
							boxSize={150}
							mr={5}
							onClick={() => router.push("/student/login")}
							flex
							flexDirection='column'>
							<StudentIcon boxSize='8' mb={2} />
							Student
						</Button>
						<Button
							backgroundColor={buttonColor}
							boxShadow='2xl'
							boxSize={150}
							rounded='full'
							onClick={() => router.push("/company/login")}
							flex
							flexDirection='column'
							alignContent='center'>
							<CompanyIcon boxSize='8' mb={2} />
							Recruiter
						</Button>
					</Flex>
				</Flex>
			</SlideFade>
			{/* <Flex position='absolute' bottom={5} left={5}>
				<Footer />
			</Flex> */}
		</Flex>
	);
};

export default index;
