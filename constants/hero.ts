interface VideoConfig {
  videoSrc: string
  lightThumbnail: {
    src: string
    alt: string
  }
  darkThumbnail: {
    src: string
    alt: string
  }
}

interface HeroConfig {
  title: string
  description: string
  buttonText: string
  videoConfig: VideoConfig
}

export const HERO: HeroConfig = {
  title: 'AI Flashcard Wizard - Generate Smart Study Cards',
  description: 'Transform any text into interactive flashcards with AI. Study smarter, learn faster, and boost your memory retention.',
  buttonText: "Start Creating Flashcards",
  videoConfig: {
    videoSrc: 'https://www.youtube.com/embed/dQw4w9WgXcQ?si=gcHuOpFRg38gbu4J',
    lightThumbnail: {
      src: 'https://startup-template-sage.vercel.app/hero-light.png',
      alt: 'AI Flashcard Generator',
    },
    darkThumbnail: {
      src: 'https://startup-template-sage.vercel.app/hero-dark.png',
      alt: 'AI Flashcard Generator',
    },
  },
}
