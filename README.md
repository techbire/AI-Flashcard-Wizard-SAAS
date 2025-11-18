# 🧙‍♂️ AI Flashcard Wizard - SaaS

Transform any text into intelligent flashcards with AI. Study smarter with our AI-powered flashcard generator.

![Next.js](https://img.shields.io/badge/Next.js-15.3-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)

## 🌟 Features

- **AI-Powered Generation**: Create flashcards instantly using Google's Generative AI
- **Smart Collections**: Organize your flashcards into unlimited collections
- **Firebase Integration**: Secure cloud storage for all your study materials
- **Authentication**: Secure user authentication with Clerk
- **Payment Integration**: Razorpay payment gateway for subscriptions
- **Responsive Design**: Beautiful UI that works on all devices
- **Dark Mode**: Eye-friendly dark theme support
- **Advanced Analytics**: Track your study progress (Pro plan)
- **Export to PDF**: Download your flashcards (Pro plan)

## 📦 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) + Custom Components
- **Authentication**: [Clerk](https://clerk.com/)
- **Database**: [Firebase](https://firebase.google.com/)
- **AI**: [Google Generative AI](https://ai.google.dev/)
- **Payments**: [Razorpay](https://razorpay.com/)
- **Icons**: [Lucide React](https://lucide.dev/) + [Phosphor Icons](https://phosphoricons.com/)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)
- **Animations**: [Motion (Framer Motion)](https://motion.dev/)

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm, yarn, or pnpm
- Firebase account
- Clerk account
- Google AI API key
- Razorpay account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/techbire/AI-Flashcard-Wizard-SAAS.git
   cd AI-Flashcard-Wizard-SAAS
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

   # Google Generative AI
   GOOGLE_API_KEY=your_google_ai_api_key

   # Razorpay
   NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
AI-Flashcard-Wizard-SAAS/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   ├── checkout-session-basic/
│   │   ├── checkout-session-pro/
│   │   ├── generate/         # AI flashcard generation
│   │   └── verify-payment/
│   ├── flashcard/            # Single flashcard view
│   ├── flashcards/           # Flashcard collection view
│   ├── generate/             # Generate flashcards page
│   ├── result/               # Payment result page
│   ├── sign-in/              # Authentication pages
│   └── sign-up/
├── components/               # React components
│   ├── magicui/             # Magic UI components
│   ├── sections/            # Landing page sections
│   └── ui/                  # Reusable UI components
├── constants/               # Configuration constants
├── lib/                     # Utility functions
│   ├── firebase.js         # Firebase configuration
│   └── firebaseOperations.js
└── public/                  # Static assets
```

## 💳 Pricing Plans

### Basic Plan
- ₹100/month or ₹1000/year (Save 17%)
- 1,000 flashcards
- AI-powered generation
- Basic collections
- Mobile access

### Pro Plan (Popular)
- ₹500/month or ₹5000/year (Save 17%)
- 100,000 flashcards
- AI-powered generation
- Unlimited collections
- Mobile & web access
- Priority support
- Advanced analytics
- Export to PDF

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack

# Build
npm run build        # Create production build
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
```

## 🎨 Features Breakdown

### AI Generation
- Powered by Google's Generative AI (Gemini)
- Intelligent question-answer pair generation
- Context-aware flashcard creation

### User Management
- Secure authentication with Clerk
- User profiles and preferences
- Session management

### Storage
- Firebase Firestore for flashcard storage
- Real-time synchronization
- Secure data access rules

### Payment Processing
- Razorpay integration for Indian market
- Subscription management
- Payment verification webhooks

## 🔒 Security

- Environment variables for sensitive data
- Clerk authentication for secure user access
- Firebase security rules
- Payment verification on server-side

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- 📱 Mobile devices
- 💻 Tablets
- 🖥️ Desktops

## 🌙 Dark Mode

Built-in dark mode support using `next-themes` for a comfortable studying experience in any lighting condition.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👤 Author

**techbire**

- GitHub: [@techbire](https://github.com/techbire)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and analytics
- Clerk for authentication
- Firebase for database
- Google for Generative AI
- Razorpay for payment processing

---

Made with ❤️ by [techbire](https://github.com/techbire)
