import React, { useState } from "react";
import "./ProfileManagement.css";
import backgroundImage from "../../assets/background1.jpg"; // 👈 Import image
import Footer from "../Footer/Footer";

const ProfileManagement = () => {
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    gender: "",
    bio: "",
    interests: "",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    isPublic: true,
  });

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (name === "photo" && files.length) {
      setProfile((prev) => ({
        ...prev,
        photo: URL.createObjectURL(files[0]),
      }));
    } else if (type === "checkbox" && name === "isPublic") {
      setProfile((prev) => ({ ...prev, isPublic: checked }));
    } else {
      setProfile((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Profile updated successfully!\nVisibility: ${profile.isPublic ? "Public" : "Private"}`);
  };

  return (
    <>
      <div
        className="profile-wrapper"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
        }}
      >
        <div className="profile-card">
          <h2>Edit Profile</h2>
          <div className="avatar-container">
            <img src={profile.photo} alt="Profile" className="avatar" />
          </div>
          <form onSubmit={handleSubmit} className="profile-form">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={profile.name}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={profile.age}
              onChange={handleChange}
              required
            />
            <select name="gender" value={profile.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
            <textarea
              name="bio"
              placeholder="Short Bio (e.g. I love hiking...)"
              value={profile.bio}
              onChange={handleChange}
            />
            <input
              type="text"
              name="interests"
              placeholder="Interests (e.g. music, movies)"
              value={profile.interests}
              onChange={handleChange}
            />
            <input type="file" name="photo" accept="image/*" onChange={handleChange} />

            <div className="toggle-switch">
              <label className="switch">
                <input
                  type="checkbox"
                  name="isPublic"
                  checked={profile.isPublic}
                  onChange={handleChange}
                />
                <span className="slider"></span>
              </label>
              <span className="toggle-label">
                {profile.isPublic ? "Public Profile" : "Private Profile"}
              </span>
            </div>

            <button type="submit">Save Changes</button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProfileManagement;
