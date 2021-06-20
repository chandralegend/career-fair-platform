import {
	Text,
	useColorMode,
	Box,
	Stack
} from "@chakra-ui/react";

// import { Copyright } from './Copyright'
// import { Logo } from './Logo'
// import { SocialMediaLinks } from './SocialMediaLinks'

const CompanyFooter = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<Box as="footer" role="contentinfo" mx="auto" maxW="7xl" py="12" px={{ base: '4', md: '8' }}>
			<Stack>
			<Stack direction="row" spacing="4" align="center" justify="space-between">
				
			</Stack>
				<Text fontSize="sm">
				&copy; {new Date().getFullYear()} Envelope, Inc. All rights reserved.
				</Text>
			</Stack>
  		</Box>
	);
};

export default CompanyFooter;