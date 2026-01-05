
import type { MessageEntrada, MessageSaida } from "../types";
type Listener = (data: MessageSaida) => void;


class AiOrchestrator {

    private static instance: AiOrchestrator | null = null;
    private worker: Worker | null = null;

    private listeners: Listener[] = [];

    
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

    public check(text: string) {

       if(!this.worker) {
        try {
          this.initialize()
          console.log("[WORKER] Iniciando o worker novamente.")
        }catch{
          console.warn("[WORKER] Falha ao iniciar o worker.")
        }
       }

       const message: MessageEntrada = {
        type: 'CHECK_TEXT',
        payload: text
       };

       this.worker?.postMessage(message);

    }

    private onMessage(event: MessageEvent<MessageSaida>) {
       
        const result = event.data;

        this.listeners.forEach(listener => {
         listener(result)
       })
       
    }

    public subscribe(fun: Listener) {
       this.listeners.push(fun)
    }

    public unsubscribe(fun: Listener) {
        this.listeners.filter(listener => listener !== fun);
    }

}


export default AiOrchestrator;