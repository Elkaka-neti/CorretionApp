
import type { Correction, MessageEntrada, MessageSaida } from "../types";

self.onmessage = (event: MessageEvent<MessageEntrada>) => {
  const message = event.data;

  if (message.type === "CHECK_TEXT") {
    // 1. Criamos a correção (o erro individual)
    const mockCorrect: Correction = {
      id: 'uuid-123',
      position: { indexStart: 8, indexEnd: 13 }, // Sublinha os primeiros 7 caracteres
      category: 'style',
      original: message.payload.sentences[0].text.substring(8,13) || 'error',
      suggestion: 'Testando meu worker',
      metadata: 'Dica: Isso é um mock para validar a UI'
    };

    // 2. Envolvemos na Unidade de Análise (o contrato que o Orquestrador espera)
    const mockUnit = {
      sentenceId: 'frase-1',
      corrections: [mockCorrect]
    };

    // 3. Montamos a resposta final
    const response: MessageSaida = {
      status: 'SUCESSO',
      // IMPORTANTE: Deve ser o offset enviado pelo Orquestrador para o cálculo global bater
      paragraphId: message.payload.offset, 
      result: [mockUnit] // Array de Unidades
    };

    self.postMessage(response);
  }
};
