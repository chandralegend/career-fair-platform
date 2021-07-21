import { Modal, ModalOverlay, ModalContent, ModalHeader, Button, Wrap, Flex, ButtonGroup } from "@chakra-ui/react";

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
									boxSize={100}
									rounded='full'
									colorScheme={panel.availability ? "teal" : "red"}
									disabled={!panel.availability}
									onClick={() => {
										setPanel(panel.id);
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
