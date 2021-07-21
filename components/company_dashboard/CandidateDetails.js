import { Flex, Avatar, Text, IconButton } from "@chakra-ui/react";

import { ExternalLinkIcon } from "@chakra-ui/icons";

const CandidateDetails = ({ data }) => {
	if (data) {
		return (
			<Flex justifyContent='space-between' mt={3} p={2}>
				<Flex flexDirection='row' width='100%' alignItems='center' justifyContent='space-evenly'>
					<Avatar size='md' src={data && data.photoUrl} mr={3} backgroundColor='white' />
					<Flex flexDirection='column' mr={3}>
						<Text fontSize='larger' noOfLines={1}>
							{data && data.name}
						</Text>
						<Text fontSize='smaller'>{data && data.department}</Text>
						<Text fontSize='xs'>{data && data.email}</Text>
					</Flex>
					<IconButton
						onClick={() => window.open(data && data.cvUrl, "_blank")}
						icon={<ExternalLinkIcon />}
						rounded='full'
						disabled={!data.cvUrl}>
						CV
					</IconButton>
				</Flex>
			</Flex>
		);
	} else {
		return <div>Not Available</div>;
	}
};

export default CandidateDetails;
