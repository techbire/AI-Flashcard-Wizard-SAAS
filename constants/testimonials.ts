interface Review {
  name: string
  username: string
  body: string
  img: string
  social: string
}

interface Testimonials {
  reviews: Review[]
}

export const TESTIMONIALS_CONSTANT: Testimonials = {
  reviews: [
    {
      name: 'Saheel Prasad Sah',
      username: '@saheelprasad',
      body: 'AI Flashcard Wizard transformed my study routine! Generated 50 flashcards from my textbook in minutes. My grades improved dramatically.',
      img: '/images/testimonial/testimonial-1.jpg',
      social: 'https://www.linkedin.com/in/saheel-prasad-sah-b091b0219/',
    },
    {
      name: 'Vivek Gupta',
      username: '@vivekgupta',
      body: 'Best investment for my MBA prep. The pro plan is worth every penny. AI generates perfect question-answer pairs from any content.',
      img: '/images/testimonial/testimonial-2.jpg',
      social: 'https://www.linkedin.com/in/vivekguptaiimranchimbahrm/',
    },
    {
      name: 'Md. Belal',
      username: '@mdbelal',
      body: 'Love the flip animations and mobile sync! I can study anywhere. The AI-generated questions are spot-on for my exams.',
      img: '/images/testimonial/testimonial-3.jpg',
      social: 'https://www.linkedin.com/in/mohammad-belal-9a6978360/',
    },
    {
      name: 'Abhishek Gupta',
      username: '@abhishekgupta',
      body: 'The AI efficiently extracts key concepts, making faster and saving hours of manual flashcard work.',
      img: '/images/testimonial/testimonial-4.jpg',
      social: 'https://www.linkedin.com/in/geekyabhishek/',
    },
  ],
}
