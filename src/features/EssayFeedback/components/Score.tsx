
import { useEssay } from '@/features/EssayCorretion/contexts/EssayContext';
import { CompetencyScoreRow } from './CompentencyScoreRow';
import type { Score } from '../types';

export default function Score() {
   
    const competencyList = [
        { title: 'Competência I', description: 'Gramática e ortografia' },
        { title: 'Competência II', description: 'Tema e estrutura' },
        { title: 'Competência III', description: 'Argumentação' },
        { title: 'Competência IV', description: 'Coesão' },
        { title: 'Competência V', description: 'Proposta de intervenção' }
    ]



    const { essayAnalysisData } = useEssay();
    const scores: Score = essayAnalysisData?.scores;


    return (
<div className="bg-white p-4 rounded-lg shadow-md border border-slate-200 md:w-[40%]">
   <h2 className="text-xl font-semibold mb-4 text-slate-600">Nota da redação</h2>

    {!scores ? (
    <div className="text-center text-slate-500 py-8">
      <p>Sua pontuação aparecerá aqui quando você começar a escrever.</p>
    </div>
    ) : (
    <div className="space-y-4">
      <div className="text-center bg-slate-50 p-4 rounded-lg">
        <p className="text-slate-600 font-medium">Pontuação Total</p>
        <p className="text-5xl font-bold text-indigo-700">{scores.total}</p>
        <p className="text-slate-500">de 1000</p>
      </div>
      <div className="space-y-3 pt-2">
                        
      {competencyList.map((competency: {title: string, description: string}, index: number) => (
         <CompetencyScoreRow
            key={index}
            title={competency.title}
            description={competency.description}
            score={Object.values(scores)[index]}/>
       )) }
               
                        

                       

       </div>
    </div>
    )}
</div>
);
}


