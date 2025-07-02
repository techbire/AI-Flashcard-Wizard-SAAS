import React from 'react'
import Link from 'next/link'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import Image from 'next/image'
import { FAQ_DATA } from '@/constants/faq'

/**
 * FAQ component that displays frequently asked questions in an accordion format.
 *
 * @returns {JSX.Element} The rendered FAQ component.
 */
const FAQ = () => {
  return (
    <>
      <Accordion type='single' collapsible>
        {FAQ_DATA.map(faqItem => (
          <AccordionItem
            key={faqItem.id}
            value={faqItem.id}
            className='border rounded-2xl mb-2 backdrop-blur-sm'
          >
            <AccordionTrigger className='px-6 cursor-pointer'>
              {faqItem.question}
            </AccordionTrigger>
            <AccordionContent className='px-6'>
              {faqItem.hasLink && faqItem.linkText && faqItem.linkUrl ? (
                <>
                  <Link
                    href={faqItem.linkUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='underline'
                  >
                    {faqItem.linkText}
                  </Link>{' '}
                  {faqItem.answer}
                </>
              ) : (
                faqItem.answer
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Image
        src='/images/faq/message.png'
        alt='Message'
        width={500}
        height={500}
        className='absolute top-0 right-15 w-20 h-20 -z-10 max-lg:hidden'
      />
    </>
  )
}

export default FAQ
