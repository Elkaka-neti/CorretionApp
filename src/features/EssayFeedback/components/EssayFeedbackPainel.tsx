
import Feedback from "./Feedback";
import Score from "./Score";

export default function EssayFeedbackPainel() {
   
    return (
 <div className="w-screen flex gap-2 flex-col md:flex-row flex-1 justify-between">
    <Score />
    <Feedback />
 </div>
    )
}