// TextProcessor.ts
import type { ParagraphContext, Sentence } from "../types";

export class TextProcessor {

  public static textExtraction(text: string, indice: number): ParagraphContext {
    const startIndice = text.lastIndexOf("\n", indice);
    const startIndex = startIndice === -1 ? 0 : startIndice + 1;

    const finalIndice = text.indexOf("\n", indice);
    const finalIndex = finalIndice === -1 ? text.length : finalIndice;

    return {
      text: text.slice(startIndex, finalIndex),
      offset: startIndex,
      length: finalIndex - startIndex,
      relativeCursor: indice
    };
  }



  public static tokenization(paragraph: ParagraphContext): Sentence[] {
    const text = paragraph.text;
    let cursor = 0;
    let sentences: Sentence[] = [];
    const textsParts = text.split(/([.!?]+)/g);

    for (let i = 0; i < textsParts.length; i += 2) {
      const rawText = textsParts[i] + (textsParts[i + 1] || '');
      if (rawText.length === 0) continue;

      sentences.push({
        id: rawText.toLowerCase().trim(),
        text: rawText,
        range: { indexStart: cursor, indexEnd: cursor + rawText.length },
        modified: false
      });
      cursor += rawText.length;
    }
    return sentences;
  }
}
