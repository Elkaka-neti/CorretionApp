import React, { useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import type { EditorMethods } from '../types';

interface EditorProps {
    text: string;
    onTextChange: (text: string, cursor: number) => void;
    onScroll: (e: React.UIEvent<HTMLTextAreaElement>) => void;
    onClick?: (cursor: number) => void;
}


const Editor = forwardRef<EditorMethods, EditorProps>(({ text, onTextChange, onScroll, onClick }, ref) => {

    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    

    useEffect(() => {
        
        if (textAreaRef && 'current' in textAreaRef && textAreaRef.current) {
/*O react demora atribuir, isso trata o erro temporariamente*/ 

            textAreaRef.current.style.height = 'auto'; 
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [text]);


    useImperativeHandle(ref, () => ({
        focus: () => {
            textAreaRef.current?.focus({preventScroll: true});
        },
        selectRange(start: number, end: number) {
            if(!textAreaRef.current) return;

            textAreaRef.current.focus({preventScroll: true});
            textAreaRef.current.setSelectionRange(start, end);

            textAreaRef.current.scrollIntoView({ behavior: "smooth", block: "center"});
        },
        
        getScrollValues: () => ({
    top: textAreaRef.current?.scrollTop || 0,
    left: textAreaRef.current?.scrollLeft || 0
  })

    }));



    /*
    const sendDebounceData = useCallback(
        debounce((nextContent: string) => handleAnalyseEssay(nextContent), 1500),
    []);
    */
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
       const value = e.target.value;
       const cursorPosition = e.target.selectionStart || 0;

        onTextChange(value, cursorPosition);
        //sendDebounceData(value);
    };

    const handleOnClick = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
        const cursorPos = e.currentTarget.selectionStart || 0;

        if(onClick) {
            onClick(cursorPos);
        }
    }
    
	
    return (
            <textarea
                ref={textAreaRef}
                value={text}
                onClick={handleOnClick}
                onChange={handleTextChange}
                onSelect={handleOnClick}
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