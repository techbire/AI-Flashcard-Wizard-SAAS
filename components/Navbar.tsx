'use client'

import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { flushSync } from 'react-dom'
import { useRef, useEffect, useState } from 'react'
import { NAVBAR_CONSTANT } from '@/constants/navbar'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const ref = useRef<HTMLButtonElement>(null)
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted on client to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = async () => {
    // Play sound effect
    const audio = new Audio(NAVBAR_CONSTANT.themeButton.soundEffect)
    audio.play()

    const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
    if (!ref.current || !('startViewTransition' in document)) {
      setTheme(nextTheme)
      return
    }
    const { top, left, width, height } = ref.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    await document.startViewTransition?.(() => {
      flushSync(() => {
        setTheme(nextTheme)
      })
    })?.ready

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: NAVBAR_CONSTANT.themeButton.transitionDuration,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      }
    )
  }
  return (
    <nav className='border max-w-3xl max-md:mx-4 mx-auto py-2 px-4 mb-16 rounded-full sticky top-5 z-10 backdrop-blur-xl'>
      <div className='flex items-center'>
        <div className='flex items-center'>
          <Image
            src={NAVBAR_CONSTANT.logo.src}
            alt={NAVBAR_CONSTANT.logo.alt}
            width={NAVBAR_CONSTANT.logo.width}
            height={NAVBAR_CONSTANT.logo.height}
            className='dark:invert'
          />
          <p className='inline-block ml-2 text-lg font-medium tracking-tight max-lg:hidden'>
            {NAVBAR_CONSTANT.companyName}
          </p>
        </div>

        <div className='flex items-center gap-2 ml-auto'>
          <div className='flex items-center gap-4 '>
            {NAVBAR_CONSTANT.navigation.map((link, index) => {
              // Show "Saved Flashcards" and "Generate" only for signed-in users
              if ((link.text === 'Saved Flashcards' || link.text === 'Generate')) {
                return (
                  <SignedIn key={index}>
                    <Link
                      href={link.href}
                      className='text-sm font-extralight'
                    >
                      {link.text}
                    </Link>
                  </SignedIn>
                )
              }
              // Show "Features" and "Pricing" for everyone
              return (
                <Link
                  key={index}
                  href={link.href}
                  className='text-sm font-extralight'
                >
                  {link.text}
                </Link>
              )
            })}
          </div>
          
          {/* Authentication Section */}
          <SignedOut>
            <Link href="/sign-in">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm">
                Sign Up
              </Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          {!mounted ? (
            // Render a placeholder button during SSR to prevent hydration mismatch
            <Button
              variant='ghost'
              size='icon'
              className='ml-2'
              disabled
              aria-label='Theme toggle loading'
            >
              <Sun className='size-5' />
            </Button>
          ) : theme === 'dark' ? (
            <Button
              variant='ghost'
              ref={ref}
              size='icon'
              className='ml-2'
              onClick={toggleTheme}
              aria-label='Switch to light mode'
            >
              <Sun className='size-5' />
            </Button>
          ) : (
            <Button
              variant='ghost'
              ref={ref}
              size='icon'
              className='ml-2'
              onClick={toggleTheme}
              aria-label='Switch to dark mode'
            >
              <Moon className='size-5' />
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
