import type { EnhancedCorrection } from "@/features/Fast-IaCorrection/types";

export interface Score {
    competency1: number;
    competency2: number;
    competency3: number;
    competency4: number;
    competency5: number;
    total: number;
}


export interface FeedbackItem {
    type: 'Estrutura' | 'Clareza' | 'Gramatica' | 'Citacoes' | 'Conectivos' | 'Geral';
    message: string;
    suggestion?: string;
}


export interface FeedbackProps {
 corrections: EnhancedCorrection[];
 onSelect: (id: string) => void;
 isAnalysing: boolean;
}
