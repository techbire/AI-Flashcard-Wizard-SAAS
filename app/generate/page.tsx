'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useUser } from '@clerk/nextjs'
import firebaseOperations from '@/lib/firebaseOperations'
import FirebaseConnectionStatus from '@/components/FirebaseConnectionStatus'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

interface Flashcard {
  front: string
  back: string
}

interface FlashcardSet {
  id?: string
  name: string
  flashcards: Flashcard[]
  userId: string
  createdAt: Date
}

export default function GeneratePage() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [flipped, setFlipped] = useState<boolean[]>([])
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [setName, setSetName] = useState('')
  const [saving, setSaving] = useState(false)
  const { user } = useUser()
  const router = useRouter()

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert('Please enter some text to generate flashcards.')
      return
    }

    setLoading(true)
    try {
      console.log('Sending request to generate flashcards...')
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text.trim() }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate flashcards')
      }

      const result = await response.json()
      console.log('Received response:', result)
      
      if (result.flashcards && Array.isArray(result.flashcards) && result.flashcards.length > 0) {
        setFlashcards(result.flashcards)
        setFlipped(new Array(result.flashcards.length).fill(false))
        console.log('Successfully generated', result.flashcards.length, 'flashcards')
      } else {
        throw new Error('No flashcards generated')
      }
    } catch (error) {
      console.error('Error generating flashcards:', error)
      alert(`An error occurred while generating flashcards: ${error}`)
    }
    setLoading(false)
  }

  const handleSaveFlashcards = async () => {
    if (!user) {
      alert('Please sign in to save flashcards.')
      return
    }

    if (!setName.trim()) {
      alert('Please enter a name for your flashcard set.')
      return
    }

    if (flashcards.length === 0) {
      alert('No flashcards to save.')
      return
    }

    setSaving(true)
    try {
      console.log('Saving flashcards to Firebase...')
      const flashcardSet: Omit<FlashcardSet, 'id'> = {
        name: setName.trim(),
        flashcards: flashcards,
        userId: user.id,
        createdAt: new Date(),
      }

      const docRef = await firebaseOperations.saveFlashcardSet(flashcardSet)
      console.log('Flashcards saved with ID:', docRef.id)
      alert('Flashcards saved successfully!')
      setSetName('')
      
      // Redirect to saved flashcards page after 1 second
      setTimeout(() => {
        router.push('/flashcards')
      }, 1000)
    } catch (error) {
      console.error('Error saving flashcards:', error)
      
      let errorMessage = 'Failed to save flashcards. '
      
      if (error instanceof Error) {
        if (error.message.includes('permission-denied')) {
          errorMessage += 'Permission denied. Please check your authentication.'
        } else if (error.message.includes('network') || error.message.includes('offline')) {
          errorMessage += 'Network error. Please check your internet connection and try again.'
        } else if (error.message.includes('quota')) {
          errorMessage += 'Storage quota exceeded. Please contact support.'
        } else {
          errorMessage += error.message
        }
      } else {
        errorMessage += 'An unknown error occurred. Please try again.'
      }
      
      alert(errorMessage)
    }
    setSaving(false)
  }

  const handleCardClick = (id: number) => {
    setFlipped((prev) => {
      const newFlipped = [...prev]
      newFlipped[id] = !newFlipped[id]
      return newFlipped
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => router.push('/')}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>
        
        <h1 className="text-3xl font-bold text-center mb-8">Generate Flashcards</h1>
        
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Enter Your Study Material</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your notes, textbook content, or any study material here..."
                className="w-full h-40 p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="mt-4 flex justify-center">
                <Button 
                  onClick={handleSubmit} 
                  disabled={loading}
                  className="px-8 py-2"
                >
                  {loading ? 'Generating...' : 'Generate Flashcards'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {flashcards.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Generated Flashcards</h2>
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  value={setName}
                  onChange={(e) => setSetName(e.target.value)}
                  placeholder="Name your flashcard set..."
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button 
                  onClick={handleSaveFlashcards} 
                  disabled={saving || !user}
                  variant="outline"
                >
                  {saving ? 'Saving...' : 'Save Flashcards'}
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {flashcards.map((flashcard, index) => (
                <div
                  key={index}
                  className="relative h-48 cursor-pointer"
                  onClick={() => handleCardClick(index)}
                  style={{ perspective: '1000px' }}
                >
                  <div
                    className={`relative w-full h-full transition-transform duration-600 ${
                      flipped[index] ? 'rotate-y-180' : ''
                    }`}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Front of card */}
                    <div 
                      className="absolute inset-0 w-full h-full"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <Card className="w-full h-full">
                        <CardContent className="flex items-center justify-center h-full p-4">
                          <div className="text-center">
                            <p className="text-sm text-gray-500 mb-2">Question</p>
                            <p className="text-lg">{flashcard.front}</p>
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
                      <Card className="w-full h-full bg-blue-50 dark:bg-blue-900">
                        <CardContent className="flex items-center justify-center h-full p-4">
                          <div className="text-center">
                            <p className="text-sm text-gray-500 mb-2">Answer</p>
                            <p className="text-lg">{flashcard.back}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
      
      <FirebaseConnectionStatus />
    </div>
  )
}
