import { Flex, Avatar, useColorModeValue, Heading } from "@chakra-ui/react";
import { useAuth } from "../../lib/auth";
const CompanyDetails = () => {
  const cardBackground = useColorModeValue("gray.100", "gray.900");
  const { user } = useAuth();

  return (
    <Flex
      mt={3}
      alignItems="center"
      background={cardBackground}
      rounded={7}
      width="100%"
      p={3}
    >
      <Avatar size="md" name={user.name} src={user.photoUrl} shadow="base" />
      <Heading size="md" ml={3}>
        Welcome
      </Heading>
    </Flex>
  );
};

export default CompanyDetails;
