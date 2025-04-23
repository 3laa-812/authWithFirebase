import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  updateEmail,
} from "firebase/auth";
import auth from "../firebase";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email, password) => {
    try {
      console.log("Attempting to sign up with:", { email });
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Signup successful:", result);
      return result;
    } catch (error) {
      console.error("Signup error in AuthProvider:", {
        code: error.code,
        message: error.message,
        fullError: error,
      });
      throw error;
    }
  };
  const logOut = () => {
    return signOut(auth);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const updateUserEmail = async (newEmail) => {
    try {
      if (!auth.currentUser) {
        throw new Error("No user is currently signed in");
      }

      if (!newEmail || !newEmail.includes('@')) {
        throw new Error("Please enter a valid email address");
      }

      await updateEmail(auth.currentUser, newEmail);
      return { success: true };
    } catch (error) {
      console.error("Email update error:", error);
      throw error;
    }
  };

  const updateUserPassword = async (newPassword) => {
    try {
      if (!auth.currentUser) {
        throw new Error("No user is currently signed in");
      }

      if (!newPassword || newPassword.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }

      await updatePassword(auth.currentUser, newPassword);
      return { success: true };
    } catch (error) {
      console.error("Password update error:", error);
      throw error;
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signup,
        logOut,
        signIn,
        resetPassword,
        updateUserEmail,
        updateUserPassword,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
