import type { SetStateAction } from "react";

interface AlertButtonProps {
  imageName: string;
  selectedAlert: string;
  setSelectedAlert: React.Dispatch<SetStateAction<string>>;
}
export const AlertButton: React.FC<AlertButtonProps> = ({imageName, selectedAlert, setSelectedAlert}) => {

  const key: string =
  imageName
    .split("/")
    .pop()
    ?.split('.')[0]
    .split('-')[0]   // remove everything after and including "-"
    .replace("_", " ") || "";
  const apiUrl = import.meta.env.VITE_API_URL;

  const sendMessage = async (sentMessage: string) => {
    try {
      const res = await fetch(`${apiUrl}/api/send-messenger`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: sentMessage })
      });
      await res.json();
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center border-1 transition animate-fade-in duration-300 ${selectedAlert == key ? "border-black/5 bg-white/70 shadow-lg shadow-black/10" : "border-white/20 bg-white/10"} rounded-[10px] relative`}
      onClick={() => {
        if (key == selectedAlert) {
          sendMessage(`June is no longer: ${key}`);
          setSelectedAlert("");
        } else {
          setSelectedAlert(key);
          sendMessage(`June is now: ${key}`);
        }
      }}
    > 
      <div className="absolute top-1 right-1">
        <div className={`w-10 h-6 flex items-center flex-shrink-0 ml-4 p-1 rounded-full duration-300 after:w-4 after:h-4 after:rounded-full after:shadow-md after:duration-300 ${selectedAlert == key ? "after:translate-x-4 bg-black/80 after:bg-white": "border-1 border-black/20 after:bg-black/20"}`}></div>
      </div>
      <div className="">
        <img src={imageName} alt={`${imageName}`} className="w-[100px]" />
      </div>
      <div className="flex justify-center font-bold tracking-wide">
        {key}
      </div>
    </div>
  );
}