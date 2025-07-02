interface Feature {
  title: string
  description: string
  src: string
}

export const FEATURES: Feature[] = [
  {
    title: 'Easy Text Input',
    description:
      'Simply paste your study material or notes and let our AI analyze and create perfect flashcards instantly.',
    src: '/images/features/feature-1.jpeg',
  },
  {
    title: 'Smart AI Generation',
    description:
      'Powered by Google Gemini AI to extract key concepts and create intelligent question-answer pairs.',
    src: '/images/features/feature-2.jpg',
  },
  {
    title: 'Interactive Study Mode',
    description:
      'Flip through cards with smooth animations and track your learning progress effectively.',
    src: '/images/features/feature-3.jpg',
  },
  {
    title: 'Accessible Anywhere',
    description:
      'Study on any device with cloud sync. Your flashcards are always available when you need them.',
    src: '/images/features/feature-4.jpeg',
  },
]
