import { useRouter } from "next/router";
import { Flex, Box, IconButton, useColorMode, Heading, Button, SlideFade } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Lottie from "react-lottie";
import animationData from "../lib/lottie_animations/looking.json";

import { StudentIcon, CompanyIcon } from "../components/icons";

const index = () => {
	const router = useRouter();
	const { colorMode, toggleColorMode } = useColorMode();

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	return (
		<Flex height='100vh' alignItems='center' justifyContent='center' direction='column' backgroundSize='cover'>
			<Box position='absolute' right={5} top={5}>
				<IconButton
					rounded='full'
					onClick={toggleColorMode}
					icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
				/>
			</Box>
			<SlideFade in offsetY='30px'>
				<Flex alignItems='center' justifyContent='center' direction='column'>
					<Flex>
						<Lottie options={defaultOptions} height={300} width={300} />
					</Flex>
					<Heading size='md' mb={5}>
						Login As
					</Heading>
					<Flex alignContent='center'>
						<Button
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
		</Flex>
	);
};

export default index;
