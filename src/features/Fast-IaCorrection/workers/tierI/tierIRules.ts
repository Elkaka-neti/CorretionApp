
import type { Correction } from "../../types";
import { oralTerms } from "./tierITrigger.terms";

export const checkCaps = (sentence: string, globalOffset: number): Correction[] => {

    const trimText = sentence.trimStart();
    const firstCharIndex = sentence.indexOf(trimText[0]);


    if(trimText.length > 0 && !/^[A-Z]|[0-9]/.test(trimText[0])) {

        const start = globalOffset + firstCharIndex;
        const end = start + 1;


        return [{
            id: createId(sentence),
            position: {indexStart: start, indexEnd: end},
            category: 'grammar',
            original: sentence.substring(firstCharIndex, firstCharIndex + 1),
            suggestion: `Altere por '${trimText[0].toUpperCase()}' (MAIÚSCULO)`,
            metadata: "Sempre inicie frases com letras maiúsculas."
        }]
    }
   return [];
}


export const checkLength = (sentence: string, globalOffSet: number): Correction[] => {
    const separateWords = sentence.trim().split(/\s+/);

    if(separateWords.length > 25) {
        return [{
            id: 'uuid-' + globalOffSet,
            position: { indexStart: globalOffSet, indexEnd: globalOffSet + sentence.length},
            category: 'cohesion',
            original: sentence,
            suggestion: "Considere dividir essa sentença em duas ou mais.",
            metadata: "Dica: Sentenças muito longas faculitam a aparição de erros e dificultam a compreensão"
        }]
    }
    return [];
}


export const checkSubjetive = (sentence: string, globalOffSet: number): Correction[] => {

    const corrections: Correction[] = [];
    oralTerms.forEach(term => {
        const regTest = new RegExp(`\\b${term}\\b`, 'gi');
        let match;

        while((match = regTest.exec(sentence)) !== null) {
            corrections.push({
                id: createId(sentence),
                position: {
                    indexStart: globalOffSet + match.index, 
                    indexEnd: globalOffSet + match.index + term.length
                },
                category: 'grammar',
                original: match[0],
                suggestion: "Utilize normas impessoais, termos subjetivos podem ser encarados como informalidade.",
                metadata: "Dica: Subjetividade/Aleatoriedade diminuem seus pontos na prova."

            })

        }
    })

    return corrections;

}

const createId = (sentence: string) => {
    return sentence.toLowerCase()
                   .trim()
                   .normalize("NFD")
                   .replace(/[\u0300-\u036f]/g, "")
                   .replace(/[^a-z0-9\s]/g, "")
                   .replace(/\s+/g, "-")
}


