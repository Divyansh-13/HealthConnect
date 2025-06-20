# HealthConnect 🏥

## AI-Powered National Health Portal for Unified Medical Access and Personalized Care in India

### 🌟 Project Overview

In India, healthcare data remains deeply fragmented, making it difficult for patients to retrieve medical records, book appointments, or consult the right specialists — especially when moving between hospitals, diagnostic labs, or cities. The situation is even more challenging in rural or underserved regions, where digital healthcare access is minimal. On top of that, interpreting medical test reports is often confusing for the average person due to complex medical jargon and a lack of accessible explanations.

To address these challenges, we have developed **HealthConnect** — a comprehensive web application that serves as a unified digital health portal, bringing hospitals, doctors, diagnostic labs, and patients together on a single platform.

### 🚀 Key Features

Our platform offers the following comprehensive features:

1. **Seamless Appointment Booking** - Book appointments with registered hospitals and doctors across the platform
2. **Instant Medical Records Access** - Securely retrieve medical test results through hospital-issued credentials
3. **AI-Powered Report Analysis** - Personalized chatbot that interprets medical reports in simple language and suggests next steps or relevant specialists
4. **Centralized Dashboard** - Unified interface for patients, doctors, and hospitals to manage their interactions efficiently
5. **Multi-Stakeholder Access** - Distinct login and registration options for hospitals, doctors, and patients, ensuring a tailored experience for every stakeholder

### 🎯 Vision

This platform is built with the vision of **"AI for Social Good"**, aiming to create a secure, intelligent, and inclusive health ecosystem that empowers every citizen — regardless of their location or background — to understand and take control of their health.

## 🛠️ Tech Stack

- **Frontend**: Next.js
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Authentication
- **AI/Chatbot**: Gemini API (Google AI Studio)

## ⚙️ Installation & Setup

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/Divyansh-13/HealthConnect.git
cd hashhacks
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in your project root directory and add the following environment variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY="Your Firebase API Key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="Your Firebase Auth Domain"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="Your Firebase Project ID"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="Your Firebase Storage Bucket"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="Your Firebase Messaging Sender ID"
NEXT_PUBLIC_FIREBASE_APP_ID="Your Firebase App ID"
NEXT_PUBLIC_GEMINI_API_KEY="Your Gemini API Key"
```

> **⚠️ Important**: The application requires the `.env` file to run properly. Make sure to replace the placeholder values with your actual API keys and configuration details.

### 4. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🔐 API Configuration

The project uses the following APIs:

- **Firebase**: For authentication and data storage
- **Gemini API**: For AI-powered medical report analysis
  - Base URL: `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent`

## 🏗️ Project Structure

```
hashhacks/
├── components/          # Reusable UI components
├── pages/              # Next.js pages
├── styles/             # Tailwind CSS styles
├── lib/                # Utility functions and API configurations
├── public/             # Static assets
├── .env                # Environment variables (create this file)
└── README.md           # Project documentation
```

## 👥 User Types

The platform caters to three main user types:

1. **Patients** - Access medical records, book appointments, get AI-powered report analysis
2. **Doctors** - Manage appointments, view patient records, provide consultations
3. **Hospitals** - Manage doctor profiles, appointment systems, and patient data

## 🌍 Impact & Social Good

HealthConnect addresses critical healthcare challenges in India:

- **Accessibility**: Brings healthcare services to rural and underserved regions
- **Simplification**: Makes complex medical information understandable for common people
- **Integration**: Unifies fragmented healthcare data across different providers
- **Empowerment**: Gives patients control over their health data and decisions

## 🤝 Contributing

We welcome contributions to make HealthConnect even better! Please feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

For any questions or support, please reach out to the development team or create an issue in this repository.

---

**Built with ❤️ for a healthier India through AI and technology**
