# React SaaS Starter

A modern, production-ready SaaS starter template built with React, Vite, Tailwind CSS, and a serverless backend using Vercel Functions and MongoDB.

This project is designed to help developers launch a SaaS application quickly with built-in authentication, payment processing, and role-based access control.

## 🚀 Features

- **Modern Frontend**: Built with React 19 and Vite for lightning-fast development.
- **Beautiful UI**: Styled with Tailwind CSS and Lucide React icons.
- **Authentication**: Secure user management powered by [Clerk](https://clerk.com/).
- **Payments**: Credit card processing integration with [Omise](https://www.omise.co/).
- **Database**: Serverless data persistence using MongoDB Atlas.
- **Serverless API**: Backend logic handled by Vercel Serverless Functions (`/api`).
- **Access Control**:
  - **Public**: Home, Pricing, Sign In.
  - **Authenticated**: Dashboard (Free for all signed-in users).
  - **Premium**: Exclusive content restricted to paid subscribers.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, React Router DOM
- **Backend**: Vercel Serverless Functions (Node.js)
- **Database**: MongoDB (via `mongodb` driver)
- **Auth**: @clerk/clerk-react
- **Payments**: Omise.js (Frontend) & Omise Node SDK (Backend)

## 📋 Prerequisites

Before you begin, ensure you have the following accounts and tools:

1.  **Node.js** (v18 or higher)
2.  **Vercel CLI**: `npm i -g vercel`
3.  **MongoDB Atlas**: Create a cluster and get your connection string.
4.  **Clerk**: Create an application to get your Publishable Key.
5.  **Omise**: Create an account to get your Public and Secret keys.

## ⚡ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/react-saas-starter.git
cd react-saas-starter
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following keys:

```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...

# Omise Payments
VITE_OMISE_PUBLIC_KEY=pkey_test_...
OMISE_SECRET_KEY=skey_test_...

# MongoDB Database
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority
```

### 4. Run Locally

Since this project uses Vercel Serverless Functions, use the Vercel CLI to run the development server. This ensures both the frontend (Vite) and backend API work together.

```bash
vercel dev
```

- Frontend: `http://localhost:3000`
- API: `http://localhost:3000/api/...`

## 📂 Project Structure

```
├── api/                  # Serverless functions (Backend)
│   ├── checkout.js       # Payment processing
│   ├── mongodb.js        # DB connection helper
│   └── subscription.js   # Subscription status check
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── RequireAuth.jsx # Route protection logic
│   │   └── ...
│   ├── layouts/          # Page layouts
│   ├── pages/            # Application pages
│   │   ├── Home.jsx
│   │   ├── Pricing.jsx   # Payment UI
│   │   ├── Dashboard.jsx # User dashboard
│   │   └── ...
│   ├── App.jsx           # Routing configuration
│   └── main.jsx          # Entry point
├── vercel.json           # Vercel configuration
└── package.json
```

## 🚢 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com).

1.  Push your code to GitHub.
2.  Import the project into Vercel.
3.  Add the Environment Variables in the Vercel Project Settings.
4.  Deploy!

## 📄 License

This project is licensed under the MIT License.
