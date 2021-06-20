import {
	Flex,
	Heading,
	Button
} from "@chakra-ui/react";

import CandidateDetails from "./CandidateDetails";

const OtherControls = ({data, cardBackground}) => {
    return (
        <Flex
			shadow='base'
			rounded={6}
			height='-webkit-fit-content'
			background={cardBackground}
			p={3}
			ml={3}
			mt={3}
			flexDirection='column'
			width='95%'>
			
			<Heading size='md' mb={3}>
				Upcoming Interview
			</Heading>
			
			<CandidateDetails data={data} cardBackground={cardBackground} />

			<Flex alignItems='center' mt={3} flexDirection='column' justifyContent='center'>
				<Button colorScheme='linkedin' width='100%' size='lg' height='16' shadow='md'm={3}>
					Next Interview
				</Button>
				<Button colorScheme='orange' width='100%' size='lg' height='16' shadow='md' m={3}>
					Enable / Disable Walking
				</Button>
			</Flex>	
			</Flex>
    )
}

export default OtherControls
