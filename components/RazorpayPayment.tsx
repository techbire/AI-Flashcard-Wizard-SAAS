'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface RazorpayPaymentProps {
  plan: 'basic' | 'pro'
  amount: number
  buttonText: string
}

interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  order_id: string
  theme: { color: string }
  handler: (response: RazorpayResponse) => void
  prefill?: { name?: string; email?: string; contact?: string }
}

interface RazorpayResponse {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}

interface RazorpayConstructor {
  new (options: RazorpayOptions): { open: () => void }
}

declare global {
  interface Window {
    Razorpay: RazorpayConstructor
  }
}

export default function RazorpayPayment({ plan, amount, buttonText }: RazorpayPaymentProps) {
  const [loading, setLoading] = useState(false)

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handlePayment = async () => {
    setLoading(true)
    
    try {
      // Load Razorpay script
      const res = await loadRazorpayScript()
      if (!res) {
        alert('Razorpay SDK failed to load. Please check your internet connection.')
        return
      }

      // Create order
      const endpoint = plan === 'basic' ? '/api/checkout-session-basic' : '/api/checkout-session-pro'
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      })

      if (!response.ok) {
        throw new Error('Failed to create order')
      }

      const order = await response.json()

      // Initialize Razorpay payment
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
        amount: order.amount,
        currency: order.currency,
        name: 'AI Flashcard Wizard',
        description: `${plan === 'basic' ? 'Basic' : 'Pro'} Plan Subscription`,
        order_id: order.id,
        theme: {
          color: '#F87317', // Orange theme
        },
        handler: async function (response: RazorpayResponse) {
          // Verify payment
          try {
            const verifyResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            })

            const verifyData = await verifyResponse.json()
            
            if (verifyData.success) {
              alert('Payment successful! Welcome to AI Flashcard Wizard!')
              window.location.href = '/generate'
            } else {
              alert('Payment verification failed. Please contact support.')
            }
          } catch (error) {
            console.error('Payment verification error:', error)
            alert('Payment verification failed. Please contact support.')
          }
        },
        prefill: {
          name: 'Your Name',
          email: 'your.email@example.com',
          contact: '9999999999',
        },
      }

      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button 
      onClick={handlePayment} 
      disabled={loading}
      className="w-full"
    >
      {loading ? 'Processing...' : buttonText}
    </Button>
  )
}
