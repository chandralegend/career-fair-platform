import {
	Flex,
    Select,
    Heading
} from "@chakra-ui/react";

const Panel = ({cardBackground}) => {

    return (
        <Flex 
        alignItems='center' 
        justifyItems='center'
        p={3}
        background={cardBackground}
        rounded={7}
        overflow='auto'>
            <Heading size='sm' width='40%'  >
				Select Panel:
			</Heading>
            <Select placeholder="Panel 1" shadow='base'>
                <option value="option1">Panel 2</option>
                <option value="option2">Panel 3</option>
                <option value="option3">Panel 4</option>
                <option value="option3">Panel 5</option>
            </Select>
        </Flex>
    )
}

export default Panel
