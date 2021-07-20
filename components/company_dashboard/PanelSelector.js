import { Button, Flex, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import PanelSelectorModal from "./PanelSelectorModal";

//TODO: Handle Already Online Panels Avoid users login to different Panel when someoone is already in it @Janith

const PanelSelector = ({ selected, onSelect, data, setPanel }) => {
	const cardBackground = useColorModeValue("gray.100", "gray.900");
	const { isOpen, onOpen, onClose } = useDisclosure();

	const LeavePanel = () => {
		console.log("Leave");
		setPanel();
	};

	return (
		<Flex p={3} background={cardBackground} width='100%' shadow='md'>
			<PanelSelectorModal isOpen={isOpen} onClose={onClose} selected={selected} onSelect={onSelect} data={data} />
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
