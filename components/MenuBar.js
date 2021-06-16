import {
	Flex,
	useColorMode,
	Box,
	IconButton,
	Image,
	Heading,
} from "@chakra-ui/react";
import { LockIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useAuth } from "../lib/auth";

const MenuBar = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const { signout } = useAuth();
	return (
		<Flex width='100%' alignItems='center' justifyContent='space-between'>
			<Heading size='md'>EE Career Fair</Heading>
			<Flex>
				<Box>
					<IconButton onClick={signout} icon={<LockIcon />} />
				</Box>
				<Box ml={2}>
					<IconButton
						onClick={toggleColorMode}
						icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
					/>
				</Box>
			</Flex>
		</Flex>
	);
};

export default MenuBar;
