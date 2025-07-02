'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CancelPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Payment Cancelled</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-yellow-600 text-4xl mb-4">⚠</div>
            <p className="mb-6">
              Your payment was cancelled. No charges were made to your account.
            </p>
            <div className="space-y-2">
              <Link href="/#pricing">
                <Button className="w-full">View Pricing Again</Button>
              </Link>
              <Link href="/">
                <Button variant="ghost" className="w-full">Back to Home</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
