import { Flex, useColorMode, Box, IconButton, Button, useColorModeValue, Image } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useAuth } from "../lib/auth";

const MenuBar = () => {
	const buttonColor = useColorModeValue("gray.100", "gray.900");
	const { colorMode, toggleColorMode } = useColorMode();
	const { signout } = useAuth();
	return (
		<Flex width='100%' alignItems='center' justifyContent='space-between'>
			<Image src='https://i.ibb.co/pwJvMbG/EE-spire-logo.png' height={10} />
			<Flex>
				<Box>
					<Button onClick={signout} rounded='full' backgroundColor={buttonColor}>
						Log Out
					</Button>
				</Box>
				<Box ml={2}>
					<IconButton
						rounded='full'
						onClick={toggleColorMode}
						backgroundColor={buttonColor}
						icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
					/>
				</Box>
			</Flex>
		</Flex>
	);
};

export default MenuBar;
