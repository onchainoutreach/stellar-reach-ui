
import { useState, useEffect } from 'react';

interface ProfileData {
  fullName: string;
  position: string;
  socialHandle: string;
  avatarUrl: string;
}

const PROFILE_STORAGE_KEY = 'stellarreach_profile';

export const useProfile = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: '',
    position: '',
    socialHandle: '',
    avatarUrl: ''
  });

  // Load profile data from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        setProfileData(parsed);
      } catch (error) {
        console.error('Error parsing saved profile:', error);
      }
    }
  }, []);

  const updateProfile = (newData: Partial<ProfileData>) => {
    const updatedData = { ...profileData, ...newData };
    setProfileData(updatedData);
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updatedData));
  };

  return {
    profileData,
    updateProfile
  };
};
