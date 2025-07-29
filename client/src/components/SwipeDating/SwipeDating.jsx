import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './SwipeDating.css';

const dummyProfiles = [
  {
    id: 1, name: 'Liya', age: 25, gender: 'female', caste: 'Brahmin',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    bio: 'Loves hiking and photography. Looking for a genuine connection.'
  },
  {
    id: 2, name: 'Abel', age: 29, gender: 'male', caste: 'Christian',
    image: 'https://randomuser.me/api/portraits/men/66.jpg',
    bio: 'Coffee snob ☕ | Techie 👨‍💻 | Dog person 🐶'
  },
  {
    id: 3, name: 'Sara', age: 23, gender: 'female', caste: 'OBC',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'Artist 🎨 | Bookworm 📚 | Let’s get tacos 🌮'
  },
  {
    id: 4, name: 'Ravi', age: 27, gender: 'male', caste: 'Dalit',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    bio: 'Entrepreneur 🚀 | Loves chai 🍵 | Into space tech'
  },
  {
    id: 5, name: 'Kavya', age: 26, gender: 'female', caste: 'Jain',
    image: 'https://randomuser.me/api/portraits/women/38.jpg',
    bio: 'Gamer 🎮 | Vegan 🌱 | Mountain lover 🏔️'
  },
  {
    id: 6, name: 'Rahul', age: 30, gender: 'male', caste: 'Brahmin',
    image: 'https://randomuser.me/api/portraits/men/24.jpg',
    bio: 'Meditator 🧘 | Runner 🏃 | Bollywood addict 🎬'
  },
  {
    id: 7, name: 'Pooja', age: 28, gender: 'female', caste: 'Muslim',
    image: 'https://randomuser.me/api/portraits/women/21.jpg',
    bio: 'Poet ✍️ | History nerd 🏺 | Introvert'
  },
  // Add more profiles as needed, total 20+
];

const casteOptions = [
  '', 'Brahmin', 'Kshatriya', 'Vaishya', 'Shudra',
  'Dalit', 'OBC', 'Muslim', 'Christian', 'Sikh', 'Jain', 'Parsi'
];

const SwipeDating = () => {
  const [current, setCurrent] = useState(0);
  const [liked, setLiked] = useState([]);
  const [passed, setPassed] = useState([]);
  const [filters, setFilters] = useState({
    gender: '', minAge: '', maxAge: '', keyword: '', caste: ''
  });

  const navigate = useNavigate();

  const filteredProfiles = useMemo(() => {
    return dummyProfiles.filter(p => {
      const matchGender = filters.gender ? p.gender === filters.gender : true;
      const matchMinAge = filters.minAge ? p.age >= parseInt(filters.minAge) : true;
      const matchMaxAge = filters.maxAge ? p.age <= parseInt(filters.maxAge) : true;
      const matchKeyword = filters.keyword
        ? p.bio.toLowerCase().includes(filters.keyword.toLowerCase())
        : true;
      const matchCaste = filters.caste ? p.caste === filters.caste : true;
      return matchGender && matchMinAge && matchMaxAge && matchKeyword && matchCaste;
    });
  }, [filters]);

  const profile = filteredProfiles[current];

  const handleLike = () => {
    setLiked([...liked, profile]);
    nextProfile();
  };

  const handlePass = () => {
    setPassed([...passed, profile]);
    nextProfile();
  };

  const nextProfile = () => {
    if (current < filteredProfiles.length - 1) {
      setCurrent(current + 1);
    } else {
      alert('No more profiles');
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setCurrent(0);
    setFilters({ ...filters, [name]: value });
  };

  const handleVideoCall = (profile) => {
    navigate('/video-chat', { state: { userToCall: profile } });
  };

  const handleChat = (profile) => {
    navigate('/chat', { state: { chatUser: profile } });
  };

  return (
    <div className="swipe-container">
      <h2>❤️ Discover Profiles</h2>

      <div className="filters">
        <select name="gender" value={filters.gender} onChange={handleFilterChange}>
          <option value="">All Genders</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
        <select name="caste" value={filters.caste} onChange={handleFilterChange}>
          <option value="">All Castes</option>
          {casteOptions.filter(c => c).map(caste => (
            <option key={caste} value={caste}>{caste}</option>
          ))}
        </select>
        <input
          name="minAge"
          type="number"
          placeholder="Min Age"
          value={filters.minAge}
          onChange={handleFilterChange}
        />
        <input
          name="maxAge"
          type="number"
          placeholder="Max Age"
          value={filters.maxAge}
          onChange={handleFilterChange}
        />
        <input
          name="keyword"
          type="text"
          placeholder="Keyword (e.g. chai, hiking)"
          value={filters.keyword}
          onChange={handleFilterChange}
        />
      </div>

      {profile ? (
        <div className="profile-card">
          <img src={profile.image} alt={profile.name} />
          <h3>{profile.name}, {profile.age}</h3>
          <p className="bio">{profile.bio}</p>
          <p className="caste-label">Caste: {profile.caste}</p>
          <div className="actions">
            <button className="pass-btn" onClick={handlePass}>✖ Pass</button>
            <button className="like-btn" onClick={handleLike}>❤️ Like</button>
            <button className="video-call-btn" onClick={() => handleVideoCall(profile)}>📞 Video Call</button>
            <button className="chat-btn" onClick={() => handleChat(profile)}>💬 Chat</button>
          </div>
        </div>
      ) : (
        <p className="end-msg">No profiles match your filters!</p>
      )}
    </div>
  );
};

export default SwipeDating;
