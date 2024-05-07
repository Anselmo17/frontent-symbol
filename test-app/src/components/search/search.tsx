import {
    Checkbox,
    Container,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
} from '@chakra-ui/react';


import { SearchIcon } from '@chakra-ui/icons';



const SearchData = ({ listSearch }) => {

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

            <Stack spacing={[1, 5]} direction={'column'} marginTop={2} padding={5}>
                <Checkbox size='lg' key='header' colorScheme='green' backgroundColor={'rgb(209, 209, 209)'} padding={2}>
                    Symbol
                </Checkbox>
                {
                    listSearch.length > 0 ? listSearch.map((item) => (
                        <Checkbox size='md'  colorScheme='green' key={item.symbol}>
                            {item.symbol}
                        </Checkbox>
                    )) : ''
                }
            </Stack>
        </Container>
    )
}

export default SearchData;