# AI Flashcard Wizard 🧠✨

Transform any text into intelligent flashcards with AI. Study smarter, learn faster, and boost your memory retention.

## ✨ Features

- **🤖 AI-Powered Generation**: Powered by Google Gemini AI to create smart flashcards
- **🔄 Interactive Study Mode**: Flip cards with smooth animations
- **☁️ Cloud Sync**: Access your flashcards anywhere, anytime
- **📱 Mobile Responsive**: Perfect experience on all devices
- **👤 User Authentication**: Secure login with Clerk
- **💳 Payment Integration**: Razorpay payment gateway for subscriptions
- **📊 Progress Tracking**: Monitor your learning progress
- **🎨 Modern UI**: Beautiful, clean design with dark/light themes

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Firebase project
- Clerk account for authentication
- Google AI Studio account for Gemini API
- Razorpay account for payments

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-flashcard-wizard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your API keys and configuration:
   - `GEMINI_API_KEY`: Get from Google AI Studio
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` & `CLERK_SECRET_KEY`: From Clerk dashboard
   - Firebase configuration variables
   - Razorpay keys for payments

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000)

## 🏗️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Framework**: Tailwind CSS, Radix UI
- **Authentication**: Clerk
- **Database**: Firebase Firestore
- **AI**: Google Gemini AI
- **Payments**: Razorpay
- **Deployment**: Vercel

## 📱 Usage

1. **Sign up** for a new account
2. **Choose a plan** (Basic ₹100/month or Pro ₹500/month)
3. **Generate flashcards** by pasting your study material
4. **Study** with interactive flip animations
5. **Save collections** for organized learning
6. **Access anywhere** with cloud sync

## 💡 API Endpoints

- `POST /api/generate` - Generate flashcards from text
- `POST /api/checkout-session-basic` - Create basic plan payment
- `POST /api/checkout-session-pro` - Create pro plan payment
- `POST /api/verify-payment` - Verify Razorpay payment

## 🔧 Configuration

### Firebase Setup
1. Create a Firebase project
2. Enable Firestore Database
3. Add your web app configuration to environment variables

### Clerk Setup
1. Create a Clerk application
2. Configure sign-in/sign-up URLs
3. Add API keys to environment variables

### Razorpay Setup
1. Create a Razorpay account
2. Get your Key ID and Key Secret
3. Add to environment variables

## 📊 Pricing Plans

- **Basic Plan**: ₹100/month
  - 1,000 flashcards
  - AI-powered generation
  - Mobile access
  
- **Pro Plan**: ₹500/month
  - 100,000 flashcards
  - Unlimited collections
  - Priority support
  - Advanced analytics

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## � Acknowledgments

- Google Gemini AI for intelligent flashcard generation
- Clerk for seamless authentication
- Razorpay for secure payments
- The open-source community for amazing tools and libraries

---

**Built with ❤️ for smarter studying**
