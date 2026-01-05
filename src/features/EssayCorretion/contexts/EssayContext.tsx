import React, {createContext, useContext, useState, useMemo} from 'react';
import {type EssayContextProps} from '@/features/EssayCorretion/types';

const EssayContext = createContext<EssayContextProps>({
    isAnalysing: false,
    setIsAnalysing: () => {},
    essayAnalysisData: null,
    setEssayAnalysisData: () => {},
});

const EssayProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [isAnalysing, setIsAnalysing] = useState<boolean>(false);
    const [essayAnalysisData, setEssayAnalysisData] = useState<any>(null);
    

    const value = useMemo(() => ({
        isAnalysing,
        setIsAnalysing,
        essayAnalysisData,
        setEssayAnalysisData
    }), [isAnalysing, essayAnalysisData])

    return (
        <EssayContext.Provider value={value}>
            {children}
        </EssayContext.Provider>
    )
}

export const useEssay = () => {
    const context = useContext(EssayContext);
    if(!context) {
        throw new Error('useEssay deve ser usado dentro de um EssayProvider');
    }
    return context;
}

export default EssayProvider;