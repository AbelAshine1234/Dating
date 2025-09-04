import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signIn, setUser } from '../store/authSlice';
import { login } from '../api/auth';
import { getProfile } from '../api/users';

export const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter email and password.');
      return;
    }
    try {
      const res = await login({ email, password });
      dispatch(signIn({ token: res.token, user: res.user }));
      try {
        const profile = await getProfile(res.token);
        dispatch(setUser(profile));
      } catch (e) {
        // profile fetch failed; proceed with login anyway
      }
      navigate('/');
    } catch (err: any) {
      const message = err?.message || 'Network error. Please try again.';
      setError(message);
    }
  };
  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-heading mb-4 text-gray-800 dark:text-gray-100">Sign in</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-200">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100" />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-200">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100" />
          </div>
          <button type="submit" className="w-full px-4 py-2 rounded-md bg-neon-purple text-white">Sign In</button>
        </form>
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
          Don’t have an account? <NavLink to="/register" className="text-neon-purple">Register</NavLink>
        </div>
      </div>
    </div>
  );
};


