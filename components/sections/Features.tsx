import Image from 'next/image'
import React from 'react'
import { FEATURES } from '@/constants/features'

/**
 * Features component displays a grid of feature cards with images and descriptions.
 *
 * @returns {JSX.Element} The rendered Features component.
 */
const Features = () => {
  return (
    <>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto'>
        <div className='relative col-span-1 md:col-span-1 lg:col-span-1 rounded-xl p-4 group hover:shadow-lg duration-300 h-60 bg-gradient-to-br via-teal-300/10 from-teal-300/20 dark:from-teal-500/30 to-transparent overflow-hidden cursor-pointer'>
          <p className='max-lg:text-right text-left text-lg font-light tracking-tight transition-transform duration-300 group-hover:translate-x-1.5'>
            {FEATURES[0].title}
          </p>
          <p className='max-lg:text-right text-left text-sm mb-10 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1.5'>
            {FEATURES[0].description}
          </p>
          <Image
            src={FEATURES[0].src}
            alt={FEATURES[0].title}
            width={800}
            height={800}
            className='absolute max-lg:right-4 right-10 w-40 max-lg:w-[90%] top-26 mx-auto mt-2 group-hover:-translate-y-2 rounded-xl transition-transform duration-300 ease-in-out opacity-80'
          />
        </div>
        <div className='relative col-span-1 md:col-span-2 lg:col-span-2 group hover:shadow-xl rounded-md p-4 h-60 bg-gradient-to-bl via-rose-300/10 from-rose-300/20 dark:from-rose-500/30 to-transparent overflow-hidden cursor-pointer'>
          <p className=' text-right text-lg font-light tracking-tight transition-transform duration-300 group-hover:-translate-x-1.5'>
            {FEATURES[1].title}
          </p>
          <p className='text-right text-sm text-muted-foreground transition-transform duration-300 group-hover:-translate-x-1.5'>
            {FEATURES[1].description}
          </p>
          <Image
            src={FEATURES[1].src}
            alt={FEATURES[1].title}
            width={800}
            height={800}
            className='absolute h-85 w-[90%] right-4  max-lg:top-26 top-20 mx-auto object-cover mt-2 group-hover:-translate-y-2 rounded-xl transition-transform duration-300 ease-in-out opacity-80'
          />
        </div>
        <div className='relative col-span-1 md:col-span-2 group hover:shadow-xl rounded-md p-4 bg-gradient-to-br via-amber-300/10 from-amber-300/20 dark:from-amber-500/50 to-transparent overflow-hidden h-60 cursor-pointer'>
          <p className='max-lg:text-right text-left text-lg font-light tracking-tight transition-transform duration-300 group-hover:translate-x-1.5'>
            {FEATURES[2].title}
          </p>
          <p className='max-lg:text-right text-left text-sm text-muted-foreground transition-transform duration-300 group-hover:translate-x-1.5'>
            {FEATURES[2].description}
          </p>
          <Image
            src={FEATURES[2].src}
            alt={FEATURES[2].title}
            width={800}
            height={800}
            className='absolute h-45 w-[90%] right-4 lg:left-4 lg:right-10 max-lg:top-26 top-20 mx-auto object-cover mt-2 group-hover:-translate-y-2 rounded-xl transition-transform duration-300 ease-in-out opacity-80'
          />
        </div>
        <div className='relative col-span-1 md:col-span-1 lg:col-span-1 rounded-xl p-4 group hover:shadow-lg duration-300 h-60 bg-gradient-to-tl  via-sky-300/10 from-sky-500/30 dark:from-sky-500/50 to-transparent overflow-hidden cursor-pointer'>
          <p className='max-lg:text-right text-left text-lg font-light tracking-tight transition-transform duration-300 group-hover:translate-x-1.5'>
            {FEATURES[3].title}
          </p>
          <p className='max-lg:text-right text-left text-sm mb-10 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1.5'>
            {FEATURES[3].description}
          </p>
          <Image
            src={FEATURES[3].src}
            alt={FEATURES[3].title}
            width={800}
            height={800}
            className='absolute max-lg:right-4 right-10  max-lg:w-[90%] w-40 top-26 mx-auto mt-2 group-hover:-translate-y-2 rounded-xl transition-transform duration-300 ease-in-out opacity-80'
          />
        </div>
      </div>
    </>
  )
}

export default Features
