import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/users';

export const Register: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [caste, setCaste] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [religion, setReligion] = useState('');
  const [occupation, setOccupation] = useState('');
  const [interestsInput, setInterestsInput] = useState('');

  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 relative">
        {loading && (
          <div className="absolute inset-0 bg-white/70 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-xl">
            <div className="flex flex-col items-center gap-3">
              <div className="h-10 w-10 border-4 border-neon-purple border-t-transparent rounded-full animate-spin" />
              <div className="text-gray-700 dark:text-gray-200">Creating your account...</div>
            </div>
          </div>
        )}
        <h1 className="text-2xl font-heading mb-4 text-gray-800 dark:text-gray-100">Register</h1>
        <form onSubmit={async (e) => { 
          e.preventDefault(); 
          setError(''); 
          if (!name || !email || !password || !gender || !dateOfBirth) { 
            setError('Please fill all required fields.'); 
            return; 
          } 
          try {
            setLoading(true);
            const interests = interestsInput.split(',').map(s => s.trim()).filter(Boolean);
            const res = await registerUser({ fullName: name, email, password, gender, dateOfBirth, images, caste, religion, occupation, interests });
            dispatch(signIn({ token: res.token, user: res.user }));
            navigate('/');
          } catch (err: any) {
            setError(err?.message || 'Network error. Please try again.');
          } finally {
            setLoading(false);
          }
        }} className="space-y-4">
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-200">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Your name" className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100" />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-200">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100" />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-200">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100" />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-200">Caste (optional)</label>
            <input value={caste} onChange={(e) => setCaste(e.target.value)} type="text" placeholder="Your caste" className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100" />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-200">Religion (optional)</label>
            <input value={religion} onChange={(e) => setReligion(e.target.value)} type="text" placeholder="Your religion" className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100" />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-200">Occupation (optional)</label>
            <input value={occupation} onChange={(e) => setOccupation(e.target.value)} type="text" placeholder="Your occupation" className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100" />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-200">Interests (comma separated)</label>
            <input value={interestsInput} onChange={(e) => setInterestsInput(e.target.value)} type="text" placeholder="e.g. music, travel, cooking" className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100" />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-200">Images (optional)</label>
            <input type="file" multiple accept="image/*" onChange={(e) => { const files = Array.from(e.target.files || []) as File[]; setImages(files.slice(0, 10)); }} className="w-full" />
            <p className="text-xs text-gray-500 mt-1">You can upload up to 10 images.</p>
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-200">Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-200">Date of Birth</label>
            <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100" />
          </div>
          <button type="submit" disabled={loading} className="w-full px-4 py-2 rounded-md bg-neon-purple text-white disabled:opacity-60">{loading ? 'Creating...' : 'Create Account'}</button>
        </form>
      </div>
    </div>
  );
};


