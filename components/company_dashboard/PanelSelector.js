import { Flex, Select, useColorModeValue } from "@chakra-ui/react";

//TODO: Create a Better Panel Selector with a modal
//TODO: Handle Already Online Panels Avoid users login to different Panel when someoone is already in it

const PanelSelector = ({ selected, onSelect, data }) => {
	const cardBackground = useColorModeValue("gray.100", "gray.900");

	return (
		<Flex
			alignItems='center'
			justifyItems='center'
			p={3}
			background={cardBackground}
			rounded='2xl'
			width='100%'
			shadow='md'>
			<Select placeholder='Select Panel' shadow='base' value={selected} onChange={onSelect}>
				{data &&
					data.map((panel) => {
						return (
							<option value={panel.id} disabled={!panel.availability} key={panel.id}>
								Panel {panel.panel_no}
							</option>
						);
					})}
			</Select>
		</Flex>
	);
};

export default PanelSelector;
