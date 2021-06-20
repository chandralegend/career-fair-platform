import React, { useState, useEffect } from "react";
import {
 Avatar,
 Box,
 Text,
 Flex,
 Badge,
 Spacer,
 Button,
 Wrap,
 useToast,
 toast,
} from "@chakra-ui/react";

import { getAllCompanies, updateStudentPriorityList } from "../lib/api";

const CompanyTile = ({ uid, name, onSelect, index, img }) => {
 const [isSelected, setisSelected] = useState(false);

 return (
  <Box
   key={name}
   as="button"
   onClick={() => {
    setisSelected(!isSelected);
    onSelect(uid);
   }}
   border={isSelected ? "3px solid lightgreen" : ""}
   borderRadius={10}
   opacity={isSelected ? "150%" : "80%"}
   m={5}
   p={1}
   textAlign="center"
   width="-webkit-fit-content"
  >
   <Flex>
    <Spacer></Spacer>
    <Badge fontSize="1.2em">{isSelected ? index.indexOf(uid) + 1 : ""}</Badge>
   </Flex>
   <Flex flexDirection="column" p={3}>
    <Avatar size="2xl" name={name} src={img}></Avatar>
    <Text>{name}</Text>
   </Flex>
  </Box>
 );
};

const CompanyChooserGrid = ({ userID }) => {
 const [companies, setcompanies] = useState([]);
 const [selectedList, setselectedList] = useState([]);
 const toast = useToast();
 useEffect(() => {
  getAllCompanies().then((response) => {
   setcompanies(response.data.companies);
  });
 }, []);

 const handleSelect = (key) => {
  const temp = selectedList;
  if (temp.includes(key)) {
   setselectedList(temp.filter((value) => value !== key));
  } else {
   temp.push(key);
   setselectedList(temp);
  }
 };

 const handleSubmit = async () => {
  if (selectedList.length > 0) {
   const response = await updateStudentPriorityList({
    uuid: userID,
    companies: selectedList,
   });
   if (response && response.status == 200) {
    toast({
     id: "success",
     description: "Your Choises Successfully Updated",
     status: "success",
     title: "Success!",
     duration: 2000,
    });
   } else {
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
  <div>
   <Flex>
    <Spacer></Spacer>
    <Button m={10} bg="teal.400" onClick={() => handleSubmit()}>
     Submit Interview List
    </Button>
   </Flex>
   <Wrap>
    {companies.map((company) => {
     return (
      <CompanyTile
       key={company.uid}
       uid={company.uid}
       name={company.name}
       index={selectedList}
       img={company.photoUrl || ""}
       onSelect={handleSelect}
      ></CompanyTile>
     );
    })}
   </Wrap>
  </div>
 );
};

export default CompanyChooserGrid;
