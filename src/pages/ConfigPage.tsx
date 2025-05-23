import { useState } from "react";
import type React from "react";

export const ConfigPage: React.FC = () => {

  const [input, setInput] = useState<string>('');
  const apiUrl = import.meta.env.VITE_API_URL;

  const submitMessage = () => {
    if (input.trim() !== '') {
      fetch(`${apiUrl}/api/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input.trim() }),
    })
      .then(() => {
        setInput('');
      })
      .catch((err) => console.error("Failed to reset message input: ", err));
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submitMessage();
    }
  };

  return (
    <div className="flex gap-2 items-center justify-center">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message"
        className="bg-transparent border border-black/30 text-black placeholder-black/20 rounded px-3 py-2 focus:outline-none"
      />
      <button
        onClick={submitMessage}
        className="bg-black/10 text-black px-4 py-2 rounded hover:bg-white/20 active:bg-white/30"
      >
        Submit
      </button>
    </div>
  );
}