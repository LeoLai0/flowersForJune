import type { SetStateAction } from "react";
import { motion } from 'framer-motion';

interface LetterModalProps {
  isOpen: Boolean,
  setIsOpen: React.Dispatch<SetStateAction<Boolean>>,
}

export const LetterModal: React.FC<LetterModalProps> = ({ isOpen, setIsOpen }) => {
  if (!isOpen) return null;

  // Close when clicking outside the modal box
  const handleBackdropClick = () => setIsOpen(false);

  // Prevent modal box click from closing it
  const handleBoxClick = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
        className="bg-white/70 max-h-[80vh] p-5 rounded-xl shadow-lg w-full m-5 max-w-md relative"
        onClick={handleBoxClick}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-black cursor-pointer"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold italic tracking-wide mb-4">Dearest Jueun</h2>

        <div className="overflow-y-auto pr-2 max-h-[60vh]">
          <p className="text-gray-700 text-sm tracking-wide">
            Happy anniversary bbyy! I actually cannot believe that we have officially hit the one year mark now! I am so grateful that the adventure that we have shared together has allowed me fall in love with you every single day.
            <br/>
            <br/>
            There has never been a moment where I have forgotten about the first time I made you smile, the first time I've seen you excited, the first time I've seen you emotional, the first time I was able to witness your beauty, and the first time I fell in love with you.          
            There is no doubt in my heart that you are my life-long partner that I have always longed for as a child. You are the love of my life Jueun, and I cannot imagine my life without you. Here's to a whole life time together, and the fact that you'll be the one that I get to age with makes me eternally grateful to God that He has placed you in His plan for me.
            I cannot wait to share a life time of memories with you.
            <br/>
            <br/>
            So, to this app, and what it is. I made this app specifically for you, so that you are reminded of all the times that I wanted to gift you flowers. And only when the time is right, and when you can finally be proud of receiving them from me in front of the people you love, click on the <i><u>Claim Now</u></i> button, and all those flowers that I have been wanting to give you for so long, will be coming your way.
            <br/>
            <br/>
            I also made some alert buttons with your most common stims so that you can finally do them in peace without me buggin you 💀
            <br/>
            <br/>
            I love you with all my heart, Jueun. Thank you for being my partner, and my soulmate.
            <br/>
            <br/>
          </p>
          <h4 className="tracking-wide italic">~ From Leo</h4>
        </div>

      </motion.div>
    </div>
  );
};