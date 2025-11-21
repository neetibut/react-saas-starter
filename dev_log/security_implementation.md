# Security Implementation Log

**Date:** November 21, 2025
**Branch:** `security-hardening`
**Status:** Verified & Tested

## Overview

This document details the implementation of security measures identified in the [Security Analysis](./security_analysis.md). The focus was on securing user identity verification, validating inputs, and ensuring payment consistency via webhooks.

## 1. Identity Verification (Server-Side)

**Goal:** Prevent "Trusting the Client" vulnerabilities where users could impersonate others by manipulating the `userId` in request bodies.

**Implementation:**

- **Dependency:** Installed `@clerk/clerk-sdk-node`.
- **Utility:** Created `api/_utils.js` with a `verifySession(req)` function.
  - Extracts the `Authorization: Bearer <token>` header.
  - Verifies the JWT signature using Clerk's Secret Key.
  - Returns the authenticated `userId` (sub) directly from the token.
- **Application:**
  - Refactored `api/subscription.js` to use `verifySession(req)` instead of reading `req.query.userId`.
  - Refactored `api/checkout.js` to use `verifySession(req)` instead of reading `req.body.userId`.

## 2. Input Validation

**Goal:** Prevent injection attacks and ensure data integrity before processing.

**Implementation:**

- **Dependency:** Installed `zod`.
- **Utility:** Added a `validate(schema, data)` helper in `api/_utils.js`.
- **Application:**
  - Defined a Zod schema for the checkout endpoint:
    ```javascript
    const checkoutSchema = z.object({
      token: z.string().min(1, "Payment token is required"),
    });
    ```
  - Applied this validation in `api/checkout.js` before calling Omise.

## 3. Payment Consistency (Webhooks)

**Goal:** Ensure the database is updated even if the user's browser closes immediately after payment.

**Implementation:**

- **Endpoint:** Created `api/webhooks/omise.js`.
- **Logic:**
  - Listens for the `charge.complete` event from Omise.
  - Checks if `data.status === "successful"`.
  - Extracts `clerkId` from the charge metadata.
  - Updates the MongoDB `users` collection (`isSubscribed: true`) in the background.

## 4. Frontend Updates

**Goal:** Support the new secure API requirements.

**Implementation:**

- **`RequireAuth.jsx`**: Updated to fetch the Clerk session token (`getToken()`) and include it in the `Authorization` header when checking subscription status.
- **`Pricing.jsx`**: Updated to fetch the session token and include it in the `Authorization` header when submitting a payment.

## 5. Verification & Testing

**Test Scenario:**

1.  **Setup:**
    - Reset a test user in MongoDB (`isSubscribed: false`).
    - Exposed localhost via `ngrok`.
    - Configured Omise Webhook to point to the ngrok URL.
2.  **Execution:**
    - User attempted to access Premium content -> **Blocked** (Correct).
    - User performed a test payment via the UI.
3.  **Result:**
    - Omise processed the charge.
    - Webhook `charge.complete` was received by the server.
    - MongoDB was updated (`isSubscribed: true`).
    - User gained access to Premium content.

**Conclusion:** The security hardening is complete and the payment flow is now robust and production-ready.
