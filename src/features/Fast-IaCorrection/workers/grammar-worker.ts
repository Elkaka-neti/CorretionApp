
import type {  AnalyseUnit, MessageEntrada, MessageSaida, Correction } from "../types";
import { runTier1 } from "./tierI";
import { runTier2 } from "./tierII/tierIIRules";

const tierIIBuffer = new Map<string, Correction[]>();

self.onmessage = (event: MessageEvent<MessageEntrada>) => {
  const message = event.data;

  if (message.type === "CHECK_TEXT") {
    // 1. Criamos a correção (o erro individual)
    const results = message.payload.sentences.map((sentence) => {

      const t1 = runTier1(sentence.text, sentence.range.indexStart);


      const t2Cache = tierIIBuffer.get(sentence.id) || [];

      if(t2Cache.length > 0) tierIIBuffer.delete(sentence.id);




      runTier2(sentence.text).then((correction) => {
        if(correction.length > 0) tierIIBuffer.set(sentence.id, correction);
      });

      
      return {
        sentenceId: sentence.id,
        corrections: [...t1, ...t2Cache]
      } as AnalyseUnit

    }) 

    

  
    
    // 2. Envolvemos na Unidade de Análise (o contrato que o Orquestrador espera)
   // const mockUnit = {
   //   sentenceId: 'frase-1',
   //   corrections: results
   // };

    // 3. Montamos a resposta final
    console.log(JSON.stringify(results))


    const response: MessageSaida = {
      status: 'SUCESSO',
      // IMPORTANTE: Deve ser o offset enviado pelo Orquestrador para o cálculo global bater
      paragraphId: message.payload.offset, 
      result: results // Array de Unidades
    };

    self.postMessage(response);
  }
};

self.onerror = (error) => {
  console.log("[WORKER] O processo foi parado por forças maiores:")
  console.error(error);
}