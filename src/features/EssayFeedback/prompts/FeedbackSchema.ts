import { Type } from '@google/genai';

export const feedbackSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        type: {
          type: Type.STRING,
          enum: ['Estrutura', 'Clareza', 'Gramatica', 'Citacoes', 'Conectivos', 'Geral'],
          description: "The category of the feedback."
        },
        message: {
          type: Type.STRING,
          description: "A description of the issue found in the essay. In Brazilian Portuguese."
        },
        suggestion: {
            type: Type.STRING,
            description: "A concrete suggestion for improvement. In Brazilian Portuguese."
        }
      },
      required: ["type", "message"]
    }
};