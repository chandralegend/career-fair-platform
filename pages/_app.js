import "../styles/globals.css";
import "@fontsource/montserrat";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { AuthProvider } from "../lib/auth";
import MessengerCustomerChat from "react-messenger-customer-chat";

const theme = extendTheme({
	fonts: {
		heading: "Montserrat",
		body: "Montserrat",
	},
});

function MyApp({ Component, pageProps }) {
	return (
		<>
			<ChakraProvider theme={theme}>
				<AuthProvider>
					<Component {...pageProps} />
				</AuthProvider>
			</ChakraProvider>
			<MessengerCustomerChat pageId='104865428562298' appId='176380987815244' />
		</>
	);
}

export default MyApp;
