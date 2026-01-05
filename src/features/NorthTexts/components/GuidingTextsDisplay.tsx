import type React from 'react';
import { useGlobalContext } from '@/contexts/GlobalContext';

export const GuidingTextsDisplay: React.FC = () => {
    const { texts } = useGlobalContext();

    if (texts.length === 0) {
        return (
            <div className="space-y-4">
                 {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white p-4 rounded-lg shadow animate-pulse">
                        <div className="h-4 bg-slate-200 rounded w-3/4 mb-4"></div>
                        <div className="h-2 bg-slate-200 rounded w-1/2 mb-4"></div>
                        <div className="h-2 bg-slate-200 rounded mb-2"></div>
                        <div className="h-2 bg-slate-200 rounded mb-2"></div>
                        <div className="h-2 bg-slate-200 rounded w-5/6"></div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {texts.map((text: {title: string, content: string, source: string}, index: number) => (
                <div key={index} className="bg-[#fdf6ec] p-4 rounded-lg shadow-md border border-slate-200">
                    <h3 className="font-bold text-lg text-black">{text.title}</h3>
                    <p className="text-xs text-slate-500 mb-2">Fonte: {text.source}</p>
                    <p className="text-sm whitespace-pre-wrap text-[#2f2f2f]">{text.content}</p>
                </div>
            ))}
        </div>
    );
};
