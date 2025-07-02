'use client'

import React from 'react'
import HeroVideoDialog from '@/components/magicui/hero-video-dialog'
import { RainbowButton } from '@/components/magicui/rainbow-button'
import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { HERO } from '@/constants/hero'

/**
 * Hero component renders the hero section of the landing page.
 *
 * @returns {JSX.Element} The rendered Hero component.
 */
const Hero = () => {
  return (
    <>
      <div className='text-center'>
        <motion.h1
          className='text-center bg-gradient-to-br dark:from-white from-black from-30% dark:to-white/40 to-black/40 bg-clip-text py-6 text-5xl font-medium leading-none tracking-tighter text-transparent text-balance sm:text-6xl md:text-7xl lg:text-8xl'
          initial={{ opacity: 0, filter: 'blur(7px)', y: 6 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 0.5, ease: 'linear' }}
        >
          {HERO.title}
        </motion.h1>
        <motion.p
          className='mb-10 text-lg tracking-tight text-muted-foreground md:text-xl text-balance text-center max-md:text-base'
          initial={{ opacity: 0, filter: 'blur(10px)', y: 6 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {HERO.description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)', y: 6 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <Link href="/generate">
            <RainbowButton className='bg-white ' size='lg' variant='default'>
              {HERO.buttonText}
              <ArrowRight className='size-4' />
            </RainbowButton>
          </Link>
        </motion.div>
      </div>

      <div className='relative mt-14'>
        <HeroVideoDialog
          className='block dark:hidden'
          animationStyle='from-center'
          videoSrc={HERO.videoConfig.videoSrc}
          thumbnailSrc={HERO.videoConfig.lightThumbnail.src}
          thumbnailAlt={HERO.videoConfig.lightThumbnail.alt}
        />
        <HeroVideoDialog
          className='hidden dark:block'
          animationStyle='from-center'
          videoSrc={HERO.videoConfig.videoSrc}
          thumbnailSrc={HERO.videoConfig.darkThumbnail.src}
          thumbnailAlt={HERO.videoConfig.darkThumbnail.alt}
        />
      </div>
    </>
  )
}

export default Hero
