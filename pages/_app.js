import "../styles/globals.css";
import "@fontsource/montserrat";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { AuthProvider } from "../lib/auth";

const theme = extendTheme({
	fonts: {
		heading: "Montserrat",
		body: "Montserrat",
	},
});

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider theme={theme}>
			<AuthProvider>
				<Component {...pageProps} />
			</AuthProvider>
		</ChakraProvider>
	);
}

export default MyApp;
