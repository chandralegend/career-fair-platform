import { useRouter } from "next/router";
import {
	Flex,
	Box,
	IconButton,
	useColorMode,
	Heading,
	Button,
	Text,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { StudentIcon, CompanyIcon } from "../components/icons";
import { db } from "../lib/firebase";
import { useEffect, useState } from "react";

const index = () => {
	const router = useRouter();
	const { colorMode, toggleColorMode } = useColorMode();

	const [data, setData] = useState([]);
	function snapShotTest() {
		try {
			db.collection("test").onSnapshot((snapshot) => {
				const new_data = [];
				snapshot.forEach((doc) => {
					new_data.push(doc.data());
				});
				console.log(
					"🚀 ~ file: index.js ~ line 25 ~ db.collection ~ new_data",
					new_data
				);
				setData(new_data);
			});
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		snapShotTest();
	}, []);

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
				<Text>{JSON.stringify(data)}</Text>
				<Heading size='md' mb={5}>
					Login As
				</Heading>
				<Flex alignContent='center'>
					<Button
						boxSize={150}
						mr={5}
						onClick={() => router.push("/student/login")}
						flex
						flexDirection='column'>
						<StudentIcon boxSize='8' mb={2} />
						Student
					</Button>
					<Button
						boxSize={150}
						onClick={() => router.push("/company/login")}
						flex
						flexDirection='column'
						alignContent='center'>
						<CompanyIcon boxSize='8' mb={2} />
						Recruiter
					</Button>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default index;
