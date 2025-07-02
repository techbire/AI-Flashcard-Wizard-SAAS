'use client'

import { SignUp } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Content */}
      <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <SignUp 
            routing="path"
            path="/sign-up"
            afterSignUpUrl="/generate"
            signInUrl="/sign-in"
          />
        </div>
      </div>
    </div>
  )
}
