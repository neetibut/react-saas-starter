# Implementation Log: SaaS Landing Page with Auth & Payments

This document tracks the step-by-step implementation of the educational SaaS landing page project.

## Phase 1: Project Setup & Dependencies

1.  **Dependencies Installation**

    - Installed core packages for routing, authentication, and UI:
      ```bash
      npm install react-router-dom @clerk/clerk-react lucide-react clsx tailwind-merge
      ```

2.  **Folder Structure**

    - Created organized directory structure:
      - `src/components/ui`: For reusable UI components.
      - `src/layouts`: For page layouts.
      - `src/lib`: For utility functions.
      - `src/pages`: For application views.

3.  **Utilities**
    - Created `src/lib/utils.js` containing the `cn` helper function for merging Tailwind classes conditionally.

## Phase 2: Core Components & Layouts

4.  **Navigation & Footer**
    - Created `src/components/Navbar.jsx`: Responsive navigation bar.
    - Created `src/components/Footer.jsx`: Standard footer component.
    - Created `src/layouts/RootLayout.jsx`: Wraps the application content with the Navbar and Footer.

## Phase 3: Pages & UI Implementation

5.  **Landing Page (`Home.jsx`)**

    - Implemented a Hero section with a "Get Started" call-to-action.
    - Implemented a Features section using `lucide-react` icons to showcase product benefits.

6.  **Pricing Page (`Pricing.jsx`)**

    - Designed pricing cards (e.g., "Pro Bootcamp").
    - Prepared the structure for payment integration.

7.  **Dashboard Page (`Dashboard.jsx`)**

    - Created a student dashboard layout.
    - Added placeholder course progress cards.

8.  **Sign In Page (`SignIn.jsx`)**
    - Created a dedicated route for user authentication.

## Phase 4: Routing & App Configuration

9.  **Router Setup**

    - Updated `src/App.jsx` to define routes using `react-router-dom`:
      - `/`: Home
      - `/pricing`: Pricing
      - `/dashboard`: Dashboard (Protected)
      - `/sign-in`: Sign In

10. **Entry Point Configuration**
    - Updated `src/main.jsx` to wrap the application with:
      - `ClerkProvider`: For authentication context.
      - `BrowserRouter`: For routing context.

## Phase 5: Authentication Integration (Clerk)

11. **Environment Variables**

    - Created `.env` file to store API keys:
      - `VITE_CLERK_PUBLISHABLE_KEY`
      - `VITE_OMISE_PUBLIC_KEY`

12. **Auth Components**

    - Updated `Navbar.jsx` to conditionally render links based on auth state using `<SignedIn>` and `<SignedOut>` components.
    - Added `<UserButton />` for user profile management.
    - Implemented `src/pages/SignIn.jsx` using Clerk's `<SignIn />` component.

13. **Protected Routes**
    - Created `src/components/RequireAuth.jsx`: A wrapper component that checks if a user is authenticated. If not, it redirects to the Sign In page.
    - Applied this wrapper to the `/dashboard` route in `App.jsx`.

## Phase 6: Payment Integration (Omise)

14. **Omise Script**

    - Added the Omise.js CDN script to `index.html`:
      ```html
      <script src="https://cdn.omise.co/omise.js"></script>
      ```

15. **Payment Logic**
    - Updated `src/pages/Pricing.jsx` to handle subscriptions:
      - Checks if user is signed in (redirects if not).
      - Initializes `OmiseCard` with the public key from env.
      - Opens the credit card form.
      - On success (`onCreateTokenSuccess`), simulates a backend verification and redirects the user to the Dashboard.

## Phase 7: Dashboard Personalization

16. **User Data**
    - Updated `src/pages/Dashboard.jsx` to fetch and display the user's first name using the `useUser` hook from Clerk.
