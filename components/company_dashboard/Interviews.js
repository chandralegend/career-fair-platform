import { getAssignedInterviews, getStudent } from "../../lib/api";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useInterview } from "../InterviewDetails";
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

const panelHistory = [];

const Interviews = (prop) => {
	const cardBackground = useColorModeValue("gray.100", "gray.900");
	const [assigned_candidates, setAssigned_candidates] = useState([]);
	const { walinkList, inqueueList, completedList } = useInterview();

	useEffect(() => {
		if (prop.activeSession) {
			getAssignedInterviews(prop.activeSession).then((response) => {
				setAssigned_candidates(response.data);
			});
		}
	}, [prop.activeSession]);

	return (
		<Flex
			direction="column"
			bg={cardBackground}
			rounded={7}
			shadow="md"
			p={3}
			height="-webkit-fit-content"
			width="100%"
		>
			<Tabs
				variant="solid-rounded"
				colorScheme="teal"
				align="center"
				m={2}
			>
				<TabList>
					<Tab>Assigned Candidates</Tab>
					<Tab>WalkIn Candidates</Tab>
					<Tab>In Queue</Tab>
					<Tab>Completed</Tab>
					<Tab>Panel History</Tab>
				</TabList>
				<Stack
					overflow="scroll"
					height="-webkit-fit-content"
					maxHeight="80vh"
				>
					<TabPanels>
						<TabPanel>
							<Table
								variant="striped"
								size="sm"
								colorScheme="teal"
							>
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
									{assigned_candidates.map((student) => (
										<StudentRow
											data={student}
											key={student.username}
											type="asigned"
										/>
									))}
								</Tbody>
							</Table>
						</TabPanel>
						<TabPanel>
							<Table
								variant="striped"
								size="sm"
								colorScheme="teal"
							>
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
									{walinkList.map((student) => (
										<StudentRow
											data={student}
											key={student.studentID}
											type="walking"
										/>
									))}
								</Tbody>
							</Table>
						</TabPanel>
						<TabPanel>
							<Table
								variant="striped"
								size="sm"
								width="100%"
								colorScheme="teal"
							>
								<Thead>
									<Tr>
										<Th>Student Name</Th>
										<Th>Uni ID</Th>
										<Th>Department</Th>
										<Th>Email</Th>
										<Th></Th>
									</Tr>
								</Thead>
								<Tbody width="100%">
									{inqueueList.map((student) => (
										<StudentRow
											data={student}
											key={student.studentID}
											type="inQue"
										/>
									))}
								</Tbody>
							</Table>
						</TabPanel>
						<TabPanel>
							<Table
								variant="striped"
								size="sm"
								width="100%"
								colorScheme="teal"
							>
								<Thead>
									<Tr>
										<Th>Student Name</Th>
										<Th>Uni ID</Th>
										<Th>Department</Th>
										<Th>Email</Th>
										<Th></Th>
									</Tr>
								</Thead>
								<Tbody width="100%">
									{completedList.map((student) => (
										<StudentRow
											data={student}
											key={student.studentID}
											type="completed"
										/>
									))}
								</Tbody>
							</Table>
						</TabPanel>
						<TabPanel>
							<Table
								variant="striped"
								size="sm"
								width="100%"
								colorScheme="teal"
							>
								<Thead>
									<Tr>
										<Th>Student Name</Th>
										<Th>Uni ID</Th>
										<Th>Department</Th>
										<Th>Email</Th>
										<Th></Th>
									</Tr>
								</Thead>
								<Tbody width="100%">
									{panelHistory.map((student) => (
										<StudentRow
											data={student}
											key={student.student_id}
										/>
									))}
								</Tbody>
							</Table>
						</TabPanel>
					</TabPanels>
				</Stack>
			</Tabs>
		</Flex>
	);
	function StudentRow({ data, type }) {
		const router = useRouter();

		if (type === "asigned") {
			return (
				<Tr>
					<Td maxWidth="200px">{data.name}</Td>
					<Td>{data.username}</Td>
					<Td>{data.department}</Td>
					<Td maxWidth="200px">{data.email}</Td>
					<Td>
						<Button
							colorScheme="teal"
							size="sm"
							onClick={() => {
								router.push(data.cvUrl);
							}}
						>
							CV
						</Button>
					</Td>
				</Tr>
			);
		} else {
			const studentID = data.studentID;

			const [student, setStudent] = useState();

			useEffect(() => {
				if (studentID) {
					getStudent(studentID).then((response) => {
						setStudent(response.data);
					});
				}
			}, []);

			return (
				<Tr>
					<Td maxWidth="200px">{student && student.name}</Td>
					<Td>{student && student.username}</Td>
					<Td>{student && student.department}</Td>
					<Td maxWidth="200px">{student && student.email}</Td>
					<Td>
						<ButtonGroup>
							<Button
								colorScheme="teal"
								size="sm"
								onClick={() => {
									router.push(student && student.cvUrl);
								}}
							>
								CV
							</Button>
							<Button
								colorScheme="red"
								size="sm"
								hidden={type != "inQue"}
							>
								Cancel
							</Button>
						</ButtonGroup>
					</Td>
				</Tr>
			);
		}
	}
};

export default Interviews;
