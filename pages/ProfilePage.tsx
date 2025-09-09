
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { mockUsers } from '../data/mocks';
import { MdVerified, MdEdit } from 'react-icons/md';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  if (!user) {
    return <div>Loading profile...</div>;
  }
  
  const openLightbox = (imgUrl: string) => {
      setSelectedImage(imgUrl);
      setIsLightboxOpen(true);
  }

  const renderContent = () => {
      switch (activeTab) {
          case 'profile':
              return (
                  <div className="space-y-8">
                      <div className="flex justify-between items-center"><h3 className="text-xl font-bold">My Profile</h3><Button variant="secondary" onClick={() => setIsEditing(!isEditing)}><MdEdit className="mr-2"/>{isEditing ? 'Save' : 'Edit'}</Button></div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                          <div><strong>Name:</strong> {user.name}</div><div><strong>Age:</strong> {user.age} years</div><div><strong>Location:</strong> {user.location}</div><div><strong>Religion:</strong> {user.religion}</div>
                          <div className="md:col-span-2"><strong>Bio:</strong> {user.bio}</div>
                      </div>
                      <div><h3 className="text-xl font-bold border-t pt-6 mt-6">Family Details</h3></div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                           <div><strong>Family Type:</strong> {user.familyDetails?.type}</div><div><strong>Father's Occupation:</strong> {user.familyDetails?.fatherOccupation}</div>
                           <div className="md:col-span-2"><strong>Description:</strong> {user.familyDetails?.description}</div>
                      </div>
                       <div><h3 className="text-xl font-bold border-t pt-6 mt-6">Lifestyle</h3></div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                           <div><strong>Diet:</strong> {user.lifestyle?.diet}</div><div><strong>Smoking:</strong> {user.lifestyle?.smoking ? 'Yes' : 'No'}</div><div><strong>Drinking:</strong> {user.lifestyle?.drinking ? 'Yes' : 'No'}</div>
                      </div>
                  </div>
              );
          case 'photos':
              return (<div>
                  <h3 className="text-xl font-bold mb-4">My Photos</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Array.from({length: 4}).map((_, i) => (
                          <img key={i} src={`https://picsum.photos/seed/${user.id + i}/400/400`} alt="user" className="rounded-lg shadow-md cursor-pointer" onClick={() => openLightbox(`https://picsum.photos/seed/${user.id + i}/800/800`)} />
                      ))}
                  </div>
              </div>);
          case 'preferences':
              return <div><h3 className="text-xl font-bold mb-4">Partner Preferences</h3><p>Form for editing partner preferences goes here.</p></div>;
          case 'quiz':
              return (<div>
                  <h3 className="text-xl font-bold mb-4">Compatibility Quiz</h3>
                  <div className="space-y-4">
                    <p><strong>1. A perfect weekend for you is:</strong><br/> <label><input type="radio" name="q1" /> A quiet night in</label> <label><input type="radio" name="q1" /> Out with friends</label></p>
                    <p><strong>2. When it comes to planning, you are:</strong><br/> <label><input type="radio" name="q2" /> Spontaneous</label> <label><input type="radio" name="q2" /> A detailed planner</label></p>
                    <Button>Submit & See Score</Button>
                  </div>
              </div>);
          default:
              return null;
      }
  }

  return (
    <div className="container mx-auto p-4 lg:p-6 bg-gray-50">
      <Modal isOpen={isLightboxOpen} onClose={() => setIsLightboxOpen(false)} title="Photo View">
          <img src={selectedImage} alt="profile" className="w-full rounded-lg" />
      </Modal>

      <div className="lg:flex lg:space-x-6">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
              <img src={user.photoUrl} alt={user.name} className="w-32 h-32 rounded-full border-4 border-white shadow-md" />
              <div className="md:ml-6 mt-4 md:mt-0">
                <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center md:justify-start">{user.name} {user.isVerified && <MdVerified className="text-blue-500 ml-2" />}</h2>
                <p className="text-gray-600">{user.age} years old from {user.location}</p>
                {user.isPremium && <span className="mt-2 inline-block bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">PREMIUM</span>}
              </div>
            </div>
            <div className="mt-8 border-b">
              <nav className="flex space-x-2 md:space-x-8 -mb-px overflow-x-auto">
                <button onClick={() => setActiveTab('profile')} className={`py-4 px-2 md:px-4 border-b-2 font-medium text-sm md:text-base ${activeTab === 'profile' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>My Profile</button>
                <button onClick={() => setActiveTab('photos')} className={`py-4 px-2 md:px-4 border-b-2 font-medium text-sm md:text-base ${activeTab === 'photos' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Photos</button>
                <button onClick={() => setActiveTab('preferences')} className={`py-4 px-2 md:px-4 border-b-2 font-medium text-sm md:text-base ${activeTab === 'preferences' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Preferences</button>
                 <button onClick={() => setActiveTab('quiz')} className={`py-4 px-2 md:px-4 border-b-2 font-medium text-sm md:text-base ${activeTab === 'quiz' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Quiz</button>
              </nav>
            </div>
            <div className="mt-8">{renderContent()}</div>
          </div>
        </div>
        <aside className="lg:w-1/3 mt-6 lg:mt-0">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Matching Suggestions</h3>
                <div className="space-y-4">
                    {mockUsers.slice(0, 4).map(suggestion => (
                       <Link to={`/profile/${suggestion.id}`} key={suggestion.id} className="flex items-center p-2 rounded-lg hover:bg-gray-100">
                           <img src={suggestion.photoUrl} alt={suggestion.name} className="w-12 h-12 rounded-full mr-4"/>
                           <div>
                               <h4 className="font-semibold">{suggestion.name}</h4>
                               <p className="text-sm text-gray-500">{suggestion.age} yrs, {suggestion.location}</p>
                           </div>
                       </Link>
                    ))}
                </div>
            </div>
        </aside>
      </div>
    </div>
  );
};

export default ProfilePage;
