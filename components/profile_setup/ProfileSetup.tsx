import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

interface ProfileData {
  name: string;
  last_name: string;
  age: number | null;
  gender: string;
  height: number | null;
  weight: number | null;
  disease_history: string;
}

interface ProfileSetupProps {
  onComplete: () => void;
}

export const ProfileSetup: React.FC<ProfileSetupProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    last_name: '',
    age: null,
    gender: '',
    height: null,
    weight: null,
    disease_history: '',
  });

  useEffect(() => {
    // Fetch existing profile data when component mounts
    const fetchExistingProfile = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:8000/api/v0/private/user', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          if (response.data.user.profile) {
            setProfileData(prev => ({
              ...prev,
              ...response.data.user.profile
            }));
          }
        } catch (error) {
          console.error('Failed to fetch profile:', error);
        }
      }
    };

    fetchExistingProfile();
  }, []);

  const steps = [
    {
      field: 'name',
      label: 'First Name',
      required: true,
      type: 'text',
    },
    {
      field: 'last_name',
      label: 'Last Name',
      required: true,
      type: 'text',
    },
    {
      field: 'age',
      label: 'Age',
      required: true,
      type: 'number',
    },
    {
      field: 'gender',
      label: 'Gender',
      required: true,
      type: 'select',
      options: ['male', 'female', 'other'],
    },
    {
      field: 'height',
      label: 'Height (cm)',
      required: false,
      type: 'number',
    },
    {
      field: 'weight',
      label: 'Weight (kg)',
      required: false,
      type: 'number',
    },
    {
      field: 'disease_history',
      label: 'Disease History',
      required: false,
      type: 'textarea',
    },
  ];

  const handleInputChange = (field: keyof ProfileData, value: string | number | null) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    const currentStep = steps[step];
    if (!currentStep.required) return true;
    
    const value = profileData[currentStep.field as keyof ProfileData];
    return value !== '' && value !== null;
  };

  const handleNext = async () => {
    if (step === steps.length - 1) {
      try {
        const token = localStorage.getItem('token');
        await axios.put(
          'http://localhost:8000/api/v0/private/user/profile',
          profileData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        onComplete();
      } catch (error) {
        console.error('Failed to update profile:', error);
      }
    } else {
      setStep(prev => prev + 1);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/30 flex items-center justify-center z-50">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[rgb(53,53,53)]/95 backdrop-blur-sm p-8 rounded-lg w-[500px] shadow-xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            {steps[step].label}
          </h2>

          {steps[step].type === 'select' ? (
            <select
              value={profileData[steps[step].field as keyof ProfileData] as string}
              onChange={(e) => handleInputChange(steps[step].field as keyof ProfileData, e.target.value)}
              className="w-full p-2 rounded-lg bg-[rgb(72,72,72)] text-white border-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">Select {steps[step].label}</option>
              {steps[step].options?.map((option) => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          ) : steps[step].type === 'textarea' ? (
            <textarea
              value={profileData[steps[step].field as keyof ProfileData] as string}
              onChange={(e) => handleInputChange(steps[step].field as keyof ProfileData, e.target.value)}
              className="w-full p-2 rounded-lg bg-[rgb(72,72,72)] text-white border-none focus:ring-2 focus:ring-orange-400 h-32"
              placeholder={`Enter your ${steps[step].label}`}
            />
          ) : (
            <input
              type={steps[step].type}
              value={profileData[steps[step].field as keyof ProfileData] as string}
              onChange={(e) => handleInputChange(
                steps[step].field as keyof ProfileData,
                steps[step].type === 'number' ? (e.target.value ? Number(e.target.value) : null) : e.target.value
              )}
              className="w-full p-2 rounded-lg bg-[rgb(72,72,72)] text-white border-none focus:ring-2 focus:ring-orange-400"
              placeholder={`Enter your ${steps[step].label}`}
            />
          )}

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`relative bg-gradient-to-r from-red-700 to-orange-400 p-1 rounded-full ${
                !canProceed() ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
              }`}
            >
              <div className="bg-gray-800 text-white px-8 py-2 rounded-full hover:text-orange-400 transition-colors duration-200">
                {step === steps.length - 1 ? 'Complete' : 'Next'}
              </div>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ProfileSetup; 