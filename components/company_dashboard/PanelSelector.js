import { Button, Flex, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import PanelSelectorModal from "./PanelSelectorModal";
import { updatePanelAvailability } from "../../lib/api";

const PanelSelector = ({ selected, data, setPanel }) => {
	const cardBackground = useColorModeValue("gray.100", "gray.900");
	const { isOpen, onOpen, onClose } = useDisclosure();

	function LeavePanel() {
		// console.count("Leave Panel");
		updatePanelAvailability(selected, { availability: true });
		setPanel(null);
	}

	return (
		<Flex p={3} background={cardBackground} width='100%' shadow='md'>
			<PanelSelectorModal isOpen={isOpen} onClose={onClose} setPanel={setPanel} data={data} />
			<Button
				rounded='full'
				colorScheme={selected ? "red" : "teal"}
				width='100%'
				onClick={!selected ? onOpen : LeavePanel}>
				{selected ? `Leave Panel ${data.filter((panel) => panel.id == selected)[0].panel_no}` : "Choose a Panel"}
			</Button>
		</Flex>
	);
};

export default PanelSelector;
