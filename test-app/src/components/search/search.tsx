import {
    Button,
    Checkbox,
    Container,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
} from '@chakra-ui/react';


import { SearchIcon } from '@chakra-ui/icons';
import { SybomlsContext } from '../../context/SymbolsContext';
import React, { useContext } from "react";


const SearchData = () => {
    const { symbols, listCheck } = useContext(SybomlsContext);

    let listCheckOrigin = symbols.map((item) => ({ ...item, checked: false }));

    function handleChange(e) {
        listCheckOrigin = listCheckOrigin.map((item) =>
        ({
            ...item,
            checked: item.symbol === e.target.name ? e.target.checked : item.checked,
        }));
    }

    function searchItens(){

        listCheck(listCheckOrigin) 
    }

    if(!symbols){
        return <div>Carregando....</div>
    }

    return (
        <Container padding={10}>
            <Stack spacing={4}>
                <InputGroup>
                    <Input placeholder='Search' />
                    <InputRightElement>
                        <SearchIcon color='grey.500' />
                    </InputRightElement>
                </InputGroup>
            </Stack>

            <Stack spacing={4} mt={4}>
                <Button colorScheme='blue' onClick={searchItens}>Buscar Itens Selecionados</Button>
            </Stack>

            <Stack spacing={[1, 5]} direction={'column'} padding={5}>
                <Checkbox size='lg' key='header' colorScheme='green' backgroundColor={'rgb(209, 209, 209)'} padding={2}>
                    Symbol
                </Checkbox>
                {
                    listCheckOrigin.length > 0 ? listCheckOrigin.map((item) => (
                        <Checkbox
                            size='md'
                            colorScheme='green'
                            key={item.symbol}
                            name={item.symbol}
                            checked={item.checked}
                            onChange={handleChange}>
                            {item.symbol}
                        </Checkbox>
                    )) : ''
                }
            </Stack>
        </Container>
    )
}

export default SearchData;