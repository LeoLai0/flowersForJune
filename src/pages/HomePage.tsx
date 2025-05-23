import { GreetingDiv } from '../components/GreetingDiv/GreetingDiv';
import { WeatherDiv } from '../components/WeatherDiv/WeatherDiv';
import { FlowerDiv } from '../components/FlowerDiv/FlowerDiv';
import { AlertDiv } from '../components/AlertDiv/AlertDiv';
import { MessageDiv } from '../components/MessageDiv/MessageDiv';
import { LetterModal } from '../components/LetterModal/LetterModal';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Message from "../assets/OtherAssets/Message.png";

export const HomePage: React.FC = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  useEffect(() => {
    if (isOpen) {
      console.log("modal open");
    } else {
      console.log("modal close");
    }
    
  }, [isOpen]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="px-5 flex items-center justify-center"
    >
      <div className="grid grid-cols-1 grid-rows-7 gap-4 h-full relative w-full">
        <div
          className="absolute top-10 right-0 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img src={Message} alt="current-weather-visual" className="h-[25px] w-[25px]"/>
        </div>
        <LetterModal isOpen={isOpen} setIsOpen={setIsOpen} />
        <GreetingDiv />
        <WeatherDiv />
        <FlowerDiv />
        <AlertDiv />
        <MessageDiv />
      </div>
    </motion.div>
  );
}