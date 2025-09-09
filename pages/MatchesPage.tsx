
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { mockUsers } from '../data/mocks';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Toast from '../components/ui/Toast';

const MatchesPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sentInterests, setSentInterests] = useState<number[]>(() => {
    const saved = localStorage.getItem('sentInterests');
    return saved ? JSON.parse(saved) : [];
  });
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSendInterest = (targetUserId: number) => {
    if (!user?.isPremium) {
      setShowUpgradeModal(true);
      return;
    }
    const updatedInterests = [...sentInterests, targetUserId];
    setSentInterests(updatedInterests);
    localStorage.setItem('sentInterests', JSON.stringify(updatedInterests));
    setShowToast(true);
  };
  
  return (
    <div className="container mx-auto p-4 lg:p-6">
      {showToast && <Toast message="Interest sent successfully!" onClose={() => setShowToast(false)} />}
      <Modal 
        isOpen={showUpgradeModal} 
        onClose={() => setShowUpgradeModal(false)}
        title="Upgrade Required"
      >
        <p className="text-gray-600 mb-6">You need to be a Premium member to send interests. Upgrade now to connect with your matches!</p>
        <Button className="w-full" onClick={() => navigate('/payment')}>Upgrade to Premium</Button>
      </Modal>

      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Matches</h1>
      <p className="text-gray-600 mb-8">Based on your profile and preferences, here are some profiles you might like.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockUsers.slice(10, 22).map(matchUser => {
          const isInterestSent = sentInterests.includes(matchUser.id);
          return (
            <div key={matchUser.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:-translate-y-1">
              <img src={matchUser.photoUrl} alt={matchUser.name} className="w-full h-56 object-cover" />
              <div className="p-4 text-center">
                <h3 className="font-bold text-lg">{matchUser.name}</h3>
                <p className="text-sm text-gray-600">{matchUser.age} yrs, {matchUser.location}</p>
                <div className="mt-4">
                  <Button 
                    className="w-full"
                    onClick={() => handleSendInterest(matchUser.id)}
                    disabled={isInterestSent}
                  >
                    {isInterestSent ? 'Interest Sent' : 'Send Interest'}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MatchesPage;
