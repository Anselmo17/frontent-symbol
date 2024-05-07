/* eslint-disable @typescript-eslint/no-unused-vars */
import { AddIcon } from '@chakra-ui/icons';
import {
    Badge,
    Button,
    Flex,
    Select,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Center
} from '@chakra-ui/react';

//import { useState } from 'react';

// interface Simbols {
//     simbol: string;
//     last: string;
//     ask: string;
//     bid: string;
//     porcent: string;
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TableData = ({ listData, listCurrent, filterData }) => {

    function filterSymbol(e) {
        filterData(e.target.value);
    }

    return (
        <>
            <Flex align="center" justify="center" mb={6}>
                <Select placeholder='Select Symbol' onChange={filterSymbol}>
                    {
                        listData.map((item, index) => (
                            <option key={item.symbol + index} value={item.symbol}>{item.symbol}</option>
                        ))}
                </Select>
                <Button colorScheme='teal' ml={2}>
                    <AddIcon color='white.500' />
                </Button>
            </Flex>

            <TableContainer rounded='md' bg='white'>
                <Table colorScheme='teal'>
                    <Thead>
                        <Tr backgroundColor={'rgb(209, 209, 209)'} padding={10}>
                            <Th>Symbol</Th>
                            <Th>Last Price</Th>
                            <Th>Bid Price</Th>
                            <Th>
                                <Center>Ask Price</Center>
                            </Th>
                            <Th>
                                <Center> Price Change(%)</Center>
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {listCurrent.map((item) => (
                            <Tr key={item.symbol}>
                                <Td>{item.symbol}</Td>
                                <Td>{item.filters.find((item) => item.filterType === 'PRICE_FILTER').maxPrice}</Td>
                                <Td>{item.filters.find((item) => item.filterType === 'PRICE_FILTER').minPrice}</Td>
                                <Td>
                                    <Center>
                                        {item.filters.find((item) => item.filterType === 'PERCENT_PRICE_BY_SIDE').askMultiplierUp}
                                    </Center>
                                </Td>
                                <Td alignItems='center'>
                                    <Center>
                                        <Badge colorScheme='green' padding={2} border={10} borderRadius={5}>
                                            {item.filters.find((item) => item.filterType === 'PERCENT_PRICE_BY_SIDE').bidMultiplierUp + '%'}
                                        </Badge>
                                    </Center>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                    {
                        listCurrent.length === 0 ?
                            <TableCaption fontSize={25} color={'tomato'}>Nenhum item encontrado</TableCaption> : ''
                    }
                </Table>
            </TableContainer>

        </>
    )
}

export default TableData;