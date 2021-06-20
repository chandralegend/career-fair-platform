import {
	Flex,
	Heading,
	useColorModeValue,
	Avatar,
	Text,
	Button,
} from "@chakra-ui/react";

import InterviewUpdates from "./InterviewUpdates";

const Interviews = () => {
	const cardBackground = useColorModeValue("gray.100", "gray.900");
	return (
		<Flex width='53%' justifyContent='center' maxHeight='60%'>
			<Flex
				p={3}
				height='-webkit-fit-content'
				width='100%'
				rounded={6}
				background={cardBackground}
				flexDirection='column'
				alignItems='center'
				shadow='md'
				ml={3}
				mr={3}>
				<InterviewUpdates />
				<AssignedInterviews />
			</Flex>
		</Flex>
	);
};

const AssignedInterviews = () => {
	const data = [
		{
			interview_id: 1,
			company_name: "Google",
			company_logo: "https://bit.ly/3g0VH4E",
			panel_no: 2,
			queue_length: 3,
			interview_schedule: "1st of June 9.00AM to 12.00PM",
		},
		{
			interview_id: 2,
			company_name: "Microsoft",
			company_logo: "https://bit.ly/2S2Ws53",
			panel_no: 3,
			queue_length: 5,
			interview_schedule: "2nd of June 9.00AM to 12.00PM",
		},
	];
	return (
		<Flex
			flexDirection='column'
			mt={5}
			width='100%'
			p={2}
			overflow='scroll'
			maxHeight={500}>
			<Heading size='md' mb={5}>
				Your Assigned Interviews
			</Heading>
			{data.map((interview) => {
				return <InterviewCard data={interview} key={interview.interview_id} />;
			})}
		</Flex>
	);
};

const InterviewCard = ({ data }) => {
	return (
		<Flex
			shadow='md'
			rounded={5}
			p={3}
			flexDirection='column'
			mb={5}
			width='100%'>
			<Flex justifyContent='space-between'>
				<Flex alignItems='center'>
					<Avatar
						size='md'
						src={data.company_logo}
						mr={3}
						backgroundColor='white'
					/>
					<Flex flexDirection='column'>
						<Text fontSize='larger'>{data.company_name}</Text>
						<Text fontSize='smaller'>Panel {data.panel_no}</Text>
					</Flex>
				</Flex>
				<Flex alignItems='center'>
					<Text fontSize='large'>{data.queue_length} people in the queue</Text>
				</Flex>
				<Flex alignItems='center'>
					<Button colorScheme='blue'>Check-In</Button>
				</Flex>
			</Flex>
			<Flex justifyContent='flex-end'>
				<Text fontSize='xs'>{data.interview_schedule}</Text>
			</Flex>
		</Flex>
	);
};

export default Interviews;
