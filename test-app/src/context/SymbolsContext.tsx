import React, { createContext, useState, ReactNode, useEffect } from 'react';

// Definindo o tipo para o estado do usuário
interface Symbols {
    symbol: string;
    filters:[];
}

// Definindo o tipo para o contexto
export interface SymbolsContextType {
    symbols: Array<Symbols>;
    setSymbols: React.Dispatch<React.SetStateAction<Array<Symbols>>>;
    symbolsCurrent:Array<Symbols>;
    setSymbolsCurrent: React.Dispatch<React.SetStateAction<Array<Symbols>>>;
    symbolsChecked:Array<Symbols>;
    setSymbolsChecked:  React.Dispatch<React.SetStateAction<Array<Symbols>>>;
}

// Criando o contexto com um valor padrão
export const SybomlsContext = createContext<SymbolsContextType | undefined>(undefined);

// Definindo o tipo para o provedor do contexto
interface SymbolsProviderProps {
    children: ReactNode;
}

// Implementando o provedor do contexto
export const SymbolsProvider: React.FC<SymbolsProviderProps> = ({ children }) => {

    //variables
    const [symbols, setSymbols] = useState([]);
    const [symbolsCurrent, setSymbolsCurrent] = useState([]);
    const [symbolsChecked, setSymbolsChecked] = useState([]);


    
  function filterData(value: string) {
    const filtered = symbols.filter((item:Symbols) => item.symbol === value);
    setSymbolsCurrent(filtered);
  }


  function listCheck(checkeds) {

    const itemSelected = checkeds.filter(item => item.checked === true);
    if(itemSelected.length){
        setSymbolsChecked(itemSelected);
        return;
    }
    setSymbolsChecked(checkeds);
  }


    useEffect(() => {
        fetch("https://api.binance.com/api/v3/exchangeInfo")
          .then(response => response.json())
          // 4. Atualizar o estado com os dados recebidos
          .then((data) => {
            const listPartial = data.symbols.slice(0, 20);
            setSymbols(listPartial)
          })
          .catch((err) => console.log('----- Houve um erro ------', err));
      }, []);


    return (
        <SybomlsContext.Provider value={{ symbols, setSymbols, symbolsCurrent, filterData, symbolsChecked, listCheck }}>
            {children}
        </SybomlsContext.Provider>
    );
};