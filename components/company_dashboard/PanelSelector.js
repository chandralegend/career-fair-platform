import { Flex, Select, Heading, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";

const PanelSelector = () => {
	const [panel, setPanel] = useState();
	const cardBackground = useColorModeValue("gray.100", "gray.900");

	const handleChange = (e) => {
		setPanel(e.target.value);
	};

	return (
		<Flex
			alignItems='center'
			justifyItems='center'
			p={3}
			background={cardBackground}
			rounded='2xl'
			width='100%'>
			<Select
				placeholder='Select Panel'
				shadow='base'
				value={panel}
				rounded='2xl'
				onChange={handleChange}>
				<option value='panel1'>Panel 1</option>
				<option value='panel2'>Panel 2</option>
				<option value='panel3'>Panel 3</option>
				<option value='panel4'>Panel 4</option>
				<option value='panel5'>Panel 5</option>
			</Select>
		</Flex>
	);
};

export default PanelSelector;
