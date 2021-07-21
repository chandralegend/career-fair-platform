import { Flex, Heading, Button, ButtonGroup } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useInterview } from "../../lib/interviews";
import CandidateDetails from "./CandidateDetails";
import { getStudent } from "../../lib/api";

//TODO: Comeup with a better solution to Enable Checkin and Walkin Actions @Janith

const InterviewControls = ({ panel_id }) => {
 const { inQueueInterviews, NextInterview, EnableCheckin, EnableWalkin } =
  useInterview();
 const [student, setStudent] = useState();

 useEffect(() => {
  if (inQueueInterviews.length >= 2) {
   getStudent(inQueueInterviews[1].student_id).then((res) => {
    setStudent(res.data);
   });
  } else {
   setStudent();
  }
 }, [inQueueInterviews]);

 return (
  <Flex height="-webkit-fit-content" flexDirection="column" p={3}>
   <Heading size="md">Upcoming Interview</Heading>
   <CandidateDetails data={student} />
   <Button
    colorScheme="green"
    shadow="md"
    width="100%"
    mt={3}
    rounded="full"
    disabled={!inQueueInterviews.length}
    onClick={() => {
     NextInterview();
    }}
   >
    Next Interview
   </Button>
  </Flex>
 );
};

export default InterviewControls;
