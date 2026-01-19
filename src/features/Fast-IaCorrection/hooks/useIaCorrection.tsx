import { useEffect, useState, useMemo, useCallback } from 'react';
import type { Correction, MessageSaida } from '../types';
import AiOrchestrator from '../services/AiOrchestrator';
import { debounce } from 'lodash';
import type { EnhancedCorrection } from '../types';

const aiGrammar = AiOrchestrator.getInstance();


    
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

            const lastUnit = data.result[data.result.length - 1];
            const endLimit = paragraphOffset + lastUnit.corrections[0].original.length;




            setCorrections(prev => {

                const filtrado = prev.filter(c => {
                    c.globalStartIndex < paragraphOffset || c.globalStartIndex >= endLimit
                });

                return [...filtrado, ...fullTextsErrors]
            });
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