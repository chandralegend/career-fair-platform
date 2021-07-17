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
import React, { useState, useEffect } from "react";
import { useInterview } from "../../lib/interviews";
import { getStudent } from "../../lib/api";

const Interviews = ({ session }) => {
	const cardBackground = useColorModeValue("gray.100", "gray.900");
	const [assignedCandidates, setAssignedCandidates] = useState();
	const { completedInterviews, walkinInterviews, inQueueInterviews, Refresh } = useInterview();

	useEffect(() => {
		if (session) {
			setAssignedCandidates(session.assigned_students);
		}
	}, [session, completedInterviews, walkinInterviews, inQueueInterviews]);

	return (
		<Flex
			direction='column'
			bg={cardBackground}
			rounded='2xl'
			shadow='md'
			p={3}
			height='-webkit-fit-content'
			width='100%'>
			<Tabs variant='solid-rounded' colorScheme='teal' align='center' m={2}>
				<TabList>
					<Tab fontSize='sm'>Assigned Candidates</Tab>
					<Tab fontSize='sm'>WalkIn Candidates</Tab>
					<Tab fontSize='sm'>In Queue</Tab>
					<Tab fontSize='sm'>Completed</Tab>
					<Tab fontSize='sm'>Panel History</Tab>
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
									{assignedCandidates &&
										assignedCandidates.map((student_id) => (
											<StudentRow student_id={student_id} key={student_id} type='assigned' />
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
									{walkinInterviews &&
										walkinInterviews.map((interview) => (
											<StudentRow student_id={interview.student_id} key={interview.student_id} type='walkin' />
										))}
								</Tbody>
							</Table>
						</TabPanel>
						<TabPanel>
							<Table variant='striped' size='sm' width='100%' colorScheme='teal'>
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
									{inQueueInterviews &&
										inQueueInterviews.map((interview) => (
											<StudentRow student_id={interview.student_id} key={interview.student_id} type='inQueue' />
										))}
								</Tbody>
							</Table>
						</TabPanel>
						<TabPanel>
							<Table variant='striped' size='sm' width='100%' colorScheme='teal'>
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
									{completedInterviews &&
										completedInterviews.map((interview) => (
											<StudentRow student_id={interview.student_id} key={interview.student_id} type='completed' />
										))}
								</Tbody>
							</Table>
						</TabPanel>
						//TODO: Add a Table with all the activities
						<TabPanel>TODO</TabPanel>
					</TabPanels>
				</Stack>
				<Button rounded='full' colorScheme='pink' width='-webkit-fit-content' onClick={() => Refresh()}>
					Refresh
				</Button>
			</Tabs>
		</Flex>
	);
};

const StudentRow = ({ student_id, type }) => {
	const [student, setStudent] = useState();

	useEffect(() => {
		console.count("Getting Student Data");
		getStudent(student_id).then((res) => setStudent(res.data));
	}, []);

	if (type === "assigned") {
		return (
			<Tr>
				<Td maxWidth='200px'>{student && student.name}</Td>
				<Td>{student && student.username}</Td>
				<Td>{student && student.department}</Td>
				<Td maxWidth='200px'>{student && student.email}</Td>
				<Td>
					<Button
						colorScheme='teal'
						size='sm'
						rounded='full'
						onClick={() => {
							window.open(student.cvUrl, "_blank");
						}}>
						CV
					</Button>
				</Td>
			</Tr>
		);
	} else {
		return (
			<Tr>
				<Td maxWidth='200px'>{student && student.name}</Td>
				<Td>{student && student.username}</Td>
				<Td>{student && student.department}</Td>
				<Td maxWidth='200px'>{student && student.email}</Td>
				<Td>
					<ButtonGroup>
						<Button
							colorScheme='teal'
							size='sm'
							rounded='full'
							onClick={() => {
								window.open(student.cvUrl, "_blank");
							}}>
							CV
						</Button>
						<Button colorScheme='red' size='sm' rounded='full' hidden={type !== "walkin" || type === "completed"}>
							Cancel
						</Button>
					</ButtonGroup>
				</Td>
			</Tr>
		);
	}
};

export default React.memo(Interviews);
