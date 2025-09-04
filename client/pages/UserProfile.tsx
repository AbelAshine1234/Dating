import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { getUserById } from '../api/users';

export const UserProfile: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      if (!token) {
        navigate('/signin');
        return;
      }
      try {
        setLoading(true);
        setError('');
        const u = await getUserById(token, Number(id));
        setUser(u);
      } catch (e: any) {
        setError(e?.message || 'Failed to load user');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, token, navigate]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-neon-purple border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-center text-red-600">{error}</div>;
  }

  if (!user) return null;

  const pictures = user.Pictures || user.pictures || [];
  const age = user.dateOfBirth ? Math.max(0, Math.floor((Date.now() - new Date(user.dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000))) : undefined;

  return (
    <div className="flex-1 p-4 max-w-4xl mx-auto">
      <button onClick={() => navigate(-1)} className="mb-4 text-neon-purple">Back</button>
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <img src={(pictures[0]?.url) || 'https://picsum.photos/400'} alt={user.fullName} className="w-full h-64 object-cover rounded-xl shadow" />
            {pictures.length > 1 && (
              <div className="grid grid-cols-3 gap-2 mt-3">
                {pictures.slice(1, 7).map((p: any, idx: number) => (
                  <img key={idx} src={p.url} alt="" className="w-full h-20 object-cover rounded-md" />
                ))}
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl md:text-3xl font-heading text-gray-900 dark:text-gray-100">{user.fullName}</h1>
              {age !== undefined && <span className="text-sm md:text-base text-gray-600 dark:text-gray-300">{age} yrs</span>}
            </div>
            <div className="mt-1 text-gray-600 dark:text-gray-300">{user.gender?.toUpperCase()} • {user.lookingFor?.toUpperCase()}</div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              {user.occupation && <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100">Occupation: {user.occupation}</div>}
              {user.religion && <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100">Religion: {user.religion}</div>}
              {user.caste && <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100">Caste: {user.caste}</div>}
              {user.education && <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100">Education: {user.education}</div>}
              {user.dateOfBirth && <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100">DOB: {user.dateOfBirth}</div>}
            </div>

            {user.description && <p className="mt-4 text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">{user.description}</p>}

            {Array.isArray(user.interests) && user.interests.length > 0 && (
              <div className="mt-4">
                <div className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Interests</div>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((it: string, idx: number) => (
                    <span key={idx} className="px-2 py-1 rounded-full bg-neon-purple/10 text-neon-purple border border-neon-purple/30 text-sm">{it}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


