interface FAQItem {
  id: string
  question: string
  answer: string
  hasLink?: boolean
  linkText?: string
  linkUrl?: string
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'item-1',
    question: 'How does the AI flashcard generation work?',
    answer: 'Our AI powered by Google Gemini analyzes your study material and extracts key concepts, creating intelligent question-answer pairs that focus on the most important information.',
  },
  {
    id: 'item-2',
    question: 'Can I save and organize my flashcards?',
    answer: 'Yes! You can save flashcards in named collections and access them anytime across all your devices. Your progress is automatically synced to the cloud.',
  },
  {
    id: 'item-3',
    question: 'What types of content can I use to generate flashcards?',
    answer: 'You can paste any text content - textbook chapters, lecture notes, research papers, or study guides. The AI works best with educational content but can adapt to various subjects.',
  },
  {
    id: 'item-4',
    question: 'What is the difference between Basic and Pro plans?',
    answer: 'Basic plan includes 1,000 flashcards for ₹100/month. Pro plan offers 100,000 flashcards, unlimited collections, priority support, and advanced analytics for ₹500/month.',
  },
  {
    id: 'item-5',
    question: 'Can I use the flashcards offline?',
    answer: 'While creation requires internet connection for AI processing, you can study your saved flashcards offline once they are synced to your device.',
  },
]
