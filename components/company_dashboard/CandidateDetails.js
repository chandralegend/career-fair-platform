import {
	Flex,
	Avatar,
	Text,
	Box,
	IconButton,
	useColorModeValue,
} from "@chakra-ui/react";

import { ExternalLinkIcon } from "@chakra-ui/icons";

const CandidateDetails = ({ data }) => {
	const cardBackground = useColorModeValue("gray.100", "gray.900");

	return (
		<Flex justifyContent="space-between" mt={3} p={2}>
			<Flex
				flexDirection="row"
				width="100%"
				alignItems="center"
				justifyContent="start"
			>
				<Avatar
					size="md"
					src={data && data.photoUrl}
					mr={3}
					backgroundColor="white"
				/>
				<Flex justifyContent="space-between">
					<Flex alignItems="center">
						<Flex flexDirection="column">
							<Text fontSize="larger">{data && data.name}</Text>
							<Text fontSize="smaller">
								{data && data.department}
							</Text>
							<Text fontSize="xs">{data && data.email}</Text>
						</Flex>
					</Flex>
				</Flex>
				<Box>
					<Flex
						background={cardBackground}
						alignItems="center"
						ml={5}
					>
						<IconButton
							onClick={() => {
								window.open(data.cvUrl);
							}}
							icon={<ExternalLinkIcon />}
						>
							CV
						</IconButton>
					</Flex>
				</Box>
			</Flex>
		</Flex>
	);
};

export default CandidateDetails;
