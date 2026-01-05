import iaModel from "@/services/AiModel";
import { guidingTextsPrompt } from "@/prompts/GuidingTextsPrompt";


export async function generateNorthTexts(topic: string): Promise<any> {
       
       const prompts = guidingTextsPrompt(topic);

       const textGenerationConfig = {
    tools: [{ googleSearch: {} }],
};

       const promises = prompts.map(prompt => 
        iaModel.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: textGenerationConfig
        })
    );

    const responses = await Promise.all(promises);

    return responses.map((response, index) => {
        try {
            // FIX: Improved JSON parsing to be more robust by extracting it from markdown code blocks or finding the object boundaries.
            const fullText = response.text as string;
            let jsonText = fullText;

            const jsonRegex = /```json\s*([\s\S]*?)\s*```/;
            const match = fullText.match(jsonRegex);

            if (match && match[1]) {
                jsonText = match[1];
            } else {
                const startIndex = fullText.indexOf('{');
                const endIndex = fullText.lastIndexOf('}');
                if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
                    jsonText = fullText.substring(startIndex, endIndex + 1);
                }
            }

            const parsed = JSON.parse(jsonText.trim()) as {title: string, source: string, content: any};
            const defaultTitles = ["News Article", "Statistical Data", "Constitutional Text"];

            let finalContent = 'Conteúdo não encontrado';
            if (parsed.content) {
                if (typeof parsed.content === 'object' && parsed.content.excerpt && parsed.content.annotation) {
                    finalContent = `Excerpt: "${parsed.content.excerpt}"\n\nAnnotation: ${parsed.content.annotation}`;
                } else if (typeof parsed.content === 'string') {
                    finalContent = parsed.content;
                } else {
                    finalContent = String(parsed.content);
                }
            }

            return {
                title: parsed.title || defaultTitles[index],
                source: parsed.source || 'Fonte não encontrada',
                content: finalContent
            };
        } catch (e) {
            console.error("Failed to parse guiding text JSON:", response.text, e);
            const defaultTitles = ["News Article", "Statistical Data", "Constitutional Text"];
            return {
                title: defaultTitles[index],
                source: "Erro ao encontrar a origem",
                content: "Não foi possível gerar conteúdo para esta seção. A resposta do modelo não estava no formato esperado.."
            };
        }
    });
};