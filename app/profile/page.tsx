"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Profile {
  age: number | null;
  disease_history: string;
  gender: string;
  height: number | null;
  id: number;
  last_name: string;
  name: string;
  username: string;
  weight: number | null;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [originalProfile, setOriginalProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found');
        return;
      }

      const response = await axios.get('http://localhost:8000/api/v0/private/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setProfile(response.data.profile);
      setOriginalProfile(response.data.profile);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to fetch profile data');
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof Profile, value: string | number | null) => {
    if (!profile) return;
    setProfile({ ...profile, [field]: value });
  };

  const hasChanges = () => {
    if (!profile || !originalProfile) return false;
    return JSON.stringify(profile) !== JSON.stringify(originalProfile);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found');
        return;
      }

      await axios.put(
        'http://localhost:8000/api/v0/private/user/profile',
        profile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setOriginalProfile(profile);
      setError('');
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  if (isLoading) return <div className="text-white text-center mt-10">Loading...</div>;
  if (!profile) return <div className="text-white text-center mt-10">No profile data found</div>;

  return (
    <div className="min-h-screen bg-dark-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-[rgb(53,53,53)] p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-8">Profile Settings</h1>
        
        {error && (
          <div className="bg-red-500 text-white p-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-[rgb(120,126,142)] font-bold mb-2">Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full p-2 rounded-lg bg-[rgb(72,72,72)] text-white border-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="block text-[rgb(120,126,142)] font-bold mb-2">Last Name</label>
              <input
                type="text"
                value={profile.last_name}
                onChange={(e) => handleInputChange('last_name', e.target.value)}
                className="w-full p-2 rounded-lg bg-[rgb(72,72,72)] text-white border-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="block text-[rgb(120,126,142)] font-bold mb-2">Age</label>
              <input
                type="number"
                value={profile.age || ''}
                onChange={(e) => handleInputChange('age', e.target.value ? Number(e.target.value) : null)}
                className="w-full p-2 rounded-lg bg-[rgb(72,72,72)] text-white border-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="block text-[rgb(120,126,142)] font-bold mb-2">Gender</label>
              <select
                value={profile.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full p-2 rounded-lg bg-[rgb(72,72,72)] text-white border-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-[rgb(120,126,142)] font-bold mb-2">Height (cm)</label>
              <input
                type="number"
                value={profile.height || ''}
                onChange={(e) => handleInputChange('height', e.target.value ? Number(e.target.value) : null)}
                className="w-full p-2 rounded-lg bg-[rgb(72,72,72)] text-white border-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="block text-[rgb(120,126,142)] font-bold mb-2">Weight (kg)</label>
              <input
                type="number"
                value={profile.weight || ''}
                onChange={(e) => handleInputChange('weight', e.target.value ? Number(e.target.value) : null)}
                className="w-full p-2 rounded-lg bg-[rgb(72,72,72)] text-white border-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-[rgb(120,126,142)] font-bold mb-2">Disease History</label>
            <textarea
              value={profile.disease_history}
              onChange={(e) => handleInputChange('disease_history', e.target.value)}
              className="w-full p-2 rounded-lg bg-[rgb(72,72,72)] text-white border-none focus:ring-2 focus:ring-orange-400 h-32"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={!hasChanges()}
              className={`relative bg-gradient-to-r from-red-700 to-orange-400 p-1 rounded-full ${
                !hasChanges() ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
              }`}
            >
              <div className="bg-gray-800 text-white px-8 py-2 rounded-full hover:text-orange-400 transition-colors duration-200">
                Save Changes
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
