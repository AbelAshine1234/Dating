import React from "react";

const mockUsers = [
  {
    username: "Alice",
    age: 24,
    gender: "female",
    interests: "music, hiking",
    bio: "Love to explore new places!"
  },
  {
    username: "Bob",
    age: 27,
    gender: "male",
    interests: "movies, sports",
    bio: "Movie buff and sports enthusiast."
  },
  {
    username: "Charlie",
    age: 23,
    gender: "other",
    interests: "reading, art",
    bio: "Artist and bookworm."
  }
];

const Recommendations = () => {
  return (
    <div className="recommendations-container">
      <h2>Recommended Matches</h2>
      <div className="recommendations-list">
        {mockUsers.map((user, idx) => (
          <div key={idx} className="recommendation-card">
            <h3>{user.username}</h3>
            <p><b>Age:</b> {user.age}</p>
            <p><b>Gender:</b> {user.gender}</p>
            <p><b>Interests:</b> {user.interests}</p>
            <p><b>Bio:</b> {user.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations; 