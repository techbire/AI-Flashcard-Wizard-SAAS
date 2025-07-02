'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import firebaseOperations from '@/lib/firebaseOperations'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useSearchParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

interface Flashcard {
  front: string
  back: string
}

interface FlashcardSet {
  name: string
  flashcards: Flashcard[]
  userId: string
}

export default function FlashcardPage() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [flashcardSet, setFlashcardSet] = useState<FlashcardSet | null>(null)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const setId = searchParams.get('id')

  useEffect(() => {
    async function getFlashcardSet() {
      if (!setId || !user) return
      
      try {
        console.log('Fetching flashcard set:', setId)
        const data = await firebaseOperations.getFlashcardSet(setId)
        
        // Check if the flashcard set belongs to the current user
        if (data.userId === user.id) {
          setFlashcardSet(data)
          console.log('Loaded flashcard set:', data.name, 'with', data.flashcards.length, 'cards')
        } else {
          alert('You do not have permission to view this flashcard set.')
          router.push('/flashcards')
        }
      } catch (error) {
        console.error('Error fetching flashcard set:', error)
        
        if (error instanceof Error && error.message.includes('not found')) {
          alert('Flashcard set not found.')
        } else {
          alert(`Error loading flashcard set: ${error}`)
        }
        
        router.push('/flashcards')
      } finally {
        setLoading(false)
      }
    }
    
    if (isSignedIn && isLoaded) {
      getFlashcardSet()
    }
  }, [user, setId, isSignedIn, isLoaded, router])

  const handleCardClick = () => {
    setFlipped(!flipped)
  }

  const handleNextCard = () => {
    if (flashcardSet && currentCardIndex < flashcardSet.flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
      setFlipped(false)
    }
  }

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1)
      setFlipped(false)
    }
  }

  if (!isLoaded || loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Please sign in to view flashcards</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => router.push('/flashcards')}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Saved Flashcards
        </Button>
        
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">{flashcardSet?.name || 'Flashcards'}</h1>
        </div>
        
        {!flashcardSet || flashcardSet.flashcards.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No flashcards found</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Progress indicator */}
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                Card {currentCardIndex + 1} of {flashcardSet.flashcards.length}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${((currentCardIndex + 1) / flashcardSet.flashcards.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Flashcard */}
            <div className="flex justify-center">
              <div
                className="relative w-full max-w-md h-64 cursor-pointer"
                onClick={handleCardClick}
                style={{ perspective: '1000px' }}
              >
                <div
                  className={`relative w-full h-full transition-transform duration-600`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  {/* Front of card */}
                  <div
                    className="absolute inset-0 w-full h-full"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <Card className="w-full h-full bg-blue-50 dark:bg-blue-900 border-2 border-blue-200 dark:border-blue-700">
                      <CardContent className="flex items-center justify-center h-full p-6">
                        <div className="text-center">
                          <p className="text-sm text-blue-600 dark:text-blue-400 mb-2 font-medium">Question</p>
                          <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                            {flashcardSet.flashcards[currentCardIndex]?.front}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Back of card */}
                  <div
                    className="absolute inset-0 w-full h-full"
                    style={{ 
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <Card className="w-full h-full bg-green-50 dark:bg-green-900 border-2 border-green-200 dark:border-green-700">
                      <CardContent className="flex items-center justify-center h-full p-6">
                        <div className="text-center">
                          <p className="text-sm text-green-600 dark:text-green-400 mb-2 font-medium">Answer</p>
                          <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                            {flashcardSet.flashcards[currentCardIndex]?.back}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Click the card to flip it and see the answer
              </p>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-center space-x-4">
              <Button
                onClick={handlePrevCard}
                disabled={currentCardIndex === 0}
                variant="outline"
                size="lg"
              >
                Previous
              </Button>
              <Button
                onClick={handleNextCard}
                disabled={currentCardIndex === flashcardSet.flashcards.length - 1}
                variant="default"
                size="lg"
              >
                Next
              </Button>
            </div>

            {/* Study completed message */}
            {currentCardIndex === flashcardSet.flashcards.length - 1 && (
              <div className="text-center mt-8 p-6 bg-green-50 dark:bg-green-900 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                  🎉 Study Session Complete!
                </h3>
                <p className="text-green-700 dark:text-green-300 mb-4">
                  You&apos;ve reviewed all {flashcardSet.flashcards.length} cards in this set.
                </p>
                <div className="space-x-4">
                  <Button 
                    onClick={() => {
                      setCurrentCardIndex(0)
                      setFlipped(false)
                    }}
                    variant="outline"
                  >
                    Study Again
                  </Button>
                  <Button onClick={() => router.push('/flashcards')}>
                    Back to Sets
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
