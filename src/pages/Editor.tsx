
import Editor from '@/features/EssayCorretion/components/Editor';
import EssayProvider from '@/features/EssayCorretion/contexts/EssayContext';
import {EssayFeedbackPainel} from '@/features/EssayFeedback/components/EssayFeedbackPainel';
import { useGlobalContext } from '@/contexts/GlobalContext';
import { useState, useRef, useMemo } from 'react';
import { useIaCorrection } from '@/features/Fast-IaCorrection/hooks/useIaCorrection';
import HighlightOverlayer from '@/features/EssayCorretion/components/HighlightOverlayer';
import type { EditorMethods } from '@/features/EssayCorretion/types';
import type { EnhancedCorrection } from '@/features/Fast-IaCorrection/types';

export function Editr() {
  const { topic } = useGlobalContext();
  const [ text, setText ] = useState<string>('');
  const [ _cursor, setCursor ] = useState<number>(0);
  const [activeErrorId, setActiveErrorId] = useState<string | null>(null);

  const { corrections, check, isProcessing } = useIaCorrection();

  const editorRef = useRef<EditorMethods>(null);
  const highLightRef = useRef<HTMLDivElement>(null);
  const isProgramaticSelect = useRef<boolean>(false);
  const isDigitationSelect = useRef<boolean>(false);

  const handleEditorClick = (cursorPos: number) => {

    if(isProgramaticSelect.current) {
      isProgramaticSelect.current = false;
      return;
    }
    if(isDigitationSelect.current) {
      isDigitationSelect.current = false;
      return;
    }

    const foundError = corrections.find(error => 
      cursorPos >= error.globalStartIndex &&
      cursorPos <= error.globalEndIndex
    );

    


    if(!foundError) {
      setActiveErrorId(null);
      return;
    }
    
    setActiveErrorId(foundError.id);
    console.log("[CARD-UI] Erro clicado: ", foundError.suggestion);
    
    const card = document.getElementById(`suggestion-card-${foundError.id}`);
    card?.scrollIntoView({ behavior: "smooth", block: "nearest"});
  


  }


  const visibleLightError = useMemo(() => {
    const sortedCorrection = [...corrections].sort((a,b) => 
       (a.position.indexEnd - a.position.indexStart) - (b.position.indexEnd - b.position.indexStart)
    )

    const filtrados: EnhancedCorrection[] = [];

    sortedCorrection.forEach(current => {
      if(current.category === "cohesion") return;

      const hasColisionError = filtrados.some(v => (current.position.indexStart < v.position.indexEnd && current.position.indexEnd > v.position.indexStart));

      if(!hasColisionError) filtrados.push(current);

    })

    const uniqueErrorBySentence = new Map<string, EnhancedCorrection>();

    sortedCorrection.forEach((error) => {
      const sId = error.id || 'padrao';
      if(!uniqueErrorBySentence.has(sId)) uniqueErrorBySentence.set(sId, error);
    })

      return Array.from(uniqueErrorBySentence.values());

  }, [corrections, text]);




  const handleOnScroll = () => {
    if(!editorRef.current || !highLightRef.current) return;

    highLightRef.current.scrollTop = editorRef.current.getScrollValues().top;
    highLightRef.current.scrollLeft = editorRef.current.getScrollValues().left;

  };


  const onChangeText = (newText: string, cursorIndice: number) => {
    setText(newText);
    setCursor(cursorIndice)
    isDigitationSelect.current = true;
    check(newText, cursorIndice)
  }

  const handleSelectCorrection = (id: string) => {
    const erro = corrections.find(c => c.id === id);

    if(!erro) return;
    
    isProgramaticSelect.current = true;
    setActiveErrorId(id);

    editorRef.current?.selectRange(erro.globalStartIndex, erro.globalEndIndex);

  }


  
    return (

<EssayProvider>
  <main className="grid grid-cols-1 gap-4">

    <section className="w-full xl:flex-1 order-first xl:order-none">
     <h2 className="text-xl font-semibold mb-3 pl-2 text-slate-600">{topic}</h2>

     <div className="relative bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
       
       <div ref={highLightRef} className="absolute left-0 top-0 w-full h-full pointer-events-none overflow-hidden text-black">
           <HighlightOverlayer text={text} corrections={visibleLightError} activeError={activeErrorId} />
       </div>



       <Editor ref={editorRef} onScroll={handleOnScroll}  text={text} onTextChange={onChangeText} onClick={handleEditorClick} />
     </div>

    </section>


    <section className="w-full xl:w-1/4 xl:sticky xl:top-8 self-start flex flex-col gap-8">

  
     <EssayFeedbackPainel corrections={corrections} onSelect={handleSelectCorrection} isAnalysing={isProcessing}/>
     {/* Aqui vai o onSelect={handleSelectCorrection}*/}
    </section>

   </main>

</EssayProvider>

    )
}