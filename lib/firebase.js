// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getFirestore, enableNetwork } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with improved settings
const db = getFirestore(app);

// Global variable to track connection issues
let firebaseConnectionIssues = false;

// Enhanced error handling and retry mechanism
const handleFirebaseError = (error) => {
  console.error('Firebase connection error:', error);
  firebaseConnectionIssues = true;
  
  // Check if it's a network error that might be resolved by retry
  if (error.code === 'unavailable' || error.message.includes('Failed to get document')) {
    console.log('Firebase temporarily unavailable, will retry...');
    return true; // Indicates retry is possible
  }
  
  return false;
};

// Function to test Firebase connectivity
const testFirebaseConnection = async () => {
  try {
    await enableNetwork(db);
    console.log('Firebase network enabled successfully');
    firebaseConnectionIssues = false;
    return true;
  } catch (error) {
    console.error('Firebase network test failed:', error);
    firebaseConnectionIssues = true;
    return false;
  }
};

// Client-side network monitoring
if (typeof window !== 'undefined') {
  // Test connection on load
  testFirebaseConnection();
  
  // Monitor network changes
  window.addEventListener('online', async () => {
    console.log('Network back online, testing Firebase...');
    await testFirebaseConnection();
  });
  
  window.addEventListener('offline', () => {
    console.log('Network offline');
    firebaseConnectionIssues = true;
  });
}

export { db, handleFirebaseError, testFirebaseConnection, firebaseConnectionIssues };
