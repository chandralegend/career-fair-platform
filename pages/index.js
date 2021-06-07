import Link from "next/link";
import { useRouter } from "next/router";
import {
	Flex,
	Box,
	IconButton,
	useColorMode,
	Heading,
	Button,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const index = () => {
	const router = useRouter();
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<Flex
			height='100vh'
			alignItems='center'
			justifyContent='center'
			direction='column'>
			<Box position='absolute' right={5} top={5}>
				<IconButton
					onClick={toggleColorMode}
					icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
				/>
			</Box>
			<Flex alignItems='center' justifyContent='center' direction='column'>
				<Heading size='md' mb={5}>
					Login As
				</Heading>
				<Flex alignContent='center'>
					<Button
						height={100}
						width={100}
						mr={5}
						onClick={() => router.push("/student/dashboard")}>
						Student
					</Button>
					<Button height={100} width={100}>
						<Link href='/student/dashboard'>Recruiter</Link>
					</Button>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default index;
