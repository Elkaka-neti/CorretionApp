import { Type } from '@google/genai';

export const scoreSchema = {
    type: Type.OBJECT,
    properties: {
        competency1: { type: Type.NUMBER, description: "Score for Competency I (0-200), formal written standard. " },
        competency2: { type: Type.NUMBER, description: "Score for Competency II (0-200), understand the theme and text structure (If there is an introduction, development, and conclusion. )." },
        competency3: { type: Type.NUMBER, description: "Score for Competency III (0-200), argumentation and point of view. Check if a thesis is being defended." },
        competency4: { type: Type.NUMBER, description: "Score for Competency IV (0-200), linguistic mechanisms for argumentation." },
        competency5: { type: Type.NUMBER, description: "Score for Competency V (0-200), intervention proposal. Check if there is a conclusion and if the proposed intervention does not violate human rights. " },
        total: { type: Type.NUMBER, description: "Total score (sum of competencies, 0-1000)." },
    },
    required: ["competency1", "competency2", "competency3", "competency4", "competency5", "total"]
};