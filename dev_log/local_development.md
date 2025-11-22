# Local Development with Vercel

**Date:** November 22, 2025

This guide explains how to run the project locally while simulating the Vercel environment (Serverless Functions, Environment Variables, etc.).

## Prerequisites

- [Vercel CLI](https://vercel.com/docs/cli) installed (`npm i -g vercel`).
- You must be logged in to Vercel (`vercel login`).

## Setup Steps

### 1. Link to Vercel Project

Connect your local directory to the deployed Vercel project. This ensures you are working with the correct project settings.

```bash
vercel link
```

- Follow the prompts to select the scope (your username/team) and the project name.

### 2. Pull Environment Variables

Download the environment variables from your Vercel project (Development, Preview, or Production) to your local machine.

```bash
vercel env pull .env.local
```

- This creates a `.env.local` file with all your secrets (e.g., `VITE_CLERK_PUBLISHABLE_KEY`, `OMISE_SECRET_KEY`, `MONGODB_URI`).
- **Note:** `.env.local` is git-ignored and should never be committed.

### 3. Start Development Server

Start the local development server using Vercel. This runs both your frontend (Vite) and your backend API functions.

```bash
vercel dev
```

- The app will be available at `http://localhost:3000`.
- API routes will be available at `http://localhost:3000/api/...`.

## Troubleshooting

- **Port in use:** If port 3000 is busy, Vercel will try another port (e.g., 3001). Check the terminal output.
- **Environment Variables:** If variables are missing, check your Vercel dashboard settings and run `vercel env pull` again.
