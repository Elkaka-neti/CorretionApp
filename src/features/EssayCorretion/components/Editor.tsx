import React, { useRef, useEffect, useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { useAnalyseEssay } from '../hooks/analyseEssay'


interface EditorProps {
    text: string;
    onTextChange: (text: string) => void;
}


const Editor: React.FC<EditorProps> = ({ text, onTextChange }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [content, setContent] = useState<string>('');
    const { handleAnalyseEssay } = useAnalyseEssay();

    useEffect(() => {
        
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; 
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [text]);


    const sendDebounceData = useCallback(
        debounce((nextContent: string) => handleAnalyseEssay(nextContent), 1500),
    []);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
       const value = e.target.value;
        onTextChange(value);
        setContent(value);
        sendDebounceData(value);
    };
	
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg border border-slate-200">
            <textarea
                ref={textareaRef}
                value={content}
                onChange={handleTextChange}
                className="w-full bg-white font-serif text-lg resize-none focus:outline-none leading-relaxed"
                placeholder="Comece sua redação aqui..."
                rows={25} 
            />
        </div>
    );
};

export default Editor;