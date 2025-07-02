export interface Company {
  id: string
  name: string
  src: string
  alt: string
  width: number
  height: number
}

export const COMPANIES: Company[] = [
  {
    id: 'github',
    name: 'GitHub',
    src: '/images/companies/GitHub.svg',
    alt: 'GitHub logo',
    width: 50,
    height: 50,
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    src: '/images/companies/Microsoft.svg',
    alt: 'Microsoft logo',
    width: 50,
    height: 50,
  },
  {
    id: 'notion',
    name: 'Notion',
    src: '/images/companies/Notion.svg',
    alt: 'Notion logo',
    width: 50,
    height: 50,
  },
  {
    id: 'google',
    name: 'Google',
    src: '/images/companies/Google.svg',
    alt: 'Google logo',
    width: 50,
    height: 50,
  },
  {
    id: 'uber',
    name: 'Uber',
    src: '/images/companies/Uber.svg',
    alt: 'Uber logo',
    width: 50,
    height: 50,
  },
  {
    id: 'amazon',
    name: 'Amazon',
    src: '/images/companies/amazon.webp',
    alt: 'Amazon logo',
    width: 50,
    height: 50,
  },
]

export const MARQUEE_CONFIG = {
  speed: 40,
  gradient: true,
  gradientColor: 'white dark:black',
  gradientWidth: 400,
} as const
