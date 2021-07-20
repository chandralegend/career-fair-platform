import { Flex, Modal, ModalOverlay, ModalContent, ModalHeader } from "@chakra-ui/react";

const PanelSelectorModal = ({ isOpen, onClose }) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Panel Selector</ModalHeader>
			</ModalContent>
		</Modal>
	);
};
export default PanelSelectorModal;
