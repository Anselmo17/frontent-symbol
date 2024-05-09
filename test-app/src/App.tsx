import { Center, CircularProgress, CircularProgressLabel, Container, Grid, GridItem, Text } from '@chakra-ui/react'
import './App.css'
import SearchData from './components/search/search'
import TableData from './components/tableData/tableData'
import { SybomlsContext, SymbolsProvider } from './context/SymbolsContext';
import React, { useContext } from "react";

function App() {

  const { symbols } = useContext(SybomlsContext);

  if (!symbols.length) {
    return <Center bg='white' h='300px' color='white' padding={10} mt={70} display={'flex'} alignItems={'center'} flexDirection={'column'}>
      <CircularProgress textAlign={'center'} isIndeterminate value={40} color='blue.400' size='220px'>
        <CircularProgressLabel></CircularProgressLabel>
      </CircularProgress>
      <Text textAlign={'center'} mt={'2'} fontSize={32} color={'blue'}>Carregando os dados...</Text>
    </Center>
  }

  return (
    <SymbolsProvider>
      <Container maxW='2000px'>
        <Grid
          h='100vh'
          width='100%'
          templateRows='repeat(1, 1fr)'
          gap={4}
          padding={10}
        >
          <GridItem border='3px solid rgb(209, 209, 209)' borderRadius={10} colStart={1} colEnd={1}>
            <SearchData />
          </GridItem>
          <GridItem border='3px solid rgb(209, 209, 209)' borderRadius={10} colStart={2} colEnd={6} padding={10}>
            <TableData />
          </GridItem>
        </Grid>
      </Container>
    </SymbolsProvider>
  )
}

export default App;
