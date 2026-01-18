import type React from 'react';
import { useGlobalContext } from '@/contexts/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { usePassNorthTexts } from '@/features/NorthTexts/hooks/passNorthsTexts';


const TopicInput: React.FC<any> = () => {

    const {topic, setTopic} = useGlobalContext();
    const passNorthTexts = usePassNorthTexts();
        
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTopic(topic);
        passNorthTexts(topic);
        navigate("/nova-redacao");

    };

    return (
            <div className=" w-[90%] ">
                <p className="text-slate-800 mb-5 text-xl font-weight-400">
                  Comece com um tema:
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="ex: Os impactos das redes sociais na sociedade"
                        className="w-full px-5 py-3 text-lg text-slate-700 bg-slate-100 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full px-5 py-3 text-lg font-semibold text-white bg-black rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-transform transform hover:scale-105"
                    >
                        Comece a escrever
                    </button>
                </form>
            </div>
    );
};

export default TopicInput;