import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getCompanyClassName = (companyId: string): string => {
  const baseClasses =
    'h-10 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 mx-8'

  switch (companyId) {
    case 'github':
    case 'notion':
    case 'uber':
      return cn(baseClasses, 'dark:invert')
    case 'amazon':
      return cn(baseClasses, 'dark:invert mt-4 h-25')
    default:
      return baseClasses
  }
}
