import React, { useState, useEffect } from "react";
import { Avatar, Box, Text, Flex, Button, Wrap, useToast, AvatarBadge } from "@chakra-ui/react";

import { getAllCompanies, updateStudentPriorityList } from "../lib/api";

const CompanyTile = ({ uid, name, onSelect, selected, img }) => {
	const [isSelected, setIsSelected] = useState(false);
	return (
		<Box
			key={name}
			as='button'
			onClick={() => {
				onSelect(uid);
				setIsSelected(!isSelected);
			}}
			borderRadius={10}
			opacity={isSelected ? "150%" : "80%"}
			m={5}
			p={1}
			textAlign='center'
			height={200}
			width={200}>
			<Flex flexDirection='column' p={3} alignItems='center'>
				<Avatar size='xl' name={name} src={img} border={isSelected ? "3px solid lightgreen" : ""} mb={3} fontSize={30}>
					<AvatarBadge
						visibility={isSelected ? "visible" : "hidden"}
						color='black'
						borderColor='lightgreen'
						bg='lightgreen'
						boxSize='1.25em'
						fontSize={20}>
						{isSelected ? selected.indexOf(uid) + 1 : null}
					</AvatarBadge>
				</Avatar>
				<Text noOfLines={1}>{name}</Text>
			</Flex>
		</Box>
	);
};

const CompanyChooser = ({ userID }) => {
	const [companies, setCompanies] = useState([]);
	const [selectedList, setselectedList] = useState([]);
	const toast = useToast();

	useEffect(() => {
		getAllCompanies().then((response) => {
			setCompanies(response.data.companiesList);
		});
	}, []);

	const handleSelect = (key) => {
		const temp = [...selectedList];
		if (temp.includes(key)) {
			setselectedList(temp.filter((value) => value !== key));
		} else {
			temp.push(key);
			setselectedList(temp);
		}
	};

	const handleSubmit = async () => {
		if (selectedList.length > 0) {
			try {
				await updateStudentPriorityList(userID, selectedList);
				toast({
					id: "success",
					description: "Your Choises Successfully Updated",
					status: "success",
					title: "Success!",
					duration: 2000,
				});
			} catch (error) {
				console.error(error);
				toast({
					id: "error",
					description: "error",
					status: "error",
					title: "Faild!",
					duration: 2000,
				});
			}
		} else {
			toast({
				id: "error",
				description: "Interview list is empty",
				status: "error",
				title: "Please Selct Interviews",
				duration: 2000,
			});
		}
	};

	return (
		<Flex flexDirection='column'>
			<Flex maxHeight='80%' overflow='scroll'>
				{companies && (
					<Wrap>
						{companies.map((company) => {
							return (
								<CompanyTile
									key={company.id}
									uid={company.id}
									name={company.name}
									selected={selectedList}
									img={company.photoUrl || ""}
									onSelect={handleSelect}></CompanyTile>
							);
						})}
					</Wrap>
				)}
			</Flex>

			<Flex justifyContent='flex-end'>
				<Button m={10} bg='teal.400' onClick={handleSubmit} rounded='full'>
					Submit Priority List
				</Button>
			</Flex>
		</Flex>
	);
};

export default CompanyChooser;
