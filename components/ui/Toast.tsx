
import React, { useEffect } from 'react';
import { MdCheckCircle } from 'react-icons/md';

interface ToastProps {
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-5 right-5 bg-green-600 text-white py-3 px-5 rounded-lg shadow-lg flex items-center z-[101] animate-fade-in-up">
      <MdCheckCircle size={24} className="mr-3" />
      <span className="font-semibold">{message}</span>
    </div>
  );
};

export default Toast;
