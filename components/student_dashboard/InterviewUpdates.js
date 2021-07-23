import { WarningIcon } from "@chakra-ui/icons";
import { Flex, Heading, Button, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { useAuth } from "../../lib/auth";
import { getCompany } from "../../lib/api";

const InterviewUpdates = () => {
	const { user, updateUser } = useAuth();
	const [interview, setInterview] = useState({});
	const [queuePos, setQueuePos] = useState();

	function FETCH_INTERVIEW() {
		const unsubscriber = db
			.collection("interviews")
			.doc(user.checkedin)
			.onSnapshot((interviewRef) => {
				const interview = interviewRef.data();
				console.count("UPDATING INTERVIEW");
				getCompany(interview.company_id).then((res) => {
					const company_details = res.data;
					setInterview({ id: interviewRef.id, ...interview, company_name: company_details.name });
				});
			});
		return unsubscriber;
	}

	function FETCH_QUEUE() {
		const unsubscriber = db
			.collection("interviews")
			.where("session_id", "==", interview.session_id)
			.where("isCompleted", "==", false)
			.orderBy("created_at", "desc")
			.onSnapshot((snapshot) => {
				console.count("UPDATING QUEUE");
				snapshot.forEach((doc, id) => {
					if (doc.id === interview.id) {
						setQueuePos(id);
					}
				});
			});
		return unsubscriber;
	}

	function FETCH_STUDENT() {
		const unsubscriber = db
			.collection("students")
			.doc(user.uuid)
			.onSnapshot((studentRef) => {
				console.count("UPDATING USER");
				const student = studentRef.data();
				updateUser({ checkedin: student.checkedin });
			});
		return unsubscriber;
	}

	useEffect(() => {
		if (user.checkedin) {
			console.count("FETCHING INTERVIEW");
			const interview_unsubscribe = FETCH_INTERVIEW();
			return () => {
				interview_unsubscribe();
			};
		} else {
			setInterview();
		}
	}, [user]);

	useEffect(() => {
		if (interview.id) {
			console.count("FETCHING QUEUE");
			const queue_unsubscribe = FETCH_QUEUE();
			return () => {
				queue_unsubscribe();
			};
		} else {
			setQueuePos();
		}
	}, [interview]);

	useEffect(() => {
		console.count("FETCHING STUDENT");
		const student_unsubscribe = FETCH_STUDENT();
		return () => {
			student_unsubscribe();
		};
	}, []);

	const message = () => {
		if (queuePos === 0) {
			return "Join Now!";
		} else if (queuePos === 1) {
			return "You are Next. Get Ready!";
		} else {
			return `You are ${queuePos} Positions away`;
		}
	};

	return (
		<Flex p={6} flexDirection='column' width='100%'>
			{interview ? (
				<Flex>
					<Flex flexDirection='column' width='30%'>
						<Text>You are Currently in,</Text>
						<Heading>{interview.company_name}</Heading>
						<Text>Interview Queue</Text>
					</Flex>
					<Flex alignItems='center' justifyContent='center' width='60%'>
						<Heading textAlign='center' size='md'>
							{message()}
						</Heading>
					</Flex>
					<Flex flexDirection='column' width='30%'>
						<Button
							rounded='full'
							mb={2}
							colorScheme='red'
							disabled={queuePos < 2}
							onClick={() => {
								db.collection("interviews").doc(user.checkedin).delete();
								db.collection("students").doc(user.uuid).update({ checkedin: "" });
							}}>
							Leave Queue
						</Button>
						<Button
							rounded='full'
							colorScheme='green'
							disabled={!interview.meeting_link}
							onClick={() => {
								window.open(interview.meeting_link, "_blank");
							}}>
							Join Meeting
						</Button>
					</Flex>
				</Flex>
			) : (
				<Flex justifyContent='space-between' alignItems='center'>
					<Heading size='md'>You are not in any queue</Heading>
					<WarningIcon boxSize='16' color='red' />
				</Flex>
			)}
		</Flex>
	);
};

export default InterviewUpdates;
