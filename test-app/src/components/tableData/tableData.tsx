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
import { SybomlsContext } from '../../context/SymbolsContext';
import React, { useContext } from 'react';


const TableData = () => {

    const { symbols, symbolsChecked, symbolsCurrent, filterData } = useContext(SybomlsContext);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let listCurrentTable: any = [];
    let symbolsCheckedCurrent = [];
    symbolsCheckedCurrent = symbolsChecked.filter(item => item.checked === true);

    if (symbolsCheckedCurrent.length) {
        listCurrentTable = symbolsCheckedCurrent;
    } else {
        listCurrentTable = symbolsCurrent.length > 0 ? symbolsCurrent : symbols
    }


    function filterSymbol(e) {
        filterData(e.target.value);
    }

    return (
        <>
            <Flex align="center" justify="center" mb={6}>
                <Select placeholder='TODOS' onChange={filterSymbol}>
                    {
                        symbols.map((item, index) => (
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
                        {listCurrentTable.map((item) => (
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
                        listCurrentTable.length === 0 ?
                            <TableCaption fontSize={25} color={'tomato'}>Nenhum item encontrado</TableCaption> : ''
                    }
                </Table>
            </TableContainer>

        </>
    )
}

export default TableData;