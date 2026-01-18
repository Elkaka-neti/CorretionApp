import { checkCaps, checkLength, checkSubjetive } from "./tierIRules";
import type { Correction } from "../../types";

export const runTier1 = (sentence: string, globalOffset: number): Correction[] => {
  const rules = [checkCaps, checkLength, checkSubjetive];
  
  return rules.flatMap(rule => rule(sentence, globalOffset));
};