import { useEffect, useState } from 'react'
import '../../App.css'

export const GreetingDiv: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  const constructMessage = () => {
    const currentTime = new Date();
    const time24 = currentTime.getHours();

    if ((time24 >= 17 && time24 <= 23) || (time24 >= 0 && time24 <= 4)) {
      setMessage("Evening");
    } else if (time24 >= 4 && time24 <= 11) {
      setMessage("Morning");
    } else {
      setMessage("Afternoon")
    }
  }

  useEffect(() => {
    constructMessage();
  }, [])

  return (
    <div className="row-span-1 flex items-end">
      <div>
        <h1 className="text-[1.9rem] font-medium tracking-wide">
          Good {message} Jueun!
        </h1>  
      </div>
    </div>
  );
}