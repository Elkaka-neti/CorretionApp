import type { EnhancedCorrection } from '@/features/Fast-IaCorrection/types';
import type React from 'react';

interface Props {
    text: string;
    corrections: EnhancedCorrection[];
    activeError: string | null;
}

const HighlightOverlayer: React.FC<Props> = ({text, corrections, activeError}) => {

    const parts = [];
    let lastIndex = 0;
    
    const sortedCorrection = [...corrections].sort((a,b) => {
        return a.globalStartIndex - b.globalStartIndex;
    });
    



    sortedCorrection.forEach(correction => {

        const isSelected = correction.id === activeError;

        parts.push(text.slice(lastIndex, correction.globalStartIndex));

        parts.push(
            <span key={correction.id} className={`border-b-2 transition-all duration-200 
                ${isSelected 
                ? 'border-blue-500 bg-blue-500/20' 
                : 'border-red-500 bg-red-500/10'}  
             `}>
                {text.slice(correction.globalStartIndex, correction.globalEndIndex)}
            </span>
        );

        lastIndex = correction.globalEndIndex;
    });

    parts.push(text.slice(lastIndex));

    return (
        <div className="whitespace-pre-wrap break-words font-serif text-lg leading-relaxed text-slate-900 p-6">
            {parts}
        </div>
    )
}


export default HighlightOverlayer;