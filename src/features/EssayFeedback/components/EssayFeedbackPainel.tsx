
import type { FeedbackProps } from "../types";
import {Feedback} from "./Feedback";
import Score from "./Score";



export const EssayFeedbackPainel: React.FC<FeedbackProps> = ({corrections, onSelect, isAnalysing}) => {
   

    return (
 <div className="w-screen flex gap-2 flex-col md:flex-row flex-1 justify-between">
    <Score />
    <Feedback corrections={corrections} onSelect={onSelect} isAnalysing={isAnalysing}/>
 </div>
    )
}