import { db } from './firebase'
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  getDoc,
  query, 
  where,
  enableNetwork
} from 'firebase/firestore'

// Retry configuration
const RETRY_ATTEMPTS = 3
const RETRY_DELAY = 1000 // 1 second

// Sleep utility
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Retry wrapper for Firebase operations
const withRetry = async (operation, retries = RETRY_ATTEMPTS) => {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await operation()
      return result
    } catch (error) {
      console.error(`Firebase operation attempt ${i + 1} failed:`, error)
      
      // Check if it's a retryable error
      const isRetryable = error.code === 'unavailable' || 
                         error.code === 'deadline-exceeded' ||
                         error.message.includes('Failed to get document') ||
                         error.message.includes('transport') ||
                         error.message.includes('network')
      
      if (!isRetryable || i === retries - 1) {
        throw error
      }
      
      // Wait before retry with exponential backoff
      const delay = RETRY_DELAY * Math.pow(2, i)
      console.log(`Retrying in ${delay}ms...`)
      await sleep(delay)
      
      // Try to re-enable network connection
      try {
        await enableNetwork(db)
      } catch (networkError) {
        console.warn('Could not re-enable network:', networkError)
      }
    }
  }
}

// Enhanced Firebase operations with retry logic
export const firebaseOperations = {
  // Save flashcard set with retry
  async saveFlashcardSet(flashcardSet) {
    return withRetry(async () => {
      console.log('Attempting to save flashcard set to Firebase...')
      const docRef = await addDoc(collection(db, 'flashcardSets'), flashcardSet)
      console.log('Flashcard set saved successfully with ID:', docRef.id)
      return docRef
    })
  },

  // Get flashcard sets with retry
  async getFlashcardSets(userId) {
    return withRetry(async () => {
      console.log('Attempting to fetch flashcard sets from Firebase...')
      const q = query(
        collection(db, 'flashcardSets'),
        where('userId', '==', userId)
      )
      const querySnapshot = await getDocs(q)
      const sets = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        // Convert Firebase Timestamp to plain JavaScript Date to avoid serialization issues
        const serializedData = {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt
        }
        sets.push(serializedData)
      })
      
      // Sort by createdAt in JavaScript instead of Firestore to avoid index requirement
      sets.sort((a, b) => {
        // Handle both Date objects and Firestore Timestamps
        const aTime = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt)
        const bTime = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt)
        return bTime - aTime // Descending order (newest first)
      })
      
      console.log('Flashcard sets fetched successfully:', sets.length, 'sets')
      return sets
    })
  },

  // Delete flashcard set with retry
  async deleteFlashcardSet(setId) {
    return withRetry(async () => {
      console.log('Attempting to delete flashcard set:', setId)
      await deleteDoc(doc(db, 'flashcardSets', setId))
      console.log('Flashcard set deleted successfully')
    })
  },

  // Get single flashcard set with retry
  async getFlashcardSet(setId) {
    return withRetry(async () => {
      const docRef = doc(db, 'flashcardSets', setId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = docSnap.data()
        // Convert Firebase Timestamp to plain JavaScript Date to avoid serialization issues
        const serializedData = {
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt
        }
        return serializedData
      } else {
        throw new Error('Flashcard set not found')
      }
    })
  },

  // Test connection
  async testConnection() {
    return withRetry(async () => {
      console.log('Testing Firebase connection...')
      const testCollection = collection(db, 'flashcardSets')
      // Simple query without orderBy to avoid index requirements
      const q = query(testCollection)
      await getDocs(q)
      console.log('Firebase connection test successful')
      return true
    }, 1) // Only try once for connection test
  }
}

export default firebaseOperations
