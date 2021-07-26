import { Flex, useColorModeValue, Heading, Text, Avatar, Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../lib/auth";
import { db } from "../../lib/firebase";
import { getCompany, createInterview, getPanelSessions } from "../../lib/api";

const WalkInInterviews = () => {
	const cardBackground = useColorModeValue("gray.100", "gray.900");
	const [interviews, setInterviews] = useState([]);

	function FETCH_WALKIN_INTERVIEWS() {
		const unsubscriber = db
			.collection("panels")
			.where("isWalkinEnabled", "==", true)
			.onSnapshot((snapshot) => {
				const walkin_enabled_panels = [];
				snapshot.forEach((doc) => {
					//TODO: this can be optimized further by only reading updated docs.
					// console.count("FETCHING PANEL DATA");
					const panel_data = doc.data();
					walkin_enabled_panels.push({
						id: doc.id,
						...panel_data,
					});
				});
				setInterviews(walkin_enabled_panels);
			});
		return unsubscriber;
	}

	useEffect(() => {
		const unsubscribe = FETCH_WALKIN_INTERVIEWS();
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<Flex width='24%' justifyContent='center'>
			<Flex
				p={6}
				height='-webkit-fit-content'
				width='100%'
				background={cardBackground}
				flexDirection='column'
				alignItems='center'
				shadow='md'
				maxHeight={600}
				overflow='auto'>
				<Heading size='md'>Walk-In Interviews</Heading>
				{interviews.length >= 1 ? (
					<Flex flexDirection='column' width='100%'>
						{interviews.map((interview) => {
							return <WalkInInterviewCard data={interview} key={interview.id} />;
						})}
					</Flex>
				) : (
					<Text mt={5}>When companies open Walk-In interviews, they will appear here. </Text>
				)}
			</Flex>
		</Flex>
	);
};

const WalkInInterviewCard = ({ data }) => {
	const { user } = useAuth();
	const { panel_no, company_id } = data;
	const [company, setCompany] = useState({});
	const already_assigned = user.company_list.includes(data.company_id);

	function getCurrentSessionID(sessions) {
		let finalSession = undefined;
		sessions.forEach((session) => {
			const time_now = new Date().getTime() / 1000;
			if (time_now >= session.start_time._seconds && time_now <= session.end_time._seconds) {
				finalSession = session.id;
			}
		});
		return finalSession;
	}

	const handleCheckIn = (userID, companId) => {
		getPanelSessions(data.id).then((sessions) => {
			const sessionId = getCurrentSessionID(sessions.data);
			if (sessionId) {
				const body = {
					studentId: userID,
					sessionId: sessionId,
					isWalkin: true,
					companyId: companId,
				};
				createInterview(body);
			} else {
				console.log("no session");
			}
		});
	};

	useEffect(() => {
		// console.count("FETCHING COMPANY DATA");
		getCompany(company_id).then((company) => {
			setCompany(company.data);
		});
	}, []);

	return (
		<Flex shadow='md' rounded='md' p={3} flexDirection='column' mt={5}>
			<Flex mb={3}>
				<Avatar size='md' src={company.photoUrl} mr={3} backgroundColor='white' boxShadow='lg' />
				<Flex flexDirection='column'>
					<Text>{company.name}</Text>
					<Text fontSize='small'>Panel {panel_no}</Text>
				</Flex>
			</Flex>
			<Button
				colorScheme='teal'
				boxShadow='md'
				rounded='full'
				disabled={already_assigned || user.checkedin}
				onClick={() => {
					if (user && company_id) {
						try {
							handleCheckIn(user.uuid, company_id);
						} catch (error) {
							console.log(error);
						}
					}
				}}>
				{already_assigned ? "Already Assigned" : "Check-In"}
			</Button>
		</Flex>
	);
};

export default React.memo(WalkInInterviews);
