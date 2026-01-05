import iaModel from "@/services/AiModel";
import { feedbackEssayPrompt } from "@/prompts/FeedbackEssay";
import { analysisSchema } from "@/features/EssayFeedback/prompts/AnalisisSchema";

export async function giveEssayFeedback(text: string, tema: string): Promise<any> {
    
    const feedbackGenerationConfig = {
    responseMimeType: "application/json",
    responseSchema: analysisSchema
};

    const response = await iaModel.generateContent({
        model: 'gemini-2.5-flash',
        contents: feedbackEssayPrompt(text, tema),
        config: feedbackGenerationConfig
    });

    try {

        const jsonText = response.text?.trim();
        if(!jsonText) throw new Error("Não houve resposta da IA");

        return JSON.parse(jsonText) as any;

    }catch( error ) {
        console.error("Falha ao analisar o JSON de análise:", response.text, error);
        return {
            scores: { competency1: 0, competency2: 0, competency3: 0, competency4: 0, competency5: 0, total: 0 },
            feedback: [{
                type: 'Geral',
                message: 'Não foi possível obter feedback estruturado da IA. A resposta não estava no formato esperado.',
            }]
        };
    }
    
}
