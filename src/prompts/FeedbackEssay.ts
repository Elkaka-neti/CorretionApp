export function feedbackEssayPrompt(essayText: string, topic: string) {
const prompt = `
        As an expert and rigorous ENEM exam evaluator, analyze the following essay on the topic "${topic}".
        Your goal is to provide real-time, constructive feedback and a score based on the 5 INEP competencies, even for incomplete essays, to guide the user as they write. Be rigorous, point out any errors you find, and only give good grades to truly flawless essays.
        
        Your analysis must cover:
        1.  Feedback: Provide specific, actionable feedback on Structure, Connectives, Clarity, Grammar, and Citations. If the essay is just starting, focus on initial structural and grammatical points.
        2.  Scoring: Provide a score from 0-200 for each of the 5 INEP competencies and a total score from 0-1000. Be prepared to assign low scores for very short or underdeveloped essays, but always provide a score.
            - Competency I: Mastery of formal written language.
            - Competency II: Understanding the theme and using knowledge from different areas.
            - Competency III: Coherent argumentation.
            - Competency IV: Use of cohesive mechanisms.
            - Competency V: Intervention proposal respecting human rights.
        
        Your response MUST be a single, valid JSON object conforming to the provided schema, containing 'scores' and 'feedback' keys. Always return a complete score object and at least one feedback item if the essay has more than a few words. Your answer must be in Brazilian Portuguese.

        Essay:
        ---
        ${essayText}
        ---`

        return prompt;
}