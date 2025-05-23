import { useEffect, useState } from 'react';
import '../../App.css'
import Locked_In from '../../assets/AlertAssets/Locked_In.png';
import Napping from '../../assets/AlertAssets/Napping.png'
import Rotting from '../../assets/AlertAssets/Rotting.png'
import { AlertButton } from './AlertButton';

export const AlertDiv: React.FC = () => {
  const [selectedAlert, setSelectedAlert] = useState<string>("");

  useEffect(() => {
    console.log(selectedAlert);
  }, [selectedAlert])
  
  return (
    <div className="row-span-2 rounded-[10px] h-full relative flex flex-col justify-center">
      <div className="tracking-wide text-[0.8rem] font-light text-black/50">
        Alert Buttons
      </div>
      <div className="row-span-2 text-[.6rem] font-medium w-full h-full">
        <div className="grid grid-cols-3 h-full gap-2">
          <AlertButton imageName={Locked_In} selectedAlert={selectedAlert} setSelectedAlert={setSelectedAlert}/>
          <AlertButton imageName={Napping} selectedAlert={selectedAlert} setSelectedAlert={setSelectedAlert}/>
          <AlertButton imageName={Rotting} selectedAlert={selectedAlert} setSelectedAlert={setSelectedAlert}/>
        </div>
      </div>
    </div>
  );
}