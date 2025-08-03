import React, { useState, useMemo } from "react";
import users from "../../data"; // adjust path
import "./MarriageSwipe.css";
import Footer from "../Footer/Footer";

const uniqueValues = (arr, key) =>
  [...new Set(arr.map((item) => item[key]))].sort();

const MarriageSwipe = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filters, setFilters] = useState({
    caste: "",
    religion: "",
    occupation: "",
    ageMin: "",
    ageMax: "",
  });

  // Filter users based on filters
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const casteMatch = filters.caste ? user.caste === filters.caste : true;
      const religionMatch = filters.religion ? user.religion === filters.religion : true;
      const occupationMatch = filters.occupation ? user.occupation === filters.occupation : true;
      const ageMinMatch = filters.ageMin ? user.age >= Number(filters.ageMin) : true;
      const ageMaxMatch = filters.ageMax ? user.age <= Number(filters.ageMax) : true;
      return casteMatch && religionMatch && occupationMatch && ageMinMatch && ageMaxMatch;
    });
  }, [filters]);

  const currentUser = filteredUsers[currentIndex];

  const handleLike = () => {
    alert(`You liked ${currentUser.name}`);
    nextUser();
  };

  const handlePass = () => {
    nextUser();
  };

  const nextUser = () => {
    if (currentIndex < filteredUsers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("No more profiles in this filter.");
      setCurrentIndex(0);
    }
  };

  // Select options for filters
  const casteOptions = uniqueValues(users, "caste");
  const religionOptions = uniqueValues(users, "religion");
  const occupationOptions = uniqueValues(users, "occupation");

  return (
    <>
      <div className="marriage-swipe-container">
        <h2 style={{ color: '#8b0000' }}>Marriage Profiles</h2>

        {/* Filters */}
        <div className="filters">
          <select
            value={filters.caste}
            onChange={(e) => setFilters({ ...filters, caste: e.target.value })}
          >
            <option value="">All Castes</option>
            {casteOptions.map((caste) => (
              <option key={caste} value={caste}>{caste}</option>
            ))}
          </select>

          <select
            value={filters.religion}
            onChange={(e) => setFilters({ ...filters, religion: e.target.value })}
          >
            <option value="">All Religions</option>
            {religionOptions.map((religion) => (
              <option key={religion} value={religion}>{religion}</option>
            ))}
          </select>

          <select
            value={filters.occupation}
            onChange={(e) => setFilters({ ...filters, occupation: e.target.value })}
          >
            <option value="">All Occupations</option>
            {occupationOptions.map((occ) => (
              <option key={occ} value={occ}>{occ}</option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Min Age"
            min="18"
            max="100"
            value={filters.ageMin}
            onChange={(e) => setFilters({ ...filters, ageMin: e.target.value })}
          />
          <input
            type="number"
            placeholder="Max Age"
            min="18"
            max="100"
            value={filters.ageMax}
            onChange={(e) => setFilters({ ...filters, ageMax: e.target.value })}
          />
        </div>

        {/* Profile Card */}
        {currentUser ? (
          <div className="profile-card">
            <img src={currentUser.image} alt={currentUser.name} />
            <h3>{currentUser.name}, {currentUser.age}</h3>
            <p><b>Occupation:</b> {currentUser.occupation}</p>
            <p><b>Caste:</b> {currentUser.caste}</p>
            <p><b>Religion:</b> {currentUser.religion}</p>
            <p className="bio">{currentUser.bio}</p>
            <div className="actions">
              <button className="pass-btn" onClick={handlePass}>✖ Pass</button>
              <button className="like-btn" onClick={handleLike}>❤️ Like</button>
            </div>
          </div>
        ) : (
          <p>No profiles match your filters.</p>
        )}
      </div>

      {/* Footer placed outside container for proper layout */}
      <Footer />
    </>
  );
};

export default MarriageSwipe;
