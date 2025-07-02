'use client'

import { cn } from '@/lib/utils'
import { Marquee } from '@/components/magicui/marquee'
import {
  InstagramLogoIcon,
  LinkedinLogoIcon,
  ThreadsLogoIcon,
  XLogoIcon,
} from '@phosphor-icons/react'
import Link from 'next/link'
import { TESTIMONIALS_CONSTANT } from '@/constants/testimonials'
import Image from 'next/image'

const reviews = TESTIMONIALS_CONSTANT.reviews

const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)

const socialIcons = {
  x: XLogoIcon,
  linkedin: LinkedinLogoIcon,
  threads: ThreadsLogoIcon,
  facebook: InstagramLogoIcon,
}

const getSocialIcon = (url: string) => {
  if (url.includes('x.com')) return socialIcons.x
  if (url.includes('linkedin')) return socialIcons.linkedin
  if (url.includes('threads')) return socialIcons.threads
  if (url.includes('facebook')) return socialIcons.facebook
  return null
}

const ReviewCard = ({
  img,
  name,
  username,
  body,
  social,
}: {
  img: string
  name: string
  username: string
  body: string
  social: string
}) => {
  const SocialIcon = getSocialIcon(social)

  return (
    <Link href={social}>
      <figure
        className={cn(
          'relative h-full w-80 cursor-pointer overflow-hidden rounded-xl border p-4',
          // light styles
          'border-gray-950/[.1] bg-gray-950/[.10] hover:bg-gray-950/[.02]',
          // dark styles
          'dark:border-gray-50/[.1] dark:bg-gray-600/[.10] dark:hover:bg-gray-600/[.15] bg-gradient-to-br dark:from-transparent dark:via-neutral-500/10 via:from-transparent'
        )}
      >
        <div className='flex justify-between'>
          <div className='flex flex-row items-center gap-2'>
            <Image
              className='rounded-full object-cover w-8 h-8 aspect-auto'
              alt='user-image'
              src={img}
              width={32}
              height={32}
            />
            <div className='flex flex-col'>
              <figcaption className='text-sm font-medium dark:text-white'>
                {name}
              </figcaption>
              <p className='text-xs text-muted-foreground font-medium dark:text-white/40'>
                {username}
              </p>
            </div>
          </div>
          {SocialIcon && (
            <SocialIcon className='size-4 hover:scale-110 transition-transform duration-500 ease-in-out text-neutral-400/80' />
          )}
        </div>
        <blockquote className='mt-2 text-sm text-muted-foreground'>
          {body}
        </blockquote>
      </figure>
    </Link>
  )
}

/**
 * MarqueeDemoVertical component displays a vertical marquee of review cards.
 *
 * @returns {JSX.Element} The rendered MarqueeDemoVertical component.
 */
export function MarqueeDemoVertical() {
  return (
    <div className='relative flex h-[400px] w-full flex-row items-center justify-center overflow-hidden'>
      <Marquee pauseOnHover vertical className='[--duration:20s]'>
        {firstRow.map(review => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee
        reverse
        pauseOnHover
        vertical
        className='[--duration:20s] max-md:hidden'
      >
        {secondRow.map(review => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee pauseOnHover vertical className='[--duration:20s] max-md:hidden'>
        {firstRow.map(review => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className='pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background'></div>
      <div className='pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background'></div>
    </div>
  )
}
