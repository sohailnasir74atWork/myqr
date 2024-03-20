import { auth, database } from "./auth";
import { ref, set, get, getDatabase } from "firebase/database";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useAuth } from "../context/authContext/Index";



export const doCreateUserWithEmailAndPassword = async (email, password, firstName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password, firstName);
      const user = userCredential.user;
     const userRef = ref(database, 'users/' + user.uid);
     await set(userRef, {
        email: email,
        firstName:firstName
      });
  
      console.log("User created and data saved to Realtime Database");
      return userCredential; // Return the userCredential for further use
    } catch (error) {
      console.error("Error creating user: ", error);
      throw error; // Rethrow the error if needed
    }
  };
export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  // add user to firestore
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  });
};


  