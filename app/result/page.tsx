'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ResultPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    if (sessionId) {
      // Simulate payment verification
      setTimeout(() => {
        setStatus('success')
        setMessage('Payment successful! Your subscription is now active.')
      }, 2000)
    } else {
      setStatus('error')
      setMessage('No session ID found. Payment verification failed.')
    }
  }, [sessionId])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              {status === 'loading' && 'Processing Payment...'}
              {status === 'success' && 'Payment Successful!'}
              {status === 'error' && 'Payment Failed'}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            {status === 'loading' && (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            )}
            {status === 'success' && (
              <div>
                <div className="text-green-600 text-4xl mb-4">✓</div>
                <p className="mb-6">{message}</p>
                <div className="space-y-2">
                  <Link href="/generate">
                    <Button className="w-full">Start Creating Flashcards</Button>
                  </Link>
                  <Link href="/">
                    <Button variant="ghost" className="w-full">Back to Home</Button>
                  </Link>
                </div>
              </div>
            )}
            {status === 'error' && (
              <div>
                <div className="text-red-600 text-4xl mb-4">✗</div>
                <p className="mb-6">{message}</p>
                <div className="space-y-2">
                  <Link href="/#pricing">
                    <Button className="w-full">Try Again</Button>
                  </Link>
                  <Link href="/">
                    <Button variant="ghost" className="w-full">Back to Home</Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
