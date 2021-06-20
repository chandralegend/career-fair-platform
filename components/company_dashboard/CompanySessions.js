import { Flex, Heading, useColorModeValue, Text } from "@chakra-ui/react";

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
	},
];

const Sessions = () => {
	const cardBackground = useColorModeValue("gray.100", "gray.900");
	return (
		<Flex
			width='100%'
			justifyContent='center'
			mt={3}
			p={3}
			background={cardBackground}
			rounded={6}>
			<Flex width='100%' flexDirection='column' alignItems='center'>
				<Heading size='md' mb={3}>
					Sessions
				</Heading>
				<Flex
					flexDirection='column'
					width='100%'
					overflow='scroll'
					maxHeight={300}>
					{sessions_data.map((session) => {
						return <SessionCard data={session} key={session.session_id} />;
					})}
				</Flex>
			</Flex>
		</Flex>
	);
};

const SessionCard = ({ data }) => {
	return (
		<Flex
			shadow='md'
			rounded={5}
			p={3}
			flexDirection='column'
			mb={5}
			width='100%'>
			<Flex flexDirection='column'>
				<Text fontSize='larger'>Session {data.session_id}</Text>
				<Text fontSize='xs'>{data.session_schedule}</Text>
			</Flex>
		</Flex>
	);
};

export default Sessions;
