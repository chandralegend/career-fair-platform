import {
	Flex,
	Avatar,
	Text,
	Box,
	IconButton
} from "@chakra-ui/react";

import { ExternalLinkIcon } from "@chakra-ui/icons";

const CandidateDetails = ({data, cardBackground}) => {
    return (
        <Flex justifyContent='space-between' mt={3} p={2}>
				<Flex
				rounded={5}
				p={6}
				flexDirection='row'
				width='100%'
				alignItems='center'
				ml={3}
				mr={3}
				justifyContent='center'>
					<Avatar
						size='md'
						src={data.avatar_img}
						mr={3}
						backgroundColor='white'
					/>
					<Flex justifyContent='space-between'>
						<Flex alignItems='center'>
							<Flex flexDirection='column'>
								<Text fontSize='larger'>{data.name}</Text>
								<Text fontSize='smaller'>{data.department}</Text>
								<Text fontSize='xs'>{data.email}</Text>
							</Flex>
						</Flex>
					</Flex>
					<Box>
						<Flex background={cardBackground} alignItems='center' ml={5}>
						<IconButton 
							onClick={() => console.log("CV Button Clicked")}
							icon={<ExternalLinkIcon />}
						/>
						<p>CV</p>
						</Flex>
					</Box>
				</Flex>
			</Flex>
    )
}

export default CandidateDetails
