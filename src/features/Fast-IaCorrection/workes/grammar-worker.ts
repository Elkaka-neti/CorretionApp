import type { MessageEntrada, MessageSaida, Correction } from "../types";

self.onmessage = (event: MessageEvent<MessageEntrada>) => {

    const message = event.data;

    if(message.type == "CHECK_TEXT") {

        const mockCorrect: Correction = {
            id: 'uuid',
            position: {indexStart:0, indexEnd:7},
            category: 'style',
            original: message.payload.substring(0,7),
            suggestion: 'Testando meu worker',
            metadata: 'Testando aqui pra ver'
        };


        const response: MessageSaida = {
             status: 'SUCESSO',
             result: [mockCorrect]
        }


        self.postMessage(response)
    }

}