import React, { useState, useEffect } from 'react';
import { User } from '../../types';
import { FaMicrophone, FaMicrophoneSlash, FaPhoneSlash } from 'react-icons/fa';
import { BeatLoader } from 'react-spinners';

interface PhoneCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

const PhoneCallModal: React.FC<PhoneCallModalProps> = ({ isOpen, onClose, user }) => {
  const [callStatus, setCallStatus] = useState<'connecting' | 'active' | 'ended'>('connecting');
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCallStatus('connecting');
      const timer = setTimeout(() => {
        setCallStatus('active');
      }, 2000); // Shorter connection time for audio
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleEndCall = () => {
      setCallStatus('ended');
      setTimeout(onClose, 1000);
  }

  const renderStatus = () => {
      switch(callStatus) {
          case 'connecting':
              return <div className="flex items-center text-yellow-300"><BeatLoader size={8} color="white" className="mr-2"/> Connecting...</div>;
          case 'active':
              return <div className="flex items-center text-green-300"><span className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></span> On Call</div>;
          case 'ended':
              return <div className="text-gray-400">Call Ended</div>
      }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-[100] flex justify-center items-center p-4" onClick={onClose}>
      <div 
        className="bg-gray-800 rounded-lg shadow-xl w-full max-w-sm h-[60vh] relative animate-fade-in-up text-white flex flex-col justify-between items-center p-8" 
        onClick={(e) => e.stopPropagation()}
        style={{backgroundImage: `url(${user.photoUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 rounded-lg"></div>
        <div className="relative z-10 text-center">
            <img src={user.photoUrl} alt={user.name} className="w-32 h-32 rounded-full mx-auto border-4 border-gray-600 shadow-lg"/>
            <h2 className="text-3xl font-bold mt-4">{user.name}</h2>
            <div className="mt-2 text-lg">{renderStatus()}</div>
        </div>

        {/* Controls */}
        <div className="relative z-10 flex justify-center items-center space-x-8">
            <button onClick={() => setIsMuted(!isMuted)} className="p-4 bg-gray-600 bg-opacity-70 rounded-full hover:bg-gray-500 transition-colors">
                {isMuted ? <FaMicrophoneSlash size={24} /> : <FaMicrophone size={24} />}
            </button>
            <button onClick={handleEndCall} className="p-5 bg-red-600 rounded-full hover:bg-red-700 transition-colors transform scale-110">
                <FaPhoneSlash size={28} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default PhoneCallModal;
