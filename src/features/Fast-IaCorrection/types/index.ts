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
    payload: string
}

export type MessageSaida = MessageSucesso | MessageError


export interface IaStatus {
    isProcessing: boolean,
    error: string | null,
    corrections: Correction[]
    
}


interface MessageSucesso {
    readonly status: 'SUCESSO',
    result: Correction[]
}

interface MessageError {
    readonly status: 'ERRO',
    message: string
}