import React, { createContext, useContext, useEffect, useState } from 'react';
// 🟢 Import Firebase auth and the necessary Firestore functions
import { auth, db, doc, getDoc } from '../../utility/fierbase'; // Adjust path as necessary

// Create the Context object
const AuthContext = createContext();

// Custom hook to easily use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null); // To store Firestore data (role, name, etc.)

  // Function to fetch user's Firestore profile data
  const fetchUserProfile = async (user) => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        setUserProfile(userDoc.data());
      } else {
        console.warn("User document not found in Firestore for UID:", user.uid);
        setUserProfile(null);
      }
    } else {
      setUserProfile(null);
    }
  };

  useEffect(() => {
    // 1. Subscribe to Firebase Auth state changes
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      
      // 2. Fetch the Firestore profile when a user logs in
      if (user) {
        await fetchUserProfile(user);
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    // 3. Cleanup subscription on unmount
    return unsubscribe;
  }, []); // Run only once on component mount

  // You can expose login/logout/signup functions here if preferred, 
  // but for now, we'll keep the core state.

  const value = {
    currentUser,
    userProfile, // 🟢 Provides the user's role and profile data
    loading,
    fetchUserProfile, // Optionally expose for manual refresh
  };

  // Only render children when the loading check is complete
  return (
    <AuthContext.Provider value={value}>
      {!loading && children} 
    </AuthContext.Provider>
  );
};