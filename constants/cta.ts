interface CTA {
  title: string
  description: string
  buttonText: string
  image: {
    src: string
    alt: string
    width: number
    height: number
  }
}

export const CTA_CONSTANT: CTA = {
  title: 'Ready to Study Smarter?',
  description: 'Join thousands of students who are already boosting their grades with AI-powered flashcards.',
  buttonText: 'Start Creating Flashcards',
  image: {
    src: '/images/cta/duck.png',
    alt: 'Study Smart',
    width: 500,
    height: 500,
  },
}
