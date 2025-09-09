import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { ProfileMode, SuccessStory } from '../types';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { FaStar, FaChevronDown, FaChevronUp, FaHeart } from 'react-icons/fa';
import { MdCheckCircle } from 'react-icons/md';
import { mockUsers, mockSuccessStories } from '../data/mocks';

const HomePage: React.FC = () => {
  const { mode } = useApp();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);

  const [searchForm, setSearchForm] = useState({ gender: 'Woman', ageFrom: '18', ageTo: '35', religion: 'Hindu', location: 'India' });
  const [isFormValid, setIsFormValid] = useState(true);

  useEffect(() => {
    const isValid = Object.values(searchForm).every(val => val !== '');
    setIsFormValid(isValid);
  }, [searchForm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if(isFormValid) navigate('/search');
  };
  
  const openStoryModal = (story: SuccessStory) => {
      setSelectedStory(story);
      setIsModalOpen(true);
  }

  const AccordionItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
      const [isOpen, setIsOpen] = useState(false);
      return (
          <div className="border-b">
              <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left py-4 font-semibold text-lg">
                  <span>{title}</span>
                  {isOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {isOpen && <div className="pb-4 text-gray-600 animate-fade-in-down">{children}</div>}
          </div>
      );
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-red-50 to-white pt-20 pb-12 text-center overflow-hidden min-h-[300px] md:min-h-0">
        <div className="absolute inset-0 z-0 opacity-10">
            {Array.from({length: 15}).map((_, i) => (
                <FaHeart key={i} className="absolute text-red-300 animate-float" style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    fontSize: `${Math.random() * 3 + 1}rem`,
                    animationDuration: `${Math.random() * 10 + 5}s`,
                    animationDelay: `${Math.random() * 5}s`,
                }} />
            ))}
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 animate-fade-in-up">
            {mode === ProfileMode.Marriage ? 'Find your forever' : 'Find your fun'}
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 animate-fade-in-up animation-delay-300">Discover a world beyond connections</p>
          <div className="inline-flex flex-col sm:flex-row items-center bg-white p-2 rounded-full shadow-sm mb-8 animate-fade-in-up animation-delay-500">
            <div className="flex items-center">
              <FaStar className="text-yellow-400 mr-2" />
              <span className="font-semibold text-gray-700 text-sm sm:text-base">#1 Matchmaking Service</span>
            </div>
            <span className="text-gray-500 mx-2 hidden sm:inline">|</span>
            <span className="text-red-600 font-bold text-sm sm:text-base mt-1 sm:mt-0">80 Lakh+ Success Stories</span>
          </div>

          <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-lg animate-fade-in-up animation-delay-700">
            <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 items-end">
              <div className="text-left sm:col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">I'm looking for a</label>
                <select name="gender" value={searchForm.gender} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md"><option>Woman</option><option>Man</option></select>
              </div>
              <div className="text-left sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Aged</label>
                <div className="flex space-x-2">
                  <select name="ageFrom" value={searchForm.ageFrom} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md">{Array.from({length:43}, (_,i)=> <option key={i}>{18+i}</option>)}</select>
                  <select name="ageTo" value={searchForm.ageTo} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md">{Array.from({length:43}, (_,i)=> <option key={i}>{18+i}</option>)}</select>
                </div>
              </div>
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-1">{mode === ProfileMode.Marriage ? 'Of Religion' : 'With Interests'}</label>
                <select name="religion" value={searchForm.religion} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md">{mode === ProfileMode.Marriage ? <><option>Hindu</option><option>Muslim</option></> : <><option>Travel</option><option>Movies</option></>}</select>
              </div>
               <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-1">Living in</label>
                <select name="location" value={searchForm.location} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md"><option>India</option><option>USA</option></select>
              </div>
              <Button type="submit" className="w-full sm:col-span-2 md:col-span-4 lg:col-span-1 h-[42px]" disabled={!isFormValid}>Let's Begin</Button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-10">The DateMatch Experience</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[{icon: <MdCheckCircle className="text-5xl text-green-500 mx-auto mb-4" />, title: "30-Day Money Back Guarantee", text: "Your satisfaction is our priority. Get a full refund if you're not happy."},
                  {icon: <MdCheckCircle className="text-5xl text-blue-500 mx-auto mb-4" />, title: "Blue Tick Verified Profiles", text: "Connect with genuine profiles verified by our team for your safety."},
                  {icon: <MdCheckCircle className="text-5xl text-purple-500 mx-auto mb-4" />, title: "AI-Powered Matchmaking", text: "Our advanced AI finds you the most compatible matches based on your preferences."}].map(item => (
                    <div key={item.title} className="p-6 bg-white rounded-lg shadow transition-all duration-300 hover:shadow-xl hover:scale-105">
                        {item.icon}
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.text}</p>
                    </div>
                  ))}
              </div>
          </div>
      </section>

      <section className="py-16">
          <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-10">Happy Stories</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {mockSuccessStories.slice(0, 4).map(story => (
                      <div key={story.id} onClick={() => openStoryModal(story)} className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105 cursor-pointer">
                          <img src={story.imageUrl} alt={story.names} className="w-full h-56 object-cover" />
                          <div className="p-4">
                              <h3 className="font-bold">{story.names}</h3>
                              <p className="text-gray-600 text-sm mt-2 line-clamp-2">{story.story}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>
      
      <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-10">Featured Matches</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {mockUsers.slice(5, 9).map(user => (
                      <div key={user.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-xl">
                          <img src={user.photoUrl} alt={user.name} className="w-full h-64 object-cover" />
                          <div className="p-4">
                              <h3 className="text-lg font-bold">{user.name}</h3>
                              <p className="text-gray-600 text-sm">{user.age} yrs, {user.location}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Frequently Asked Questions</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <AccordionItem title="Why should I choose DateMatch?">DateMatch is the leading matchmaking service with millions of success stories. We offer verified profiles, advanced matchmaking technology, and dedicated customer support to help you find your perfect partner.</AccordionItem>
            <AccordionItem title="What's the difference between 'Marriage' and 'Dating' modes?">'Marriage' mode is for users seeking a lifelong partner, with detailed profiles focusing on family, religion, and community. 'Dating' mode is for those looking for more casual or serious relationships, with a focus on interests and lifestyle.</AccordionItem>
            <AccordionItem title="Is my information secure on DateMatch?">Absolutely. We use industry-standard security measures to protect your data. Your privacy is our utmost priority, and you have full control over who sees your information.</AccordionItem>
          </div>
        </div>
      </section>

      {selectedStory && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedStory.names}>
            <div className="text-center">
                <img src={selectedStory.imageUrl} alt={selectedStory.names} className="w-48 h-48 rounded-full mx-auto mb-4 object-cover" />
                <p className="text-gray-600 italic">{selectedStory.fullStory}</p>
            </div>
        </Modal>
      )}
    </div>
  );
};

export default HomePage;
