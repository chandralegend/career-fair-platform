import { Icon } from "@chakra-ui/react";
import { FaBuilding, FaUniversity } from "react-icons/fa";

const StudentIcon = (props) => {
	return <Icon as={FaUniversity} {...props}></Icon>;
};

const CompanyIcon = (props) => {
	return <Icon as={FaBuilding} {...props}></Icon>;
};

export { StudentIcon, CompanyIcon };
