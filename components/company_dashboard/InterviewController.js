import {
 Flex,
 useColorModeValue,
 FormControl,
 Switch,
 FormLabel,
 Heading,
 Spacer,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

import CurrentInterview from "./CurrentInterview";
import InterviewControls from "./InterviewControls";
import { updateCheckingStatus, updateWalkinStatus } from "../../lib/api";

const InterviewController = ({ panel_id, session, walking_status }) => {
 const cardBackground = useColorModeValue("gray.100", "gray.900");
 const [isCheckingEnable, setIsCheckingEnable] = useState(false);
 const [isWalkinEnable, setIsWalkinEnable] = useState(false);
 useEffect(() => {
  setIsCheckingEnable(
   session.isCheckinEnabled == undefined ? false : session.isCheckinEnabled
  );
 }, [session]);
 useEffect(() => {
  console.log(walking_status);
  setIsWalkinEnable(walking_status == undefined ? false : walking_status);
 }, [walking_status]);
 return (
  <Flex flexDirection="column">
   <Flex
    width="100%"
    justifyContent="center"
    flexDirection="column"
    background={cardBackground}
    overflow="auto"
    shadow="md"
    p={3}
   >
    <CurrentInterview />
   </Flex>
   <Flex
    width="100%"
    justifyContent="center"
    flexDirection="column"
    background={cardBackground}
    overflow="auto"
    shadow="md"
    mt={3}
    p={3}
   >
    <InterviewControls panel_id={panel_id} />
   </Flex>
   <Flex
    width="100%"
    justifyContent="center"
    flexDirection="column"
    background={cardBackground}
    overflow="auto"
    shadow="md"
    mt={3}
    p={5}
   >
    <Heading size="md">Interview Settings</Heading>
    <form>
     <FormControl p={5}>
      <Flex>
       <FormLabel htmlFor="walkinStatus" mb="0" fontWeight="bold">
        Enable Walkin
       </FormLabel>
       <Spacer></Spacer>
       <Switch
        isDisabled={panel_id == undefined}
        id="walkingStatus"
        colorScheme="orange"
        isChecked={isWalkinEnable}
        onChange={async () => {
         await updateWalkinStatus(panel_id, { status: !isWalkinEnable });
         setIsWalkinEnable(!isWalkinEnable);
        }}
       />
      </Flex>
     </FormControl>
     <FormControl p={5}>
      <Flex>
       <FormLabel htmlFor="checkingStatus" mb="0" fontWeight="bold">
        Enable Checking
       </FormLabel>
       <Spacer></Spacer>
       <Switch
        isDisabled={session.isCheckinEnabled == undefined}
        id="checkingStatus"
        colorScheme="orange"
        isChecked={isCheckingEnable}
        onChange={async () => {
         await updateCheckingStatus(session.id, { status: !isCheckingEnable });
         setIsCheckingEnable(!isCheckingEnable);
        }}
       />
      </Flex>
     </FormControl>
    </form>
   </Flex>
  </Flex>
 );
};

export default InterviewController;
