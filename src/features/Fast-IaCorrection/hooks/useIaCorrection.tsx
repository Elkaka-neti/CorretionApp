import { useEffect, useState, useMemo, useCallback } from 'react';
import type { Correction, MessageSaida } from '../types';
import AiOrchestrator from '../services/AiOrchestrator';
import { debounce } from 'lodash';

const aiGrammar = AiOrchestrator.getInstance();

export interface EnhancedCorrection extends Correction {
    globalStartIndex: number;
    globalEndIndex: number;
}
    
export const useIaCorrection = () => {

    const [corrections, setCorrections] = useState<EnhancedCorrection[]>([]);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const debounced = useMemo(() => debounce((text: string, pointer: number) => {
        aiGrammar.check(text, pointer)

    }, 1200), [aiGrammar]);


    useEffect(() => {

        const handleMessage = (data: MessageSaida) => {

            if(data.status === "ERRO") {
                setIsProcessing(false);
                console.error("[HOOK] Erro ao receber a mensagem do processador.");
                return;
            }
            if(!data.result) return;


            const paragraphOffset = data.paragraphId;

            const fullTextsErrors = data.result.flatMap(unit => {
                return unit.corrections.map(correction => ({
                    ...correction,
                    globalStartIndex: (paragraphOffset + correction.position.indexStart),
                    globalEndIndex: (paragraphOffset + correction.position.indexEnd)

                }));
            });

            setCorrections(fullTextsErrors);
            setIsProcessing(false);
        };

        aiGrammar.subscribe(handleMessage);

    return () => {
        aiGrammar.unsubscribe(handleMessage);
        debounced.cancel();
    }

    }, [aiGrammar, debounced])
    
    const check = useCallback((text: string, pointer: number) => {
        setIsProcessing(true);
        debounced(text, pointer);

    }, [debounced]);


    return {
      corrections,
      isProcessing,
      check
    };
        

};