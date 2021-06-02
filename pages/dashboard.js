import {
	Flex,
	Heading,
	useColorModeValue,
	Avatar,
	Text,
	Button,
} from "@chakra-ui/react";

import InterviewUpdates from "../components/InterviewUpdates";
import MenuBar from "../components/MenuBar";
import UserDetails from "../components/UserDetails";
import WalkinInterviews from "../components/WalkinInterviews";

const dashboard = () => {
	return (
		<Flex height='100vh' flexDirection='column' padding={5}>
			<MenuBar />
			<Flex flexDirection='row' mt={5}>
				<UserDetails />
				<Interviews />
				<WalkinInterviews />
			</Flex>
		</Flex>
	);
};

const Interviews = () => {
	const cardBackground = useColorModeValue("gray.100", "gray.900");
	return (
		<Flex width='53%' justifyContent='center'>
			<Flex
				p={3}
				height='600'
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
			queue_length: 3,
			interview_schedule: "1st of June 9.00AM to 12.00PM",
		},
		{
			interview_id: 2,
			company_name: "Microsoft",
			company_logo: "https://bit.ly/2S2Ws53",
			queue_length: 5,
			interview_schedule: "2nd of June 9.00AM to 12.00PM",
		},
	];
	return (
		<Flex flexDirection='column' mt={5} width='100%'>
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
			shadow='base'
			rounded={5}
			p={3}
			flexDirection='column'
			mb={5}
			width='100%'>
			<Flex justifyContent='space-between'>
				<Flex alignItems='center'>
					<Avatar
						size='lg'
						src={data.company_logo}
						mr={3}
						backgroundColor='white'
					/>
					<Flex flexDirection='column'>
						<Text fontSize='larger'>{data.company_name}</Text>
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

export default dashboard;
