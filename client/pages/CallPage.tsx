import React, { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { sampleUsers } from '../data/sampleData';
import { User } from '../types';
import { PhoneOffIcon, MicOffIcon, VideoOffIcon, VolumeUpIcon, RefreshCcwIcon, VideoIcon } from '../constants';

const CallActionButton: React.FC<{ onClick: () => void; children: React.ReactNode; className: string, text: string }> = ({ onClick, children, className, text }) => (
    <div className="flex flex-col items-center">
        <button onClick={onClick} className={`p-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 ${className}`}>
            {children}
        </button>
        <span className="mt-2 text-sm text-gray-200">{text}</span>
    </div>
);


const CallPage: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    
    const [user, setUser] = useState<User | null>(null);
    const [callStatus, setCallStatus] = useState('Connecting...');
    const [isMuted, setIsMuted] = useState(false);
    const [isCameraOff, setIsCameraOff] = useState(false);
    const [isSpeakerOn, setIsSpeakerOn] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);

    const localVideoRef = useRef<HTMLVideoElement>(null);
    const callType = searchParams.get('type') || 'voice'; // 'voice' or 'video'

    // Effect to get user and simulate call status
    useEffect(() => {
        const foundUser = sampleUsers.find(u => u.id === parseInt(userId || ''));
        if (foundUser) {
            setUser(foundUser);
        } else {
            navigate('/'); // Redirect if user not found
        }

        const statusTimer1 = setTimeout(() => setCallStatus('Ringing...'), 2000);
        const statusTimer2 = setTimeout(() => setCallStatus('00:01'), 5000);
        
        let interval: ReturnType<typeof setInterval>;
        const statusTimer3 = setTimeout(() => {
            let seconds = 1;
            interval = setInterval(() => {
                seconds++;
                const min = Math.floor(seconds / 60).toString().padStart(2, '0');
                const sec = (seconds % 60).toString().padStart(2, '0');
                setCallStatus(`${min}:${sec}`);
            }, 1000);
        }, 5000);

        return () => {
            clearTimeout(statusTimer1);
            clearTimeout(statusTimer2);
            clearTimeout(statusTimer3);
            clearInterval(interval);
        };
    }, [userId, navigate]);

    // Effect to get media devices
    useEffect(() => {
      const getMedia = async () => {
        try {
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            video: callType === 'video',
            audio: true,
          });
          setStream(mediaStream);
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = mediaStream;
          }
        } catch (err) {
          console.error("Error accessing media devices.", err);
          alert("Could not access camera/microphone. Please check permissions and try again.");
          navigate(-1);
        }
      };

      getMedia();

      return () => {
        stream?.getTracks().forEach(track => track.stop());
      };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [callType, navigate]);

    useEffect(() => {
        if (stream) {
            stream.getAudioTracks().forEach(track => track.enabled = !isMuted);
        }
    }, [stream, isMuted]);

    useEffect(() => {
        if (stream && callType === 'video') {
            stream.getVideoTracks().forEach(track => track.enabled = !isCameraOff);
        }
    }, [stream, isCameraOff, callType]);


    const handleEndCall = () => {
        stream?.getTracks().forEach(track => track.stop());
        navigate(-1); // Go back to the previous page
    };

    if (!user) {
        return <div className="flex items-center justify-center min-h-screen bg-dark-bg text-white">Loading Call...</div>;
    }
    
    const isInCall = callStatus.includes(':');

    return (
        <div className="fixed inset-0 bg-dark-bg flex flex-col items-center justify-between p-8 z-50 animate-fade-in">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${user.image})`, filter: 'blur(20px)', opacity: '0.3' }}></div>
            <div className="absolute inset-0 bg-black/50"></div>
            
            {callType === 'video' && stream && (
                 <div className="absolute top-4 right-4 w-32 h-48 md:w-40 md:h-60 bg-black rounded-lg overflow-hidden shadow-lg z-20 border-2 border-white/20">
                    <video ref={localVideoRef} autoPlay muted playsInline className={`w-full h-full object-cover transform -scale-x-100 transition-opacity duration-300 ${isCameraOff ? 'opacity-0' : 'opacity-100'}`}></video>
                    {isCameraOff && <div className="absolute inset-0 flex items-center justify-center bg-black"><VideoOffIcon /></div>}
                </div>
            )}
            
            <div className="relative z-10 text-center text-white">
                <h2 className="text-4xl font-bold font-heading">{user.name}</h2>
                <p className="text-lg text-gray-300 mt-2">{callStatus}</p>
            </div>

            <div className="relative z-10">
                <div className={`relative ${isInCall ? 'animate-pulse' : ''}`}>
                    <img src={user.image} alt={user.name} className="w-48 h-48 rounded-full object-cover ring-8 ring-white/10 shadow-2xl" />
                    {isInCall && <div className="absolute inset-0 rounded-full border-4 border-green-400 ring-4 ring-green-400/50 animate-ping"></div>}
                </div>
            </div>

            <div className="relative z-10 flex items-center justify-center space-x-4 md:space-x-8">
                <CallActionButton onClick={() => setIsMuted(!isMuted)} className={isMuted ? "bg-red-500 text-white" : "bg-white/20 text-white"} text="Mute">
                    <MicOffIcon />
                </CallActionButton>
                
                {callType === 'video' && (
                    <CallActionButton onClick={() => setIsCameraOff(!isCameraOff)} className={isCameraOff ? "bg-red-500 text-white" : "bg-white/20 text-white"} text={isCameraOff ? "Cam Off" : "Cam On"}>
                       {isCameraOff ? <VideoOffIcon /> : <VideoIcon />}
                    </CallActionButton>
                )}
                
                <CallActionButton onClick={handleEndCall} className="bg-red-600 text-white transform scale-125" text="End Call">
                    <PhoneOffIcon />
                </CallActionButton>

                <CallActionButton onClick={() => setIsSpeakerOn(!isSpeakerOn)} className={isSpeakerOn ? "bg-blue-500 text-white" : "bg-white/20 text-white"} text="Speaker">
                    <VolumeUpIcon />
                </CallActionButton>
                
                {callType === 'video' && (
                     <CallActionButton onClick={() => {}} className="bg-white/20 text-white" text="Flip">
                        <RefreshCcwIcon />
                    </CallActionButton>
                )}
            </div>
        </div>
    );
};

export default CallPage;
