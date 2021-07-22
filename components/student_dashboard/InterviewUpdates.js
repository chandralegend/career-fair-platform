import { WarningIcon } from "@chakra-ui/icons";
import { Flex, Heading, Button, Text } from "@chakra-ui/react";

//TODO: Retrieve data @Geshan
//TODO: handle state change @Jehan @Geshan

const InterviewUpdates = () => {
	const data = {
		interview_id: 3,
		company_name: "Google",
		queue_position: 3,
		current_position: 3,
	};

	const message = (current_position, queue_position) => {
		if (queue_position === current_position) {
			return "Join Now!";
		} else if (queue_position === current_position + 1) {
			return "You are Next. Get Ready!";
		} else {
			return `You are ${queue_position - current_position} Positions away`;
		}
	};

	return (
		<Flex p={6} flexDirection='column' width='100%'>
			{data && Object.keys(data).length > 0 ? (
				<Flex>
					<Flex flexDirection='column' width='30%'>
						<Text>You are Currently in,</Text>
						<Heading>{data.company_name}</Heading>
						<Text>Interview Queue</Text>
					</Flex>
					<Flex alignItems='center' justifyContent='center' width='60%'>
						<Heading textAlign='center' size='md'>
							{message(data.current_position, data.queue_position)}
						</Heading>
					</Flex>
					<Flex flexDirection='column' width='30%'>
						<Button rounded='full' mb={2} colorScheme='red' disabled={data.queue_position === data.current_position}>
							Leave Queue
						</Button>
						<Button rounded='full' colorScheme='green' disabled={data.queue_position !== data.current_position}>
							Join Meeting
						</Button>
					</Flex>
				</Flex>
			) : (
				<Flex justifyContent='space-between' alignItems='center'>
					<Heading size='md'>You are not in a queue</Heading>
					<WarningIcon boxSize='16' color='red' />
				</Flex>
			)}
		</Flex>
	);
};

export default InterviewUpdates;
