export function guidingTextsPrompt(topic: string): string[] {
const prompts = [
        `Find a recent news article about "${topic}". Summarize it concisely, focusing on the main points and arguments. Provide the source URL. Format the output as a JSON object with keys "title", "source", and "content".`,
        `Find statistical data from IBGE (Brazilian Institute of Geography and Statistics) or a similar reputable source related to "${topic}" in Brazil. Summarize the key findings. Provide the source. Format the output as a JSON object with keys "title", "source", and "content".`,
        `Find a relevant excerpt from the Brazilian Constitution that relates to "${topic}". Provide an annotation explaining its significance. Provide the source. Format the output as a JSON object with keys "title", "source", and "content".`
];
 
 return prompts;
}