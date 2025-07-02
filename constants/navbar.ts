interface NavLink {
  href: string
  text: string
}

interface Logo {
  src: string
  alt: string
  width: number
  height: number
}

interface ThemeButton {
  soundEffect: string
  transitionDuration: number
}

interface Navbar {
  logo: Logo
  companyName: string
  navigation: NavLink[]
  themeButton: ThemeButton
}

export const NAVBAR_CONSTANT: Navbar = {
  logo: {
    src: '/images/logo/logo.png',
    alt: 'AI Flashcard Wizard Logo',
    width: 30,
    height: 30,
  },
  companyName: 'AI Flashcard Wizard',
  navigation: [
    { href: '/#features', text: 'Features' },
    { href: '/#pricing', text: 'Pricing' },
    { href: '/flashcards', text: 'Saved Flashcards' },
    { href: '/generate', text: 'Generate' },
  ],
  themeButton: {
    soundEffect: '/audio/light-switch.mp3',
    transitionDuration: 700,
  },
}
