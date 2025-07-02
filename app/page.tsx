import { MarqueeDemoVertical } from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'
import CTA from '@/components/sections/CTA'
import Features from '@/components/sections/Features'
import Companies from '@/components/sections/Companies'
import Hero from '@/components/sections/Hero'
import Pricing from '@/components/sections/Pricing'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Flashcard Wizard - Smart Study Cards Generator',
  description:
    'Transform any text into intelligent flashcards with AI. Study smarter with our AI-powered flashcard generator.',
}

/**
 * Home component serves as the main entry point for the application.
 *
 * @returns {JSX.Element} The rendered Home component.
 */
export default function Home() {
  return (
    <div className='overflow-hidden'>
      <section id='home'>
        <Hero />
      </section>

      <section className='mx-auto mt-20 max-w-5xl'>
        <h2 className='section-heading'>Trusted By</h2>
        <Companies />
        <div id='features'></div>
      </section>

      <section className='mx-auto mt-20 max-w-7xl'>
        <h2 className='section-heading'>Why Choose AI Flashcard Wizard?</h2>
        <p className='section-subheading'>
          Powerful features that make studying smarter and more effective.
        </p>
        <Features />
      </section>

      <section className='max-w-7xl mx-auto my-30'>
        <h2 className='section-heading'>What Our Users Say</h2>
        <p className='section-subheading'>
          Real feedback from students and professionals using AI Flashcard Wizard.
        </p>
        <MarqueeDemoVertical />
        <div id='pricing'></div>
      </section>

      <div className='max-w-5xl mx-auto -mt-5'>
        <h2 className='section-heading'>Pricing</h2>
        <p className='section-subheading'>
          Choose a plan that fits your needs.
        </p>
        <Pricing />
      </div>

      <section className='max-w-3xl mx-auto mt-30 relative'>
        <h2 className='section-heading'>Frequently Asked Questions</h2>
        <p className='section-subheading'>
          Here are some common questions about this template.
        </p>
        <FAQ />
      </section>

      <section className='max-w-7xl mx-auto mt-30'>
        <CTA />
      </section>
    </div>
  )
}
