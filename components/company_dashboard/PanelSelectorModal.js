import { Modal, ModalOverlay, ModalContent, ModalHeader, Button, ButtonGroup } from "@chakra-ui/react";
import { updatePanelAvailability } from "../../lib/api";

const PanelSelectorModal = ({ isOpen, onClose, setPanel, data }) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} size='2xl' isCentered>
			<ModalOverlay />
			<ModalContent alignItems='center' width='-webkit-fit-content' p={6}>
				<ModalHeader>Select a Panel</ModalHeader>
				<ButtonGroup>
					{data &&
						data.map((panel) => {
							return (
								<Button
									key={panel.id}
									boxSize={100}
									rounded='full'
									colorScheme={panel.availability ? "teal" : "red"}
									disabled={!panel.availability}
									onClick={() => {
										setPanel(panel.id);
										// console.count("Update Panel");
										updatePanelAvailability(panel.id, { availability: false });
										onClose();
									}}>
									Panel {panel.panel_no}
								</Button>
							);
						})}
				</ButtonGroup>
			</ModalContent>
		</Modal>
	);
};
export default PanelSelectorModal;
