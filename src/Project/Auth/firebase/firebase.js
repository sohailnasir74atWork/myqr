// Firebase imports
import { auth, database } from "./auth";
import { ref, set, get } from "firebase/database";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  updateProfile,
  deleteUser
} from "firebase/auth";

// Function to create a user with email and password
export const doCreateUserWithEmailAndPassword = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userRef = ref(database, 'users/' + user.uid);
    await set(userRef, {
      email: email,
      displayName: displayName
    });
    await sendEmailVerification(user);
    console.log("User created and verification email sent.");
    return userCredential; // Return the userCredential for further use
  } catch (error) {
    console.error("Error creating user: ", error);
    throw error;
  }
};

// Function to sign in with email and password
export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Function to sign in with Google
export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    // Additional steps to save or update the user's data in your database
    console.log("Google sign-in successful");
    return result.user;
  } catch (error) {
    console.error("Error with Google sign-in: ", error);
    throw error;
  }
};

// Function to sign out
export const doSignOut = () => {
  return signOut(auth);
};

// Function to send password reset email
export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

// Function to change password
export const doPasswordChange = (password) => {
  const user = auth.currentUser;
  return updatePassword(user, password);
};

// Function for Google-signed-in users to set a password
export const doSetPasswordForGoogleUser = async (newPassword) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("No user logged in");
  }
  
  // Assuming the user does not have an email/password credential yet and wants to set it
  try {
    const credential = EmailAuthProvider.credential(user.email, newPassword);
    await updatePassword(user, newPassword); // This updates the password for the user
    console.log("Password set for Google user.");
  } catch (error) {
    console.error("Error setting password for Google user: ", error);
    throw error;
  }
};

// Add more authentication functions as needed
export const checkUserSignInMethod = () => {
  const user = auth.currentUser;
  if (user) {
    // Check each provider the user has used
    user.providerData.forEach((provider) => {
      if (provider.providerId === 'password') {
        console.log('User signed in with Email/Password');
      } else if (provider.providerId === 'google.com') {
        console.log('User signed in with Google');
      }
      // Add more else if blocks for other providers like Facebook, Twitter, etc.
    });
  } else {
    console.log('No user is signed in.');
  }
};
export const doReauthenticateWithCredential = async (currentPassword) => {
  const user = auth.currentUser;
  console.log(user)
  console.log(user)
  const credential = EmailAuthProvider.credential(user.email, currentPassword);
  try {
    await reauthenticateWithCredential(user, credential);
    console.log('User reauthenticated successfully.');
  } catch (error) {
    console.error('Error reauthenticating user:', error);
    throw error;
  }
};

// Function to update the user's email
export const doUpdateEmail = async (newEmail) => {
  const user = auth.currentUser;
  try {
    await updateEmail(user, newEmail);
    console.log('Email updated successfully.');
  } catch (error) {
    console.error('Error updating email:', error);
    throw error;
  }
};

// Function to update the user's profile
export const doUpdateProfile = async (displayName, photoURL) => {
  const user = auth.currentUser;
  try {
    console.log(displayName)
    await updateProfile(user, { displayName, photoURL });
   console.log(user)
    console.log('Profile updated successfully.');
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// Function to delete the user
export const doDeleteUser = async () => {
  const user = auth.currentUser;
  try {
    await deleteUser(user);
    console.log('User deleted successfully.');
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};