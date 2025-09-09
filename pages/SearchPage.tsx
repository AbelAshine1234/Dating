import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { mockUsers } from '../data/mocks';
import Button from '../components/ui/Button';
import { MdVerified, MdFilterList, MdClose } from 'react-icons/md';

const SearchPage: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(mockUsers);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => {
      setResults(mockUsers.sort(() => Math.random() - 0.5)); // shuffle results
      setIsLoading(false);
      setIsFilterOpen(false); // Close filter on mobile after applying
    }, 1000);
  };

  const isPremium = user?.isPremium ?? false;

  const FilterSidebar = () => (
    <aside className="bg-white p-4 rounded-lg shadow-md h-fit">
      <h2 className="text-xl font-bold mb-4">Filter Profiles</h2>
      <div className="space-y-4">
        <div>
          <label className="font-semibold">Age</label>
          <input type="range" min="18" max="70" defaultValue="25" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
        </div>
        <div>
          <label className="font-semibold">Religion</label>
          <select className="w-full p-2 border rounded mt-1"><option>Any</option><option>Hindu</option></select>
        </div>
        <div>
          <label className="font-semibold">Marital Status</label>
          <div className="mt-1 space-y-1">
            <label className="flex items-center"><input type="checkbox" className="mr-2" /> Never Married</label>
            <label className="flex items-center"><input type="checkbox" className="mr-2" /> Divorced</label>
          </div>
        </div>
        <Button onClick={handleSearch} className="w-full">
          {isLoading ? 'Searching...' : 'Apply Filters'}
        </Button>
      </div>
    </aside>
  );

  return (
    <div className="container mx-auto p-4 lg:p-6">
      <div className="lg:flex lg:space-x-6">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <Button variant="secondary" onClick={() => setIsFilterOpen(!isFilterOpen)} className="w-full flex items-center justify-center">
            {isFilterOpen ? <MdClose className="mr-2" /> : <MdFilterList className="mr-2" />}
            {isFilterOpen ? 'Close Filters' : 'Filter Results'}
          </Button>
        </div>
        
        {/* Mobile Filter View (Collapsible) */}
        {isFilterOpen && (
          <div className="lg:hidden mb-6">
            <FilterSidebar />
          </div>
        )}

        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:w-1/4">
          <FilterSidebar />
        </div>

        {/* Results Grid */}
        <main className="w-full lg:w-3/4">
          {!isPremium && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md mb-6" role="alert">
              <p className="font-bold">Upgrade to Premium</p>
              <p>Get unlimited access, view contact details, and unblur all photos. <Link to="/payment" className="font-bold underline">Upgrade Now</Link></p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {results.map(profile => (
              <div key={profile.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-xl">
                <div className="relative">
                  <img
                    src={profile.photoUrl}
                    alt={profile.name}
                    className={`w-full h-64 object-cover ${!isPremium ? 'blur-md' : ''}`}
                  />
                  {!isPremium && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                      <p className="text-white font-bold text-lg">Upgrade to view</p>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold flex items-center">{profile.name} {profile.isVerified && <MdVerified className="text-blue-500 ml-2" />}</h3>
                  <p className="text-gray-600 text-sm">{profile.age} yrs, {profile.location}</p>
                  <p className="text-gray-500 text-sm">{profile.religion}, {profile.caste}</p>
                  <p className="text-gray-700 text-sm mt-2 h-10 overflow-hidden text-ellipsis">{profile.bio}</p>
                  <div className="mt-4 flex space-x-2">
                    <Link to={`/profile/${profile.id}`} className="flex-1">
                      <Button className="w-full text-sm">View Profile</Button>
                    </Link>
                    <Button variant="secondary" className="flex-1 text-sm">Send Interest</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SearchPage;
