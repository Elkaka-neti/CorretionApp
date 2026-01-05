import { useEffect, useState } from 'react';
import type { Correction, MessageSaida } from '../types';
import AiOrchestrator from '../services/AiOrchestrator';

const aiGrammar = AiOrchestrator.getInstance();
    
export const useIaCorrection = () => {

      const [corrections, setCorrections] = useState<Correction[]>([]);
      const [isProcessing, setIsProcessing] = useState<boolean>(false);


    
    useEffect(() => {

        const handleResult = (data: MessageSaida) => {
            if(data.status === 'SUCESSO') {
                setCorrections(data.result);
                setIsProcessing(false);
            }else{
                console.error('[HOOK] Erro no hook para dar a resposta')
            }
        }
       
        aiGrammar.subscribe(handleResult);

        return () => aiGrammar.unsubscribe(handleResult);
    }, []);

     
    const checkText = (text: string) => {
        setIsProcessing(true);
        aiGrammar.check(text);
    };

    return {corrections, isProcessing, checkText}
}