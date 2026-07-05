import {
  signInWithPopup,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "./firebase";

// Google login
export const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

// Phone login - step 1: send OTP
export const setupRecaptcha = (containerId) => {
  return new RecaptchaVerifier(auth, containerId, {
    size: "invisible",
  });
};

export const sendOtp = (phoneNumber, recaptchaVerifier) => {
  // phoneNumber must be in E.164 format e.g. +91XXXXXXXXXX
  return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
};

// Phone login - step 2: verify OTP
export const verifyOtp = (confirmationResult, otp) => {
  return confirmationResult.confirm(otp);
};

// Email/password
export const signupWithEmail = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const loginWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);