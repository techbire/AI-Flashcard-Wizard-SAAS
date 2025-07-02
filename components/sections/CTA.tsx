import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { RainbowButton } from '../magicui/rainbow-button'
import { CTA_CONSTANT } from '@/constants/cta'

/**
 * Call to Action component encourages users to take action.
 *
 * @returns {JSX.Element} The rendered CTA component.
 */
const CTA = () => {
  return (
    <>
      <div className='relative flex flex-col items-center justify-center rounded-2xl py-6 bg-gradient-to-t from-teal-100/50 to-transparent dark:from-teal-500/30 overflow-hidden'>
        <h2 className='text-5xl font-light tracking-tight text-balance text-center mb-4 max-lg:text-3xl'>
          {CTA_CONSTANT.title}
        </h2>
        <p className='text-center text-muted-foreground max-lg:text-sm mb-12'>
          {CTA_CONSTANT.description}
        </p>
        <div className='flex justify-center'>
          <Link href="/generate">
            <RainbowButton className='bg-white' size='lg' variant='default'>
              {CTA_CONSTANT.buttonText} <ArrowRight className='size-4' />
            </RainbowButton>
          </Link>
        </div>
        <Image
          src={CTA_CONSTANT.image.src}
          alt={CTA_CONSTANT.image.alt}
          width={CTA_CONSTANT.image.width}
          height={CTA_CONSTANT.image.height}
          className='absolute -bottom-20 right-0 w-70 h-70 animate-float max-lg:w-50 max-lg:h-50 max-lg:-right-10 max-lg:-bottom-15 max-md:w-30 max-md:h-30 max-md:-right-2 max-md:-bottom-8 max-[380px]:hidden'
        />
      </div>
    </>
  )
}

export default CTA
