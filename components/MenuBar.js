import {
	Flex,
	useColorMode,
	Box,
	IconButton,
	Heading,
	Button,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useAuth } from "../lib/auth";

const MenuBar = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const { signout } = useAuth();
	return (
		<Flex width='100%' alignItems='center' justifyContent='space-between'>
			<Heading size='md'>EE Career Fair</Heading>
			<Flex>
				<Box>
					<Button onClick={signout} rounded='full'>
						Log Out
					</Button>
				</Box>
				<Box ml={2}>
					<IconButton
						rounded='full'
						onClick={toggleColorMode}
						icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
					/>
				</Box>
			</Flex>
		</Flex>
	);
};

export default MenuBar;
