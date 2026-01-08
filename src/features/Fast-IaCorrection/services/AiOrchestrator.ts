
import type { MessageEntrada, AnalyseUnit, MessageSaida, ParagraphContext, Sentence, Correction } from "../types";
//type Listener = (data: MessageSaida) => void;
import { TextProcessor } from "./TextProcessor";

class AiOrchestrator {

    private static instance: AiOrchestrator | null = null;
    private worker: Worker | null = null;
    private cache = new Map<string, Correction[]>();
    //private listeners: Listener[] = [];

    
    private constructor () {
        this.initialize();
        
    }

    public static getInstance(): AiOrchestrator {

       if(!AiOrchestrator.instance) {
        AiOrchestrator.instance = new AiOrchestrator();
       }

       return AiOrchestrator.instance;

    }

    private initialize() {
        console.log("Instância de Orquestrador iniciada.\nWorker pronto!");
        if(this.worker) return;
        
        try {

        this.worker = new Worker(
            new URL("../workers/grammar-worker.ts", import.meta.url),
            { type: 'module' }
        );

        this.worker.onmessage = (event) => this.onMessage(event);

        }catch(error) {
            console.error('Falha ao iniciar a IA.')
        }
    }

    public check(text: string, indice: number) {

       if(!this.worker) {
        try {
          this.initialize()
          console.log("[WORKER] Iniciando o worker novamente.")
        }catch{
          console.warn("[WORKER] Falha ao iniciar o worker.")
        }
       }

       const paragraph = TextProcessor.textExtraction(text, indice);
       const textTokens = TextProcessor.tokenization(paragraph);

       let toProcess: Sentence[] = [];
       let resultsInCache: AnalyseUnit[] = [];

       textTokens.forEach((token) => {
        const cached = this.cache.get(token.id);

       if(cached) {
          resultsInCache.push({
            sentenceId: token.id,
            corrections: cached
          });

       } else toProcess.push(token);
       })


       if(toProcess.length === 0) {

        this.notifySubscribers({status: 'SUCESSO', paragraphId: paragraph.offset, result: resultsInCache});
        return;

       }else{

        const message: MessageEntrada = {
        type: 'CHECK_TEXT',
        payload: {
            sentences: toProcess,
            offset: paragraph.offset
        }

       };

       this.worker?.postMessage(message);

       }
       
    }

    private onMessage(event: MessageEvent<MessageSaida>) {
       
        const data = event.data as MessageSaida;
        
        if(data.status === "SUCESSO") {
          
          data.result.forEach((item: AnalyseUnit) => {

          this.cache.set(item.sentenceId, item.corrections)

          })


          this.notifySubscribers(data);

        }else if(data.status === "ERRO") {
          
          console.error("[WORKER] Falha ao processar o pedido", data.message)
        }
        //this.listeners.forEach(listener => {
        // listener(result)
       
       
    }



    public subscribe(callback: (data: MessageSaida) => void) {
  this.subscribers.push(callback);
}

    public unsubscribe(callback: (data: MessageSaida) => void) {
  this.subscribers = this.subscribers.filter(sub => sub !== callback);
}

    private notifySubscribers(data: MessageSaida) {
  this.subscribers.forEach(callback => callback(data));
}


    private subscribers: ((data: MessageSaida) => void)[] = [];

}


export default AiOrchestrator;
