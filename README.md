# Paymaster 💸

Paymaster is a Next.js application designed to simplify peer-to-peer payments, expense tracking, and bill splitting. It leverages Clerk for secure authentication and Shadcn/UI for a modern, responsive user interface. Users can manage their finances, interact with friends for payments, and view transaction histories, all within a clean and intuitive dashboard.

## ✨ Features

*   **User Authentication:** Secure sign-in, sign-up, and session management powered by [Clerk](https://clerk.com/).
*   **Role-Based Access:** Differentiates between regular users (redirected to `/dashboard`) and admins (redirected to `/admin`).
*   **Responsive Dashboard:**
    *   **Home:** Overview of balance, income, expenses, pending transactions, spending patterns, recent activities, budget tracking, payment methods, and quick actions.
    *   **Transaction History:** View, search, and filter all payment activities.
    *   **Friends:** Manage contacts for quick payments and requests.
    *   **Settings:** Customize profile information, payment methods, security settings (password, 2FA), and notification preferences.
*   **Payment Processing:** Dedicated page (`/payment`) for making payments using a Pay ID.
*   **Landing Page:** An attractive entry point (`/`) showcasing the app's features and benefits.
*   **Admin Area:** A protected route (`/admin`) accessible only to users with an 'admin' role.
*   **Modern UI/UX:** Built with [Shadcn/UI](https://ui.shadcn.com/) components and styled with [Tailwind CSS](https://tailwindcss.com/).
*   **Optimized Fonts:** Uses [Geist](https://vercel.com/font) for a clean and modern typography.

## 🛠️ Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) 15 (App Router)
*   **Authentication:** [Clerk](https://clerk.com/)
*   **UI Components:** [Shadcn/UI](https://ui.shadcn.com/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Form Management:** [React Hook Form](https://react-hook-form.com/)
*   **Schema Validation:** [Zod](https://zod.dev/)
*   **Toast Notifications:** [Sonner](https://sonner.emilkowal.ski/)
*   **Animation:** [Framer Motion](https://www.framer.com/motion/)
*   **Font:** [Geist](https://vercel.com/font)

## 📂 Project Structure

The project follows a standard Next.js App Router structure:
