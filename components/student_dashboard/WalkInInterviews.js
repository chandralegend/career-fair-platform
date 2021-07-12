import {
	Flex,
	useColorModeValue,
	Heading,
	Text,
	Avatar,
	Button,
} from "@chakra-ui/react";

const WalkInInterviews = () => {
	const cardBackground = useColorModeValue("gray.100", "gray.900");
	const interviews = [
		{
			id: 1,
			company_name: "Google",
			company_logo: "https://bit.ly/3g0VH4E",
			n_people: 10,
		},
		{
			id: 2,
			company_name: "Microsoft",
			company_logo: "https://bit.ly/2S2Ws53",
			n_people: 3,
		},
	];

	return (
		<Flex width='24%' justifyContent='center'>
			<Flex
				p={6}
				height='-webkit-fit-content'
				width='100%'
				rounded='2xl'
				background={cardBackground}
				flexDirection='column'
				alignItems='center'
				shadow='md'>
				<Heading size='md' mb={2}>
					Walk-In Interviews
				</Heading>
				{interviews.length < 1 ? (
					<Text>
						When companies open Walk-In interviews, they will appear here.{" "}
					</Text>
				) : null}
				<Flex flexDirection='column' width='100%'>
					{interviews &&
						interviews.map((interview) => {
							return (
								<WalkInInterviewCard data={interview} key={interview.id} />
							);
						})}
				</Flex>
			</Flex>
		</Flex>
	);
};

const WalkInInterviewCard = ({ data }) => {
	const { company_name, company_logo, n_people } = data;
	return (
		<Flex shadow='md' rounded='xl' p={3} flexDirection='column' mb={5}>
			<Flex mb={3}>
				<Avatar size='md' src={company_logo} mr={3} backgroundColor='white' />
				<Flex flexDirection='column'>
					<Text>{company_name}</Text>
					<Text fontSize='small'>{n_people} people in queue</Text>
				</Flex>
			</Flex>
			<Button colorScheme='teal' rounded='full'>
				Check-In
			</Button>
		</Flex>
	);
};

export default WalkInInterviews;
