import { Modal, ModalOverlay, ModalContent, ModalHeader, Select } from "@chakra-ui/react";

const PanelSelectorModal = ({ isOpen, onClose, selected, onSelect, data }) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Panel Selector</ModalHeader>
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
			</ModalContent>
		</Modal>
	);
};
export default PanelSelectorModal;
