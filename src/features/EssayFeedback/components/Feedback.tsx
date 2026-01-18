
import type { FeedbackProps } from '../types';
import type React from 'react';
import type { EnhancedCorrection } from '@/features/Fast-IaCorrection/types';





export const Feedback: React.FC<FeedbackProps> = ({corrections, onSelect, isAnalysing}) => {
  
   //const feedback = essayAnalysisData?.feedback || [];

   const feedback = [...corrections].sort((a,b) => {
    return a.globalStartIndex - b.globalStartIndex;
   })
  
   

   return (
<div className="bg-white p-4 rounded-lg shadow-md border border-slate-200">
  <div className="flex items-center mb-3">
  <h2 className="text-xl font-semibold text-slate-600">Avaliação em tempo real</h2>
  {isAnalysing && <div className="ml-2">LoadingSpinner size="sm" </div>}
  </div>

    {/* Vou deixar por enquanto, mas apenas o código de baixo ficará nesse componente*/}
<div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
    {feedback.length > 0 ? (
     
     feedback.map((item: EnhancedCorrection, index: number) => (


  <div key={index} 
  className={`bg-slate-50 p-3 rounded-lg shadow-sm border border-slate-200 relative`}
  id={item.id && `suggestion-card-${item.id}`}
  onClick={() => onSelect(item.id)}
  >

   <div className="flex items-start space-x-3">
     <div className="flex-shrink-0 text-indigo-500 mt-1">{/*getIconForType(item.type)*/}</div>
     <div>
       <p className="font-semibold text-slate-700">{item.category}</p>
       <p className="text-sm text-slate-600">{item.original}</p>
       {item.suggestion && <p className="text-sm text-green-700 mt-1"><em>Sugestão: {item.suggestion}</em></p>}
     </div>
    </div>

   {/*} <button onClick={() => onSpeak(`${item.type} feedback: ${item.message}. ${item.suggestion ? `Sugestão: ${item.suggestion}` : ''}`)}
    disabled={isSpeaking}
    className="absolute top-2 right-2 p-1 text-slate-500 hover:text-indigo-600 disabled:text-slate-300 transition-colors">
    <SpeakerIcon />
    </button>  */}

  </div>
                    ))
                ) : (
  <div className="text-center text-slate-500 p-4 bg-slate-100 rounded-lg">
    <p>Comece a escrever ou adicione mais conteúdo para receber sua avaliação.</p>
  </div>
     )}
</div>
{/* Só até aqui */}

   </div>
   )

}