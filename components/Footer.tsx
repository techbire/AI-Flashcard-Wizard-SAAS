'use client'

import {
  InstagramLogoIcon,
  LinkedinLogoIcon,
  ThreadsLogoIcon,
  XLogoIcon,
} from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FOOTER_CONSTANT } from '@/constants/footer'

const Footer = () => {
  return (
    <footer className='p-8 mt-20 text-center max-w-7xl mx-auto'>
      <div className='flex items-center justify-between max-lg:flex-col max-lg:items-start max-lg:gap-10'>
        <div className='flex flex-col items-start max-w-lg'>
          <div className='flex items-center mb-2'>
            <Image
              src={FOOTER_CONSTANT.logo.src}
              alt={FOOTER_CONSTANT.logo.alt}
              width={FOOTER_CONSTANT.logo.width}
              height={FOOTER_CONSTANT.logo.height}
              className='rounded-full mb-2 dark:invert'
            />
            <span className='text-xl font-semibold ml-2'>
              {FOOTER_CONSTANT.companyName}
            </span>
          </div>
          <p className='text-base text-left text-muted-foreground font-extralight'>
            {FOOTER_CONSTANT.description}
          </p>
          <div className='flex items-center mt-4 text-gray-600 dark:text-gray-300/80'>
            <Link
              href={FOOTER_CONSTANT.socialLinks.twitter.href}
              className='social-link'
              aria-label={FOOTER_CONSTANT.socialLinks.twitter.ariaLabel}
            >
              <XLogoIcon className='social-icon' />
            </Link>
            <Link
              href={FOOTER_CONSTANT.socialLinks.linkedin.href}
              className='social-link-with-margin'
              aria-label={FOOTER_CONSTANT.socialLinks.linkedin.ariaLabel}
            >
              <LinkedinLogoIcon className='social-icon' />
            </Link>
            <Link
              href={FOOTER_CONSTANT.socialLinks.instagram.href}
              className='social-link-with-margin'
              aria-label={FOOTER_CONSTANT.socialLinks.instagram.ariaLabel}
            >
              <InstagramLogoIcon className='social-icon' />
            </Link>
            <Link
              href={FOOTER_CONSTANT.socialLinks.threads.href}
              className='social-link-with-margin'
              aria-label={FOOTER_CONSTANT.socialLinks.threads.ariaLabel}
            >
              <ThreadsLogoIcon className='social-icon' />
            </Link>
          </div>
        </div>
        <div className='grid grid-cols-3 gap-10 text-left'>
          {FOOTER_CONSTANT.navigation.map((section, index) => (
            <div key={index}>
              <h3 className='text-xl mb-3'>{section.title}</h3>
              <ul className='text-base text-muted-foreground space-y-2.5 tracking-tight font-extralight'>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className='cursor-pointer hover:text-foreground transition-colors duration-200'
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <hr className='my-6 border-gray-200 dark:border-gray-700' />
      <div className='flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground font-extralight'>
        <span className='text-center md:text-left'>
          {FOOTER_CONSTANT.copyright}
        </span>
        <div className='flex flex-wrap justify-center md:justify-end items-center gap-3 md:space-x-4'>
          {FOOTER_CONSTANT.legalLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={`cursor-pointer hover:text-foreground transition-colors duration-200 ${index > 0 ? 'md:ml-4' : ''}`}
            >
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
