import Image from 'next/image'
import React from 'react'
import Marquee from 'react-fast-marquee'
import { COMPANIES, MARQUEE_CONFIG, type Company } from '@/constants/companies'
import { getCompanyClassName } from '@/lib/utils'

/**
 * CompanyLogo component renders an individual company logo with proper styling.
 *
 * @param company - The company data object containing logo information
 * @returns {JSX.Element} The rendered company logo
 */
const CompanyLogo: React.FC<{ company: Company }> = ({ company }) => {
  return (
    <Image
      src={company.src}
      alt={company.alt}
      width={company.width}
      height={company.height}
      className={getCompanyClassName(company.id)}
      priority={false}
      loading='lazy'
    />
  )
}

/**
 * Companies component displays a marquee of company logos.
 * Features include hover effects, responsive design, and accessibility.
 *
 * @returns {JSX.Element} The rendered Companies component.
 */
const Companies: React.FC = () => {
  return (
    <section>
      <Marquee
        speed={MARQUEE_CONFIG.speed}
        gradient={MARQUEE_CONFIG.gradient}
        gradientColor={MARQUEE_CONFIG.gradientColor}
        gradientWidth={MARQUEE_CONFIG.gradientWidth}
        direction='left'
      >
        {COMPANIES.map(company => (
          <CompanyLogo key={company.id} company={company} />
        ))}
      </Marquee>
    </section>
  )
}

export default Companies
