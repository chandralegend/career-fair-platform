import {
	Flex,
	Button,
	Heading
} from "@chakra-ui/react";

import CandidateDetails from "./CandidateDetails";

const CurrentCandidate = ({data, cardBackground}) => {
    return (
        <Flex
			shadow='base'
			rounded={6}
			height='-webkit-fit-content'
			background={cardBackground}
			p={3}
			ml={3}
			mt={3}
			mb={3}
			flexDirection='column'
			width='95%'>
			
			<Heading size='md' mb={3}>
				Current Interview
			</Heading>
			
			<CandidateDetails data={data} cardBackground={cardBackground} />
			
			<Flex alignItems='center' width='100%' mt={6} mb={3} flexDirection='row' justifyContent='center'>
				<Button colorScheme='green' width='60%' size='lg' height='16' shadow='md' mr={3}>
					Join Meeting
				</Button>
				<Button colorScheme='orange' size='lg' width='40%' height='16' shadow='md' ml={3}>
					Feedback
				</Button>
			</Flex>	
			</Flex>
    )
}

export default CurrentCandidate
