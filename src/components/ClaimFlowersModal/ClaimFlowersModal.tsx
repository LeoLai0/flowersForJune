import type { SetStateAction } from "react";

interface ClaimFlowersModalProps {
  isOpen: Boolean,
  setIsOpen: React.Dispatch<SetStateAction<Boolean>>,
  sendClaimMessage: () => Promise<void>,
  resetStartDate: () => void,
}

export const ClaimFlowersModal: React.FC<ClaimFlowersModalProps> = ({ isOpen, setIsOpen, sendClaimMessage, resetStartDate }) => {
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
      <div
        className="bg-white/40 max-h-[80vh] p-5 rounded-xl shadow-lg w-full m-5 max-w-md relative flex flex-col items-center"
        onClick={handleBoxClick}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-black cursor-pointer"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold tracking-wide mb-4">Confirm Claiming Flowers</h2>
        <button
          className="bg-black/10 border-1 border-black/20 py-3 px-5 rounded-[10px] tracking-wide text-xs tracking-wide hover:bg-white/20 active:bg-white/50 transition delay-20 cursor-pointer"
          onClick={() => {
            sendClaimMessage()
            resetStartDate()
            setIsOpen(!isOpen)
          }}
        >
          Claim them Flowers!
        </button>
      </div>
    </div>
  );
};