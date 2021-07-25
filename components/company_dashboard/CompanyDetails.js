import { Flex, Avatar, useColorModeValue, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "../../lib/auth";
import { getPanel } from "../../lib/api";

const CompanyDetails = ({ panel_id }) => {
	const cardBackground = useColorModeValue("gray.100", "gray.900");
	const { user } = useAuth();
	const [representative, setRepresentative] = useState();

	useEffect(() => {
		if (panel_id) {
			// console.count("Getting Panel Data");
			getPanel(panel_id).then((res) => {
				setRepresentative(res.data.assign_representative);
			});
		}
	}, [panel_id]);

	return (
		<Flex mt={3} alignItems='center' background={cardBackground} width='100%' p={3} shadow='md' flexDirection='column'>
			<Flex flexDirection='column' alignItems='center'>
				<Avatar size='xl' name={user.name} src={user.photoUrl} shadow='base' />
				<Heading size='md' mt={3} noOfLines={1}>
					{user.name}
				</Heading>
				<Text>______</Text>
			</Flex>

			{representative ? <Representative data={representative} /> : null}
		</Flex>
	);
};

const Representative = ({ data }) => {
	return (
		<Flex width='100%' alignItems='center' flexDirection='column' mt={3}>
			<Heading size='sm' mb={2}>
				Representative's Details
			</Heading>
			<Text fontSize='sm' noOfLines={1}>
				{data.name}
			</Text>
			<Text fontSize='sm'>{data.email}</Text>
			<Text fontSize='sm'>{data.phone}</Text>
		</Flex>
	);
};

export default CompanyDetails;
