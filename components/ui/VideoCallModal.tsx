import React, { useState, useEffect } from 'react';
import { User } from '../../types';
import Button from './Button';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhoneSlash } from 'react-icons/fa';
import { BeatLoader } from 'react-spinners';

interface VideoCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  caller: User;
}

const VideoCallModal: React.FC<VideoCallModalProps> = ({ isOpen, onClose, user, caller }) => {
  const [callStatus, setCallStatus] = useState<'connecting' | 'active' | 'ended'>('connecting');
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCallStatus('connecting');
      const timer = setTimeout(() => {
        setCallStatus('active');
      }, 2500);
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
              return <div className="flex items-center text-yellow-400"><BeatLoader size={8} color="white" className="mr-2"/> Connecting...</div>;
          case 'active':
              return <div className="flex items-center text-green-400"><span className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></span> Call Active</div>;
          case 'ended':
              return <div className="text-gray-400">Call Ended</div>
      }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-[100] flex justify-center items-center p-2 sm:p-4" onClick={onClose}>
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl h-[90vh] sm:h-auto relative animate-fade-in-up text-white flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="relative flex-grow">
            {/* Remote User Video */}
            <img src={user.videoPlaceholderUrl} alt={user.name} className="w-full h-full object-cover rounded-t-lg"/>
            <div className="absolute top-4 left-4 bg-black bg-opacity-50 p-2 rounded-lg">
                <h3 className="text-xl font-bold">{user.name}</h3>
                {renderStatus()}
            </div>

            {/* Local User Video */}
            <div className="absolute bottom-24 right-4 w-24 h-32 sm:w-1/4 sm:h-1/4 border-2 border-gray-500 rounded-lg overflow-hidden">
                 <img src={caller.videoPlaceholderUrl} alt={caller.name} className="w-full h-full object-cover"/>
                 {isCameraOff && <div className="absolute inset-0 bg-black flex items-center justify-center"><FaVideoSlash size={24}/></div>}
            </div>
        </div>

        {/* Controls */}
        <div className="bg-black bg-opacity-50 flex justify-center items-center p-4 space-x-4 sm:space-x-6 rounded-b-lg">
            <button onClick={() => setIsMuted(!isMuted)} className="p-3 sm:p-4 bg-gray-600 rounded-full hover:bg-gray-500 transition-colors">
                {/* FIX: Replaced invalid 'sm:size' prop with responsive Tailwind CSS classes for font-size. */}
                {isMuted ? <FaMicrophoneSlash className="text-[20px] sm:text-[24px]" /> : <FaMicrophone className="text-[20px] sm:text-[24px]" />}
            </button>
            <button onClick={() => setIsCameraOff(!isCameraOff)} className="p-3 sm:p-4 bg-gray-600 rounded-full hover:bg-gray-500 transition-colors">
                {/* FIX: Replaced invalid 'sm:size' prop with responsive Tailwind CSS classes for font-size. */}
                {isCameraOff ? <FaVideoSlash className="text-[20px] sm:text-[24px]" /> : <FaVideo className="text-[20px] sm:text-[24px]" />}
            </button>
            <button onClick={handleEndCall} className="p-3 sm:p-4 bg-red-600 rounded-full hover:bg-red-700 transition-colors">
                {/* FIX: Replaced invalid 'sm:size' prop with responsive Tailwind CSS classes for font-size. */}
                <FaPhoneSlash className="text-[20px] sm:text-[24px]" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCallModal;
