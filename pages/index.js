import { Flex, Box, IconButton, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const index = () => {
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
			<Flex></Flex>
		</Flex>
	);
};

export default index;
