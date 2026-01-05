
import Editor from '@/features/EssayCorretion/components/Editor';
import EssayProvider from '@/features/EssayCorretion/contexts/EssayContext';
import EssayFeedbackPainel from '@/features/EssayFeedback/components/EssayFeedbackPainel';
import { useGlobalContext } from '@/contexts/GlobalContext';

export function Editr() {
  const { topic } = useGlobalContext();
 
  
    return (

<EssayProvider>
  <main className="grid grid-cols-1 gap-4">
    <section className="w-full xl:flex-1 order-first xl:order-none">
     <h2 className="text-xl font-semibold mb-3 pl-2 text-slate-600">{topic}</h2>
     <Editor text='' onTextChange={() => {}} />
    </section>
    <section className="w-full xl:w-1/4 xl:sticky xl:top-8 self-start flex flex-col gap-8">
     <EssayFeedbackPainel />
    </section>
   </main>
</EssayProvider>

    )
}