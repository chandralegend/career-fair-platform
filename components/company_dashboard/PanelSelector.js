import { Flex, Select, Heading, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";

const PanelSelector = (event) => {
	const cardBackground = useColorModeValue("gray.100", "gray.900");

	return (
		<Flex
			alignItems="center"
			justifyItems="center"
			p={3}
			background={cardBackground}
			rounded={7}
			width="100%"
		>
			<Select
				placeholder="Select Panel"
				shadow="base"
				value={event.selected}
				onChange={event.onSelect}
			>
				{event.data.map((op) => {
					const index = event.data.indexOf(op) + 1;
					return (
						<option
							value={index - 1}
							disabled={op.availability}
							key={index}
						>
							{"Panel " + index}
						</option>
					);
				})}
			</Select>
		</Flex>
	);
};

export default PanelSelector;
