export interface Correction {
    readonly id: string,
    readonly position: {indexStart: number, indexEnd: number},
    readonly category: 'grammar' | 'punctuation' | 'cohesion' | 'style',
    readonly suggestion: string,
    readonly metadata: string,
    readonly original: string
}

export interface MessageEntrada {
    type: 'CHECK_TEXT' | 'OUTHERS..',
    payload: {
        sentences: Sentence[];
        offset: number;
    }
}

export type MessageSaida = MessageSucesso | MessageError


export interface IaStatus {
    isProcessing: boolean,
    error: string | null,
    corrections: Correction[]
    
}

export interface AnalyseUnit {
    sentenceId: string;
    corrections: Correction[];
}

interface MessageSucesso {
    readonly status: 'SUCESSO';
    readonly paragraphId: number;
    result: AnalyseUnit[];
}

interface MessageError {
    readonly status: 'ERRO',
    message: string
}



export interface ParagraphContext {
    text: string;
    offset: number;
    length: number;
    relativeCursor: number;
}


export interface Sentence {
    readonly id: string;
    text: string;
    range: { indexStart: number;
    indexEnd: number;
    };
    modified?: boolean
}

export interface EnhancedCorrection extends Correction {
    globalStartIndex: number;
    globalEndIndex: number;
}