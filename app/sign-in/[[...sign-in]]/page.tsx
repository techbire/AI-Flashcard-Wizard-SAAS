'use client'

import { SignIn } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Content */}
      <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <SignIn 
            routing="path"
            path="/sign-in"
            afterSignInUrl="/generate"
            signUpUrl="/sign-up"
          />
        </div>
      </div>
    </div>
  )
}
