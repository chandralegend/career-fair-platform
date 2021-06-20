import {
	Flex,
	useColorModeValue,
	Button,
	Tab,
	TabPanel,
	Tabs,
	TabPanels,
	TabList,
	Stack,
	Table,
	Thead,
	Td,
	Th,
	Tr,
	Tbody,
	ButtonGroup,
} from "@chakra-ui/react";

const assignedCandidates = [
	{
		student_id: "190609J",
		student_name: "Geshan Sudasinghe",
		student_cv: "/cv/st1",
		student_email: "geshan@gmail.",
		department: "Electrical",
	},
	{
		student_id: "190619J",
		student_name: "Geshan Sudasinghe ",
		student_cv: "/cv/st2",
		student_email: "geshansudasinghe999@gmail.com",
		department: "Electrical",
	},
	{
		student_id: "190629J",
		student_name: "Janith Samee",
		student_cv: "/cv/st3",
		student_email: "janith@gmail.com",
		department: "Electrical",
	},
];
const walkingCandidates = [
	{
		student_id: "190619J",
		student_name: "Geshan Sudasinghe ",
		student_cv: "/cv/st2",
		student_email: "geshansudasinghe999@gmail.com",
		department: "Electrical",
	},
	{
		student_id: "190629J",
		student_name: "Janith Samee",
		student_cv: "/cv/st3",
		student_email: "janith@gmail.com",
		department: "Electrical",
	},
	{
		student_id: "190639J",
		student_name: "Geshan Sudasinghe",
		student_cv: "/cv/st1",
		student_email: "geshan@gmail.",
		department: "Electrical",
	},
	{
		student_id: "190649J",
		student_name: "Geshan Sudasinghe ",
		student_cv: "/cv/st2",
		student_email: "geshansudasinghe999@gmail.com",
		department: "Electrical",
	},
	{
		student_id: "190659J",
		student_name: "Janith Samee",
		student_cv: "/cv/st3",
		student_email: "janith@gmail.com",
		department: "Electrical",
	},
	{
		student_id: "190669J",
		student_name: "Geshan Sudasinghe ",
		student_cv: "/cv/st2",
		student_email: "geshansudasinghe999@gmail.com",
		department: "Electrical",
	},
	{
		student_id: "190679J",
		student_name: "Janith Samee",
		student_cv: "/cv/st3",
		student_email: "janith@gmail.com",
		department: "Electrical",
	},
];
const inQueue = [
	{
		student_id: "190689J",
		student_name: "Geshan Sudasinghe ",
		student_cv: "/cv/st2",
		student_email: "geshansudasinghe999@gmail.com",
		department: "Electrical",
	},
	{
		student_id: "110629J",
		student_name: "Janith Samee",
		student_cv: "/cv/st3",
		student_email: "janith@gmail.com",
		department: "Electrical",
	},
	{
		student_id: "120619J",
		student_name: "Geshan Sudasinghe ",
		student_cv: "/cv/st2",
		student_email: "geshansudasinghe999@gmail.com",
		department: "Electrical",
	},
	{
		student_id: "170629J",
		student_name: "Janith Samee",
		student_cv: "/cv/st3",
		student_email: "janith@gmail.com",
		department: "Electrical",
	},
];

const Interviews = () => {
	const cardBackground = useColorModeValue("gray.100", "gray.900");

	const panelHistory = [];

	return (
		<Flex
			direction='column'
			bg={cardBackground}
			rounded={7}
			shadow='md'
			p={3}
			height='-webkit-fit-content'
			width='100%'>
			<Tabs variant='solid-rounded' colorScheme='teal' align='center' m={2}>
				<TabList>
					<Tab>Assigned Candidates</Tab>
					<Tab>WalkIn Candidates</Tab>
					<Tab>In Queue</Tab>
					<Tab>Completed</Tab>
					<Tab>Panel History</Tab>
				</TabList>
				<Stack overflow='scroll' height='-webkit-fit-content' maxHeight='80vh'>
					<TabPanels>
						<TabPanel>
							<Table variant='striped' size='sm' colorScheme='teal'>
								<Thead>
									<Tr>
										<Th>Student Name</Th>
										<Th>University ID</Th>
										<Th>Department</Th>
										<Th>Email</Th>
										<Th></Th>
									</Tr>
								</Thead>
								<Tbody>
									{assignedCandidates.map((student) => (
										<StudentRow data={student} key={student.student_id} />
									))}
								</Tbody>
							</Table>
						</TabPanel>
						<TabPanel>
							<Table variant='striped' size='sm' colorScheme='teal'>
								<Thead>
									<Tr>
										<Th>Student Name</Th>
										<Th>Uni ID</Th>
										<Th>Department</Th>
										<Th>Email</Th>
										<Th></Th>
									</Tr>
								</Thead>
								<Tbody>
									{walkingCandidates.map((student) => (
										<StudentRow data={student} key={student.student_id} />
									))}
								</Tbody>
							</Table>
						</TabPanel>
						<TabPanel>
							<Table
								variant='striped'
								size='sm'
								width='100%'
								colorScheme='teal'>
								<Thead>
									<Tr>
										<Th>Student Name</Th>
										<Th>Uni ID</Th>
										<Th>Department</Th>
										<Th>Email</Th>
										<Th></Th>
									</Tr>
								</Thead>
								<Tbody width='100%'>
									{inQueue.map((student) => (
										<StudentRowInQ data={student} key={student.student_id} />
									))}
								</Tbody>
							</Table>
						</TabPanel>
						<TabPanel>
							<Table
								variant='striped'
								size='sm'
								width='100%'
								colorScheme='teal'>
								<Thead>
									<Tr>
										<Th>Student Name</Th>
										<Th>Uni ID</Th>
										<Th>Department</Th>
										<Th>Email</Th>
										<Th></Th>
									</Tr>
								</Thead>
								<Tbody width='100%'>
									{panelHistory.map((student) => (
										<StudentRow data={student} key={student.student_id} />
									))}
								</Tbody>
							</Table>
						</TabPanel>
					</TabPanels>
				</Stack>
			</Tabs>
		</Flex>
	);
};

function StudentRow({ data }) {
	return (
		<Tr>
			<Td maxWidth='200px'>{data.student_name}</Td>
			<Td>{data.student_id}</Td>
			<Td>{data.department}</Td>
			<Td maxWidth='200px'>{data.student_email}</Td>
			<Td>
				<Button colorScheme='teal' size='sm'>
					CV
				</Button>
			</Td>
		</Tr>
	);
}
function StudentRowInQ({ data }) {
	return (
		<Tr width='100%'>
			<Td maxWidth='200px'>{data.student_name}</Td>
			<Td>{data.student_id}</Td>
			<Td>{data.department}</Td>
			<Td maxWidth='200px'>{data.student_email}</Td>
			<Td>
				<ButtonGroup>
					<Button colorScheme='teal' size='sm'>
						CV
					</Button>
					<Button colorScheme='red' size='sm'>
						Cancel
					</Button>
				</ButtonGroup>
			</Td>
		</Tr>
	);
}

export default Interviews;
