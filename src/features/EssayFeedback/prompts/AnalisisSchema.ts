import { Type } from '@google/genai';
import { scoreSchema } from './ScoreSchema';
import { feedbackSchema } from './FeedbackSchema';

export const analysisSchema = {
    type: Type.OBJECT,
    properties: {
        scores: scoreSchema,
        feedback: feedbackSchema
    },
    required: ["scores", "feedback"]
};