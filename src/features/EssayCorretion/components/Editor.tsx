import React, { useEffect, forwardRef, useImperativeHandle } from 'react';


interface EditorProps {
    text: string;
    onTextChange: (text: string, cursor: number) => void;
    onScroll: (e: React.UIEvent<HTMLTextAreaElement>) => void;
}


const Editor = forwardRef<HTMLTextAreaElement, EditorProps>(({ text, onTextChange, onScroll  }, ref) => {
    

    useEffect(() => {
        
        if (ref && 'current' in ref && ref.current) {
/*O react demora atribuir, isso trata o erro temporariamente*/ 

            ref.current.style.height = 'auto'; 
            ref.current.style.height = `${ref.current.scrollHeight}px`;
        }
    }, [text, ref]);

    /*
    const sendDebounceData = useCallback(
        debounce((nextContent: string) => handleAnalyseEssay(nextContent), 1500),
    []);
    */
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
       const value = e.target.value;
       const cursorPosition = e.target.selectionStart;

        onTextChange(value, cursorPosition);
        //sendDebounceData(value);
    };
    
	
    return (
            <textarea
                ref={ref}
                value={text}
                onChange={handleTextChange}
                onScroll={onScroll}
                className="w-full bg-transparent text-transparent font-serif text-lg resize-none focus:outline-none leading-relaxed p-6 relative z-10 caret-black shadow-none border-none outline-none overflow-hidden"
                placeholder="Comece sua redação aqui..."
                rows={25} 
                spellCheck={false}
            />
    );
});

Editor.displayName = 'Editor';

export default Editor;