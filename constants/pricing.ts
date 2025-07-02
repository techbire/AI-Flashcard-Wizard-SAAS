interface PricingPlan {
  name: string
  description: string
  monthlyPrice: string
  yearlyPrice: string
  features: {
    text: string
    included: boolean
  }[]
  buttonText: string
  buttonVariant: 'default' | 'secondary'
  isPopular?: boolean
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Basic',
    description: 'Perfect for students and casual learners.',
    monthlyPrice: '₹100/mo',
    yearlyPrice: '₹1000/yr',
    features: [
      { text: '1,000 flashcards', included: true },
      { text: 'AI-powered generation', included: true },
      { text: 'Basic collections', included: true },
      { text: 'Mobile access', included: true },
      { text: 'Priority support', included: false },
    ],
    buttonText: 'Start Basic',
    buttonVariant: 'secondary',
  },
  {
    name: 'Pro',
    description: 'Ideal for serious students and professionals.',
    monthlyPrice: '₹500/mo',
    yearlyPrice: '₹5000/yr',
    features: [
      { text: '100,000 flashcards', included: true },
      { text: 'AI-powered generation', included: true },
      { text: 'Unlimited collections', included: true },
      { text: 'Mobile & web access', included: true },
      { text: 'Priority support', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Export to PDF', included: true },
    ],
    buttonText: 'Go Pro',
    buttonVariant: 'default',
    isPopular: true,
  },
]

export const PRICING_DISCOUNT: string = 'Save 17% annually'
