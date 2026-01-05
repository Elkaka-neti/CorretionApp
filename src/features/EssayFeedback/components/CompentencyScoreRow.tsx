import type React from 'react';

export const CompetencyScoreRow: React.FC<{title: string, description: string, score: number}> = ({title, description, score}) => {
    return (
    <div>
        <div className="flex justify-between items-baseline">
            <h4 className="font-semibold text-slate-700">{title}</h4>
            <span className="font-bold text-lg text-slate-800">{score}</span>
        </div>
        <p className="text-sm text-slate-500 -mt-1">{description}</p>
        <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
            <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{ width: `${(score / 200) * 100}%`, transition: 'width 0.5s ease-in-out' }}
            ></div>
        </div>
    </div>
);
}