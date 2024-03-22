import { auth, database } from "./auth";
import { ref, set, get, getDatabase } from "firebase/database";
import { doc, setDoc, getFirestore } from "firebase/firestore"; // Assuming you're using Firestore
import { isMobile } from "react-device-detect";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect
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
        // Check if the device is mobile
        if (isMobile) {
            // Use signInWithRedirect for mobile devices
            await signInWithRedirect(auth, provider);
        } else {
            // Use signInWithPopup for desktop
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            // Your existing logic to handle the user sign-in
            const userRef = ref(database, 'users/' + user.uid);
            const snapshot = await get(userRef);

            if (!snapshot.exists()) {
                // User does not exist, treat as new user
                await set(userRef, {
                    email: user.email,
                    firstName: user.displayName,
                });
                console.log("New Google user added to Realtime Database");
            } else {
                // User exists, treat as existing user
                console.log("Existing Google user signed in");
            }
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



  