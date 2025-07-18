# PayApp 💸

<div align="center">
  <h3>Simple. Secure. Instant.</h3>
  <p>A full-stack Next.js web application for peer-to-peer payments</p>

  ![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
  ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
</div>

---

## 🌟 Overview

PayApp revolutionizes peer-to-peer payments with a clean, intuitive interface and robust security features. Built with modern web technologies, it provides a seamless experience for users to send and receive money instantly using unique PayIds.

## ✨ Features

### 🔐 **Secure Authentication**
- **NextAuth.js Integration**: Bulletproof authentication system
- **Credentials-based**: Simple sign-in with name and email
- **Session Management**: Secure user sessions with automatic token handling

### 💳 **Smart Payment System**
- **Unique PayIds**: Every user gets a 5-character unique identifier
- **Instant Transfers**: Real-time peer-to-peer payments
- **Atomic Transactions**: Prisma-powered atomic operations ensure data consistency
- **Welcome Bonus**: New users start with ₹1,000 balance

### 📊 **User Experience**
- **Dashboard**: Clean overview of balance, PayId, and account details
- **Transaction History**: Comprehensive payment tracking with search functionality
- **Responsive Design**: Perfect experience across all devices




## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v18 or later) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **PostgreSQL** - Database (or use Docker)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd payapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file with your configuration:
   ```env

   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"


   NEXTAUTH_SECRET="your-super-secret-string"


   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   🎉 **Your app is now running at** `http://localhost:3000`

## 📱 Application Structure

```
payapp/
├── 📁 app/                    # Next.js App Router
│   ├── 📁 api/               # API routes
│   ├── 📁 auth/              # Authentication pages
│   ├── 📁 dashboard/         # User dashboard
│   └── 📁 transaction/       # Transaction history
├── 📁 components/            # Reusable components
├── 📁 lib/                   # Utility functions
├── 📁 prisma/               # Database schema & migrations
└── 📁 public/               # Static assets
```

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/signup` | User registration |
| `POST` | `/api/auth/signin` | User authentication |
| `GET` | `/api/user/me` | Get current user data |
| `GET` | `/api/user/balance` | Get user balance |
| `POST` | `/api/payment/send` | Send money to another user |
| `GET` | `/api/transactions` | Get transaction history |

## 🌐 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository

3. **Configure Database**
   - Create a Vercel Postgres database
   - Copy the connection string

4. **Set Environment Variables**
   ```env
   DATABASE_URL="<your-vercel-postgres-connection-string>"
   NEXTAUTH_SECRET="<your-secret-key>"
   ```

5. **Update Build Script**
   ```json
   {
     "scripts": {
       "build": "prisma generate && prisma migrate deploy && next build"
     }
   }
   ```

6. **Deploy** 🚀
   - Vercel will automatically build and deploy your application

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js** team for the incredible framework
- **Prisma** for the amazing ORM
- **Vercel** for seamless deployment
- **Tailwind CSS** for beautiful styling

---

<div align="center">
  <p>Made with ❤️ by <strong>Jayesh</strong></p>

</div>
