import {
	Flex,
	Heading,
	useColorModeValue,
	Text,
} from "@chakra-ui/react";

const Sessions = () => {
	const cardBackground = useColorModeValue("gray.100", "gray.700");
	return (
		<Flex width='100%' justifyContent='center' maxHeight='60%'>
			<Flex
				p={3}
				height='-webkit-fit-content'
				width='100%'
				rounded={6}
				background={cardBackground}
				flexDirection='column'
				alignItems='center'
				shadow='md'>
				<AssignedSessions />
			</Flex>
		</Flex>
	);
};

const AssignedSessions = () => {
	const sessions_data = [
		{
			session_id: 1,
			company_name: "Google",
			company_logo: "https://bit.ly/3g0VH4E",
			panel_no: 2,
			queue_length: 3,
			session_schedule: "1st of June 9.00AM to 12.00PM",
		},
		{
			session_id: 2,
			company_name: "Microsoft",
			company_logo: "https://bit.ly/2S2Ws53",
			panel_no: 3,
			queue_length: 5,
			session_schedule: "2nd of June 9.00AM to 12.00PM",
		},
		{
			session_id: 3,
			company_name: "Google",
			company_logo: "https://bit.ly/3g0VH4E",
			panel_no: 2,
			queue_length: 3,
			session_schedule: "1st of June 9.00AM to 12.00PM",
		},
		{
			session_id: 4,
			company_name: "Microsoft",
			company_logo: "https://bit.ly/2S2Ws53",
			panel_no: 3,
			queue_length: 5,
			session_schedule: "2nd of June 9.00AM to 12.00PM",
		},
		{
			session_id: 5,
			company_name: "Microsoft",
			company_logo: "https://bit.ly/2S2Ws53",
			panel_no: 3,
			queue_length: 5,
			session_schedule: "2nd of June 9.00AM to 12.00PM",
		}
	];
	return (
		<Flex
			flexDirection='column'
			mt={5}
			width='100%'
			p={2}
			overflow='auto'
			maxHeight={500}>
			<Heading size='md' mb={5}>
				Sessions
			</Heading>
			{sessions_data.map((session) => {
				return <InterviewCard data={session} key={session.session_id} />;
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
					<Flex flexDirection='column'>
						<Text fontSize='larger'>Session {data.session_id}</Text>
						<Text fontSize='xs'>{data.session_schedule}</Text>
					</Flex>
				</Flex>
			</Flex>
			<Flex justifyContent='flex-end'>
				
			</Flex>
		</Flex>
	);
};

export default Sessions;
