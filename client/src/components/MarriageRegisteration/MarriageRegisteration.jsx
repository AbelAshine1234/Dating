import React, { useState, useEffect } from 'react';
import './MarriageRegistration.css';
import Footer from '../Footer/Footer';

const MarriageRegistration = () => {
  const [formData, setFormData] = useState({
    createdFor: '',
    fullName: '',
    email: '',
    password: '',
    gender: 'male',
    dob: '',
    age: '',
    religion: '',
    caste: '',
    education: '',
    occupation: '',
    about: '',
    profilePic: null,
    termsAccepted: false
  });

  const [errors, setErrors] = useState({});
  const [previewUrl, setPreviewUrl] = useState('');

  const casteOptions = {
    hindu: ['Brahmin', 'Kshatriya', 'Vaishya', 'Shudra', 'Dalit', 'Other'],
    muslim: ['Syed', 'Mughal', 'Pathan', 'Ansari', 'Qureshi', 'Other'],
    christian: ['RC-SC', 'RC-BC', 'RC-MBC', 'Others'],
    sikh: ['Jat', 'Khatri', 'Arora', 'Ramgarhia', 'Other'],
    buddhist: ['Navayana', 'Mahayana', 'Theravada', 'Vajrayana'],
    jain: ['Digambar', 'Shwetambar', 'Other'],
    other: ['Other']
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    if (formData.dob) {
      const age = calculateAge(formData.dob);
      setFormData((prev) => ({ ...prev, age }));
    }
  }, [formData.dob]);

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;

    if (type === 'file') {
      const file = files[0];
      setFormData(prev => ({ ...prev, profilePic: file }));
      if (file) {
        const reader = new FileReader();
        reader.onload = () => setPreviewUrl(reader.result);
        reader.readAsDataURL(file);
      } else {
        setPreviewUrl('');
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }

    // Real-time validation
    const newErrors = { ...errors };
    if (name === 'email' && value && !/^\S+@\S+\.\S+$/.test(value)) {
      newErrors.email = 'Invalid email';
    } else {
      delete newErrors.email;
    }
    if (name === 'password' && value && value.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else {
      delete newErrors.password;
    }
    setErrors(newErrors);
  };

  const handleClearPhoto = () => {
    setFormData(prev => ({ ...prev, profilePic: null }));
    setPreviewUrl('');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.createdFor) newErrors.createdFor = 'Please select for whom you’re creating this profile';
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.education.trim()) newErrors.education = 'Education is required';
    if (!formData.occupation.trim()) newErrors.occupation = 'Occupation is required';
    if (!formData.religion) newErrors.religion = 'Please select religion';
    if (!formData.caste) newErrors.caste = 'Please select caste';
    if (!formData.profilePic) newErrors.profilePic = 'Profile photo is required';
    if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept terms';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log('Submitted:', formData);
      alert('Profile created successfully!');
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <>
      <div className="marriage-registration">
        <h2>Create Marriage Profile</h2>
        <form onSubmit={handleSubmit} className="registration-form">
          {/* Profile Photo and Created For */}
          <div className="profile-header">
            <div className="photo-upload">
              <label className="photo-label">Profile Photo</label>
              <div className="upload-box">
                <input
                  type="file"
                  accept="image/*"
                  name="profilePic"
                  id="profilePic"
                  onChange={handleChange}
                  aria-label="Upload profile photo"
                />
                <label htmlFor="profilePic" className="upload-preview">
                  {previewUrl ? (
                    <>
                      <img src={previewUrl} alt="Profile preview" />
                      <span className="edit-overlay">Edit</span>
                    </>
                  ) : (
                    <span>+</span>
                  )}
                </label>
                {previewUrl && (
                  <button
                    type="button"
                    className="clear-photo-btn"
                    onClick={handleClearPhoto}
                    aria-label="Clear profile photo"
                  >
                    ✕
                  </button>
                )}
                {errors.profilePic && <p className="error">{errors.profilePic}</p>}
              </div>
            </div>
            <div className="form-group created-for">
              <label>Profile For</label>
              <select
                name="createdFor"
                value={formData.createdFor}
                onChange={handleChange}
                aria-label="Select profile creation type"
              >
                <option value="">Select</option>
                <option value="self">Self</option>
                <option value="son">Son</option>
                <option value="daughter">Daughter</option>
                <option value="relative">Relative</option>
                <option value="friend">Friend</option>
              </select>
              {errors.createdFor && <p className="error">{errors.createdFor}</p>}
            </div>
          </div>

          {/* Personal Information */}
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  aria-label="Full name"
                />
                {errors.fullName && <p className="error">{errors.fullName}</p>}
              </div>
              <div className="form-group">
                <label>Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange} aria-label="Select gender">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  aria-label="Date of birth"
                />
                {errors.dob && <p className="error">{errors.dob}</p>}
              </div>
              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  disabled
                  aria-label="Calculated age"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="form-section">
            <h3>Contact Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  aria-label="Email address"
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  aria-label="Password"
                />
                {errors.password && <p className="error">{errors.password}</p>}
              </div>
            </div>
          </div>

          {/* Professional Details */}
          <div className="form-section">
            <h3>Professional Details</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Education</label>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  placeholder="Enter education"
                  aria-label="Education"
                />
                {errors.education && <p className="error">{errors.education}</p>}
              </div>
              <div className="form-group">
                <label>Occupation</label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  placeholder="Enter occupation"
                  aria-label="Occupation"
                />
                {errors.occupation && <p className="error">{errors.occupation}</p>}
              </div>
            </div>
          </div>

          {/* Cultural Information */}
          <div className="form-section">
            <h3>Cultural Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Religion</label>
                <select
                  name="religion"
                  value={formData.religion}
                  onChange={handleChange}
                  aria-label="Select religion"
                >
                  <option value="">Select Religion</option>
                  {Object.keys(casteOptions).map((rel) => (
                    <option key={rel} value={rel}>
                      {rel.charAt(0).toUpperCase() + rel.slice(1)}
                    </option>
                  ))}
                </select>
                {errors.religion && <p className="error">{errors.religion}</p>}
              </div>
              <div className="form-group">
                <label>Caste</label>
                <select
                  name="caste"
                  value={formData.caste}
                  onChange={handleChange}
                  disabled={!formData.religion}
                  aria-label="Select caste"
                >
                  <option value="">Select Caste</option>
                  {formData.religion &&
                    casteOptions[formData.religion].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                </select>
                {errors.caste && <p className="error">{errors.caste}</p>}
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="form-section">
            <h3>About</h3>
            <div className="form-group">
              <label>About</label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
                aria-label="About yourself"
              />
            </div>
          </div>

          {/* Terms */}
          <div className="form-section terms">
            <label>
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                aria-label="Accept terms and conditions"
              />
              I agree to the <a href="/terms" target="_blank">Terms and Conditions</a>
            </label>
            {errors.termsAccepted && <p className="error">{errors.termsAccepted}</p>}
          </div>

          <button type="submit" className="submit-btn">Create Profile</button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default MarriageRegistration;