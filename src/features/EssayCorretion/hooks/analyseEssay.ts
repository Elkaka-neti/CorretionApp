import {useCallback} from 'react';
import {useEssay} from '@/features/EssayCorretion/contexts/EssayContext';
import {giveEssayFeedback} from '@/features/EssayCorretion/services/GiveEssayFeedback'
import { useGlobalContext } from '@/contexts/GlobalContext';
// Vamos supor o que vai acontecer aqui:
// Esse hook terá uma função dentro dele, podera ser o  useAnalyseEssay
// esse hook irá pegar uma função — um Context — que vira de outro arquivo
// Esse outro arquivo terá esse context que cuidará apenas de avisar se a Redação, o 'Essay' está sendo analisado no momento
// Terá também outro context que tera uma data, a que a nossa IA irá retornar, mas que será cuidado em outro arquivo, em /services
// Ele irá apenas fazer um sistema de debounce, garantindo que a api não sobrecarregue
// @nota setIsAnalysing é o Context que avisa se está analisando ou não
// @nota setEssayAnalysisData é o Context que guarda os dados retornados da análise

// Vamos fazer:

interface useAnalyseEssayInterface {
    handleAnalyseEssay: (text: string) => Promise<void>;
}

export const useAnalyseEssay = (): useAnalyseEssayInterface => {

    // primeiro vamos pegar os contextos de dentro do nosso context hook, supomos que é useEssay() 
    const { setIsAnalysing, setEssayAnalysisData } = useEssay(); 
    // @nota: useEssay é um hook que já existe e já é importado como useContext(EssayContext)
    const { topic } = useGlobalContext();
    // Agora a função principal, a handleAnalyseEssay
    const handleAnalyseEssay = useCallback(async (text: string) => {
   
    if(text.trim().length < 15) return;
    
     setIsAnalysing(true);
     try {
        // Agora vamos chamar a função que está em /services
        const analyseData = await giveEssayFeedback(text, topic);
        setEssayAnalysisData(analyseData);
     }catch(err) {
        console.error('Erro ao analisar a redação');
     } finally {
        setIsAnalysing(false);
     }
    }, [setIsAnalysing, setEssayAnalysisData])

    return { handleAnalyseEssay };
};
