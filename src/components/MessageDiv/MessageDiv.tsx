// import { useState } from 'react'
import React, { useEffect, useState } from 'react';
import '../../App.css'

export const MessageDiv: React.FC = () => {

  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    fetch('/api/message')
      .then((res) => res.json())
      .then((data) => {
        const retrievedMessage = data.message;
        setMessage(retrievedMessage);
      })
      .catch((err) => console.error("Failed to fetch message: ", err));
  }, [])

  return (
    <div className="row-span-1 flex flex-col relative">
      <div className="tracking-wide text-[0.8rem] font-light text-black/50">
        Leo's Daily Message
      </div>
      <div className="w-full gap-2 border-1 border-black/5 w-full rounded-[10px] py-4 px-2 text-xl font-light text-center tracking-wide">
        {message}
      </div>
    </div>
  );
}