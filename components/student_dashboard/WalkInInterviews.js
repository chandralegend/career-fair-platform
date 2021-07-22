import { Flex, useColorModeValue, Heading, Text, Avatar, Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../lib/auth";
import { db } from "../../lib/firebase";
import { getCompany } from "../../lib/api";

const WalkInInterviews = () => {
	const cardBackground = useColorModeValue("gray.100", "gray.900");
	const [interviews, setInterviews] = useState();

	function FETCH_WALKIN_INTERVIEWS() {
		const unsubscriber = db
			.collection("panels")
			.where("isWalkinEnabled" == true)
			.onSnapshot((snapshot) => {
				const walkin_enabled_panels = [];
				snapshot.forEach((doc) => {
					//TODO: this can be optimized further by only reading updated docs.
					console.count("FETCHING PANEL DATA & COMPANY DATA");
					doc.data().then(async (panel_data) => {
						const company = await getCompany(panel_data.company_id);
						walkin_enabled_panels.push({
							id: doc.id,
							company_name: company.data.name,
							company_logo: company.data.photoUrl,
							...panel_data,
						});
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
				shadow='md'>
				<Heading size='md'>Walk-In Interviews</Heading>
				{interviews.length ? (
					<Flex flexDirection='column' width='100%'>
						{interviews.map((interview) => {
							return <WalkInInterviewCard data={interview} key={interview.id} />;
						})}
					</Flex>
				) : (
					<Text>When companies open Walk-In interviews, they will appear here. </Text>
				)}
			</Flex>
		</Flex>
	);
};

const WalkInInterviewCard = ({ data }) => {
	const { user } = useAuth();
	const already_assigned = user.assigned_panels.include(data.id);
	const { company_name, company_logo, panel_no } = data;
	return (
		<Flex shadow='md' rounded='md' p={3} flexDirection='column' mt={5}>
			<Flex mb={3}>
				<Avatar size='md' src={company_logo} mr={3} backgroundColor='white' />
				<Flex flexDirection='column'>
					<Text>{company_name}</Text>
					<Text fontSize='small'>Panel {panel_no}</Text>
				</Flex>
			</Flex>
			<Button
				colorScheme='teal'
				rounded='full'
				disabled={already_assigned || user.checkedin}
				onClick={() => {
					//TODO: Handle Checkin @Janith
					console.log("Handle Ckeckin");
				}}>
				Check-In
			</Button>
		</Flex>
	);
};

export default React.memo(WalkInInterviews);
