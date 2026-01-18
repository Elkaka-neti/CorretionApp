import React from "react";

export interface Sheet {
    lenght: number;
    lettersCount: number;
    wordsCount: number;
}

export interface EssayData {
    essayText: string;
    setEssayText: React.Dispatch<React.SetStateAction<string>>;
}

export interface EssayContextProps {
    isAnalysing: boolean;
    setIsAnalysing: React.Dispatch<React.SetStateAction<boolean>>;
    essayAnalysisData: any;
    setEssayAnalysisData: React.Dispatch<React.SetStateAction<any>>;
}

export interface EditorMethods {
    selectRange: (start: number, end: number) => void;
    focus: () => void;
    getScrollValues: () => {top: number, left: number}
}