import {GoogleGenAI} from '@google/genai';
const gemApiKey = import.meta.env.VITE_API_KEY;

const ia = new GoogleGenAI({
    apiKey: gemApiKey
});
//const textModel = 'gemini-2.5-flash';

//const textGenerationConfig = {
   // tools: [{ googleSearch: {} }],
//};

const iaModel = ia.models;

export default iaModel;

