import { auth, database } from "./auth";
import { ref, set, get, getDatabase } from "firebase/database";
import { doc, setDoc, getFirestore } from "firebase/firestore"; // Assuming you're using Firestore

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";


export const doCreateUserWithEmailAndPassword = async (email, password, firstName) => {
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Save user info to the Realtime Database
      const userRef = ref(database, 'users/' + user.uid);
      await set(userRef, {
        email: email,
        firstName: firstName
      });
  
      // Send email verification
      await sendEmailVerification(user, {
        // Customize the email verification link as needed
        url: `${window.location.origin}/home`,
      });
  
      console.log("User created, data saved to Realtime Database, and verification email sent.");
      return userCredential; // Return the userCredential for further use
    } catch (error) {
      console.error("Error creating user or sending verification email: ", error);
      throw error; // Rethrow the error if needed
    }
  };
export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// export const doSignInWithGoogle = async () => {
//   const provider = new GoogleAuthProvider();
//   const result = await signInWithPopup(auth, provider);
//   const user = result.user;

//   // add user to firestore
// };
export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const isNewUser = result.additionalUserInfo?.isNewUser;
  
      if (isNewUser) {
        // User is new, add them to Firestore
        const userDocRef = doc(getFirestore(), "users", user.uid);
        await setDoc(userDocRef, {
          email: user.email,
          name: user.displayName,
          // Add more fields as needed
        });
  
        console.log("New Google user added to Firestore");
      } else {
        // User is returning, perform any necessary checks or updates
        console.log("Existing Google user signed in");
      }
    } catch (error) {
      console.error("Error with Google sign-in: ", error);
      throw error;
    }
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



  