import { useEffect, useState } from 'react'
import '../../App.css';
import Orange from '../../assets/FlowerAssets/Orange.png';
import Pink from '../../assets/FlowerAssets/Pink.png';
import Purple from '../../assets/FlowerAssets/Purple.png';
import Red from '../../assets/FlowerAssets/Red.png';
import Yellow from '../../assets/FlowerAssets/Yellow.png';
import { ClaimFlowersModal } from '../ClaimFlowersModal/ClaimFlowersModal';


export const FlowerDiv: React.FC = () => {
  const [weeksPassed, setWeeksPassed] = useState<number>(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [flower, setFlower] = useState<string>(Orange);
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const randomImg = () => {
    const randomNum: number = Math.random();
    if (randomNum <= 0.2) {
      setFlower(Orange);
    } else if (randomNum <= 0.4) {
      setFlower(Pink);
    } else if (randomNum <= 0.6) {
      setFlower(Purple);
    } else if (randomNum <= 0.8) {
      setFlower(Red);
    } else {
      setFlower(Yellow);
    }
  }

  const sendClaimMessage = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/send-messenger`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: `June is claiming ${weeksPassed} flowers!` })
      });
      await res.json();
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  // Fetch start date on mount
  useEffect(() => {
    randomImg();
    fetch(`${apiUrl}/api/start-date`)
      .then((res) => res.json())
      .then((data) => {
        const date = new Date(data.startDate);
        setStartDate(date);

        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
        setWeeksPassed(weeks);
      })
      .catch((err) => console.error("Failed to fetch start date:", err));
  }, []);

  // Reset handler
  const resetStartDate = () => {
    const now = new Date();
    fetch(`${apiUrl}/api/start-date`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ startDate: now.toISOString() }),
    })
      .then(() => {
        setStartDate(now);
        setWeeksPassed(0); // reset streak immediately
        console.log(startDate);
      })
      .catch((err) => console.error("Failed to reset start date:", err));
  };

  return (
    <div className="row-span-3 h-full flex flex-col justify-center relative">
      <div className="tracking-wide text-[0.8rem] font-light text-black/50">
        Collected Flowers
      </div>
      <div className="grid grid-rows-8 gap-1 text-center w-full h-full py-3 border-1 border-black/5 shadow-lg shadow-black/5 bg-white/10 rounded-[10px]">
        <div className="text-xs font-medium flex justify-center items-end tracking-wide">
          Here's how many flowers you've collected!
        </div>
        <div className="row-span-2 text-xl font-medium flex justify-center items-center tracking-wide">
          {(weeksPassed != 0) ? weeksPassed : "-"}
        </div>
        <div className="row-span-2 flex justify-center items-center">
          <div className="w-[50px] h-[50px] border-1 border-black/10 flex justify-center items-center rounded-[10px]">
            <img src={flower} alt={`${Pink}`} />
          </div>
          
        </div>
        <div className="row-span-1 text-xs font-light text-black/50 tracking-wide">
          Streaks coming soon!
        </div>
        <div className="row-span-2 font-medium flex justify-center items-center">
          <button
            className="bg-black/10 border-1 border-black/20 py-3 px-5 rounded-[10px] text-xs tracking-wide hover:bg-white/20 active:bg-white/50 transition delay-20 cursor-pointer"
            onClick={() => {
              setIsOpen(!isOpen)
            }}>
            Claim Flowers
          </button>
        </div>
      </div>
      <ClaimFlowersModal isOpen={isOpen} setIsOpen={setIsOpen} resetStartDate={resetStartDate} sendClaimMessage={sendClaimMessage} />
    </div>
  );
}