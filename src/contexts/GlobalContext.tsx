import React, { createContext, useState, useContext } from 'react';

const GlobalContext = createContext<any>(null);

export const GlobalContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [topic, setTopic] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [texts, setTexts] = useState<string[]>([]);

    return (
        <GlobalContext.Provider value={{ topic, setTopic, page, setPage, texts, setTexts }}> 
         {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if(!context) {
        throw new Error('useGlobalContext deve ser usado dentro de um GlobalContextProvider');
    }
    return context;
}