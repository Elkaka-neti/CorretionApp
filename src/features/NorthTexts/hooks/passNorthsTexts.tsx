// Vamos criar um hook aqui que vai pegar os textos gerados em /services e vai
// por meio de um useState, passar esses textos e atualizar o componente que mostrará
// os textos norteadores
// na verdade, terá que ter um context
import {useCallback} from 'react';
import { generateNorthTexts } from '../services/generateNorthTexts';
import { useGlobalContext } from '@/contexts/GlobalContext';

export const usePassNorthTexts = () => {


 
    const { setTexts } = useGlobalContext(); 
    const handlePassTexts = useCallback(async(topic: string) => {

     try {
        const texts = await generateNorthTexts(topic);
        setTexts(texts);
     }catch(err) {
        console.error('Erro ao gerar os textos norteadores');
     }
    }, [setTexts])

    return handlePassTexts;
}