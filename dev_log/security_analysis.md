# Security Analysis & Production Readiness

**Date:** November 21, 2025
**Status:** MVP / Prototype
**Architecture:** React (Vite) + Vercel Serverless Functions + MongoDB Atlas

## Overview

This document outlines the security and architectural gaps between the current MVP implementation and a production-ready SaaS application. While the serverless architecture is inherently secure, the current implementation lacks critical validation layers required for handling real payments and user data securely.

## Critical Vulnerabilities

### 1. Identity Verification (The "Trusting the Client" Issue)

**Severity:** 🔴 Critical

- **Current State:** The API endpoints (`api/checkout.js`, `api/subscription.js`) rely on the `userId` sent in the request body or query parameters.
  ```javascript
  // Current Implementation
  const { userId } = req.body; // Trusts the client
  ```
- **Risk:** A malicious user can send a request with _another user's ID_ to view their subscription status or potentially modify their data.
- **Production Fix:** Implement Server-Side Token Verification.
  1.  Install `@clerk/clerk-sdk-node`.
  2.  Verify the Session Token (JWT) from the request headers.
  3.  Extract the `userId` directly from the verified token, ignoring the request body.

### 2. Payment Consistency (The "Lost Transaction" Risk)

**Severity:** 🟠 High

- **Current State:** The database update happens synchronously after the charge in the same API call.
- **Risk:** If the user closes the browser or loses internet connection immediately after the payment succeeds but _before_ the API response is received, the user is charged but the database is never updated.
- **Production Fix:** Implement Webhooks.
  1.  Configure Omise to send a webhook to a new endpoint (e.g., `/api/webhooks/omise`) upon successful charge.
  2.  Update the database based on this background event, which is independent of the user's browser state.

### 3. Database Connection Management

**Severity:** 🟡 Medium

- **Current State:** Uses a basic global variable caching strategy for MongoDB connections.
- **Risk:** In a high-traffic serverless environment, this can lead to "Connection Exhaustion" where too many function instances open too many connections, causing the database to reject new connections (DoS).
- **Production Fix:**
  - Use **MongoDB Atlas Data API** (HTTP-based) which is stateless.
  - Or use a connection pooler like **Prisma Data Proxy**.

### 4. Input Validation & Injection

**Severity:** 🟡 Medium

- **Current State:** Inputs are passed directly to MongoDB queries.
- **Risk:** Although NoSQL is safer than SQL, passing raw objects can still lead to query manipulation (NoSQL Injection).
- **Production Fix:** Use a schema validation library like **Zod** to strictly validate all incoming data types before they reach the database logic.

## Summary

| Feature          | Current Status              | Production Requirement           |
| :--------------- | :-------------------------- | :------------------------------- |
| **Architecture** | ✅ Secure (Serverless)      | ✅ Secure                        |
| **Identity**     | ❌ Insecure (Trusts Client) | ⚠️ **Must Verify JWT on Server** |
| **Payments**     | ⚠️ Risky (Client-triggered) | ⚠️ **Should use Webhooks**       |
| **Database**     | ⚠️ Basic Pooling            | ✅ Connection Pooling / HTTP API |
| **Secrets**      | ✅ Env Vars (Good)          | ✅ Env Vars                      |
