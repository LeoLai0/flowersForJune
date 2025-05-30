import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { markLoginToday } from "../utils/auth";
import { motion } from 'framer-motion';

export const LoginPage: React.FC = () => {
  const [pin, setPin] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showWelcome, setShowWelcome] = useState(false);
  const navigate = useNavigate();

  const userPin: string = "2205";
  const configPin: string = "2610";

  const handleLogin = () => {
    if (pin === userPin) {
      markLoginToday('user');
      setShowWelcome(true);
      setTimeout(() => navigate('/home'), 1500);
    } else if (pin === configPin) {
      markLoginToday('config');
      navigate('/config')
    } else {
      setError('Incorrect PIN. Try again.');
    }
  };

  return (
    
    <div className="h-screen flex flex-col items-center justify-center transition-opacity duration-700 ease-in">
      {showWelcome ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-xl font-semibold text-black"
        >
          Welcome, June!
        </motion.div>
      ) : (
        <>
          <h1 className="text-2xl mb-4 font-semibold">Enter 4-Digit PIN</h1>
          <input
            type="password"
            inputMode="numeric"
            pattern="\d*"
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="bg-transparent text-center text-xl border border-black/20 rounded-[10px] px-4 py-2 w-32 mb-4 focus:outline-none"
          />
          <button
            onClick={handleLogin}
            className="bg-black/60 text-white px-5 py-2 rounded hover:bg-black/70 active:bg-black/90"
          >
            Login
          </button>
          {error && <p className="mt-3 text-red-500 text-sm">{error}</p>}
        </>
      )}
    </div>
  );
}