import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
  updateProfile
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

// User roles
export type UserRole = 'patient' | 'doctor' | 'admin';

// User data with optional patient specific fields
export interface UserData {
  uid: string;
  email: string | null;
  displayName: string;
  role: UserRole;
  gender?: string;  // Optional field for patient
  phoneNumber?: string;  // Optional field for patient
  hospitalId?: string;   // Optional for admin
}

// Register new user
export const registerUser = async (
  email: string, 
  password: string, 
  displayName: string,
  role: UserRole = 'patient',
  additionalData: Record<string, any> = {}
): Promise<UserData> => {
  try {
    // Check if we're already authenticated - if so, sign out first
    if (auth.currentUser) {
      await firebaseSignOut(auth);
    }
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update profile with display name
    await updateProfile(user, { displayName });

    // Base userData
    const userData: UserData = {
      uid: user.uid,
      email: user.email || email,
      displayName,
      role,
      ...additionalData
    };

    // For Admin, generate hospital ID and append
    if (role === 'admin') {
      const serial = Math.floor(1000 + Math.random() * 9000);
      const pincode = additionalData.pincode || '000000';
      const hospitalId = `${serial}-${pincode}`;
      userData.hospitalId = hospitalId;
    }

    // Wait for firestore write to complete
    try {
      await setDoc(doc(db, "users", user.uid), userData);
      console.log("User document created successfully");
    } catch (firestoreError) {
      console.error("Error writing to Firestore:", firestoreError);
      throw firestoreError;
    }

    return userData;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Login user
export const loginUser = async (email: string, password: string, role: UserRole = "patient") => {
  try {
    // Don't automatically sign out on the server side to avoid hydration mismatches
    // Only sign out if we're in the browser environment
    if (typeof window !== "undefined" && auth.currentUser) {
      await firebaseSignOut(auth);
    }
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", userCredential.user.uid);

    // Verify user role
    try {
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data() as UserData;
        console.log("User data retrieved:", userData);
        
        // Check if the requested role matches the user's actual role
        if (userData.role !== role) {
          console.error("Role mismatch:", userData.role, "vs", role);
          await firebaseSignOut(auth);
          throw new Error(`You don't have ${role} access. Please sign in with the correct account type.`);
        }
        
        // Return both user and userData to provide complete context to calling component
        return {
          user: userCredential.user,
          userData: userData
        };
      } else {
        console.error("User document doesn't exist for UID:", userCredential.user.uid);
        throw new Error("User data not found. Please contact support.");
      }
    } catch (firestoreError) {
      console.error("Error checking user role:", firestoreError);
      throw firestoreError;
    }
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Sign out
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// Get current user data including role
export const getCurrentUserData = async (): Promise<UserData | null> => {
  const user = auth.currentUser;

  if (!user) {
    return null;
  }

  try {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as UserData;
    } else {
      console.error("No user data found for logged in user:", user.uid);
      return null;
    }
  } catch (error) {
    console.error("Error getting user data:", error);
    throw error;
  }
};

// Check if the user is authenticated before performing Firestore operations
export const checkAuthBeforeFirestore = async (): Promise<boolean> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user) {
        console.log("User is authenticated:", user.uid);
        resolve(true);
      } else {
        console.log("User is not authenticated");
        resolve(false);
      }
    });
  });
};
