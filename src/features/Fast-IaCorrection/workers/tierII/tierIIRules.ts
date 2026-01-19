import { pipeline, env, type Text2TextGenerationPipelineCallback, AutoTokenizer, AutoModelForSeq2SeqLM } from '@xenova/transformers';
import type { Correction } from '../../types';


// Todo: Transferir para um arquivo como tierII.config.ts 
env.allowLocalModels = false;
env.localModelPath = "";
env.backends.onnx.wasm.numThreads = 1;
// Tenta forçar o uso da memória de forma mais conservadora
env.backends.onnx.wasm.proxy = false; 
env.allowRemoteModels = false;

// ===========

let modelInstance: any = null;

const getModel = async() => {
    if(!modelInstance) {
        const model_id = '/model/gec-ptt5-onnx';
        const remoteModel= 'Xenova/mt5-small'
        
        // Carregamos o tokenizer e o modelo separadamente para ter controle total
        const tokenizer = await AutoTokenizer.from_pretrained(remoteModel);
        const model = await AutoModelForSeq2SeqLM.from_pretrained(remoteModel, {
            quantized: false,
            
            config: {
                use_cache: false,
                model_type: 't5'
            }
        });

        (model as any).config.use_cache = false;
    (model as any).config.output_past = false;
    
    if ((model as any).generation_config) {
      (model as any).generation_config.use_cache = false;
    }

        modelInstance = { tokenizer, model };
    }
    return modelInstance;
}


export async function runTier2(sentence: string): Promise<Correction[]> {

  




    try {
        const {tokenizer, model} = await getModel();

        // Todo: Mudar esses dados para ficarem dentro de tierII.config.ts

        console.log("Tentamos até aqui...")
        console.log(await model?.tokenizer);
        const input = await tokenizer(`corrija: ${sentence.trim()}`);
        console.log(input.input_ids.data)
        console.log("Input real:", await tokenizer.decode([3n, 27n, 2487n, 316n, 41n, 638n, 292n, 71n, 1122n, 2649n, 262n, 1697n, 411n, 37n]));
       // No T5 Inglês, IDs baixos são palavras comuns em inglês.
// No PTT5, devem ser palavras em português.
console.log("Token 10:", await tokenizer.decode([10]));
console.log("Token 50:", await tokenizer.decode([50]));
console.log("Token 100:", await tokenizer.decode([100]));


        const outRes = await model.generate(input.input_ids, {
            max_new_tokens: 64,
            min_new_tokens: 2,
            use_cache: false,
            do_sample: false,
            num_beams: 2,
            attention_mask: input.attention_mask,
            //no_repeat_ngram_size:2,
            decoder_start_token_id: 0,
        
            temperature: 0.3,
            repetition_penalty: 1.0
        });

        console.log("Até aqui ele veio...")

        const corrected = tokenizer.decode(outRes[0]);

        console.log(JSON.stringify(outRes))
        console.log(corrected)
        console.log(JSON?.stringify(corrected));

        if(corrected.trim() === sentence.trim()) return [];

        return [{
            id: 'uuid-' + Math.floor(Math.random() * 20),
            position: {indexStart:0, indexEnd: sentence.length},
            category: 'grammar',
            suggestion: corrected,
            original: sentence.trim() || '',
            metadata: 'Dica: Correção produnda'
        }];



    }catch(erro) {
        console.error('[TIER-II] Erro ao analisar a sentença: ' + sentence)
        console.warn(erro)
        return [];
    }
}