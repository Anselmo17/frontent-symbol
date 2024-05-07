/* eslint-disable @typescript-eslint/no-explicit-any */
import { Center, CircularProgress, CircularProgressLabel, Container, Grid, GridItem, Text } from '@chakra-ui/react'
import './App.css'
import SearchData from './components/search/search'
import TableData from './components/tableData/tableData'
import { useEffect, useState } from 'react';


function App() {

  const [data, setData] = useState([]);
  const [dataCurrent, setDataCurrent] = useState([]);

  // 3. Definir o hook useEffect para buscar os dados da API
  useEffect(() => {
    fetch("https://api.binance.com/api/v3/exchangeInfo")
      .then(response => response.json())
      // 4. Atualizar o estado com os dados recebidos
      .then((data) => {
        const listPartial: any = data.symbols.slice(0, 20);
        setData(listPartial)
      })
      .catch((err) => console.log('----- Houve um erro ------', err));
  }, []);

  if (!data.length) {
    return <Center bg='white' h='300px' color='white' padding={10} mt={70} display={'flex'} alignItems={'center'} flexDirection={'column'}>
              <CircularProgress  textAlign={'center'} isIndeterminate value={40} color='blue.400' size='220px'>
                <CircularProgressLabel></CircularProgressLabel>
              </CircularProgress>
              <Text textAlign={'center'} mt={'2'} fontSize={32} color={'blue'}>Carregando os dados...</Text>
          </Center>
  }



  function filterData(value: string) {
    const filtered = data.filter((item: any) => item.symbol === value);
    setDataCurrent(filtered);
  }


  return (
    <Container maxW='2000px'>
      <Grid
        h='100vh'
        width='100%'
        templateRows='repeat(1, 1fr)'
        gap={4}
        padding={10}
      >
        <GridItem border='3px solid rgb(209, 209, 209)' borderRadius={10} colStart={1} colEnd={1}>
          <SearchData listSearch={data} />
        </GridItem>
        <GridItem border='3px solid rgb(209, 209, 209)' borderRadius={10} colStart={2} colEnd={6} padding={10}>
          <TableData listData={data} listCurrent={dataCurrent.length > 0 ? dataCurrent : data} filterData={filterData} />
        </GridItem>
      </Grid>
    </Container>
  )
}

export default App;
