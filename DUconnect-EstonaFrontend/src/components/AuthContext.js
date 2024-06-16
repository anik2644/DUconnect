// authContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userCredentials, setUserCredentials] = useState(null);

  const setCredentials = (credentials) => {
    setUserCredentials(credentials);
  };

  const setProfile = (profileData, profilePhoto) => {
    setUserCredentials((prevCredentials) => ({
      ...prevCredentials,
      profile: {
        ...prevCredentials.profile,
        ...profileData,
        profile_photo: profilePhoto,
      },
    }));
  };

  return (
    <AuthContext.Provider value={{ userCredentials, setCredentials, setProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
