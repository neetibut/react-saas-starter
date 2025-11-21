# Vercel Rewrite Fix for Vite

**Date:** November 21, 2025

## Issue

When running the application locally with `vercel dev`, the following error occurred:
`[vite] Internal server error: Failed to parse source for import analysis because the content contains invalid JS syntax.`

This happened because Vite's internal paths (e.g., `/@vite/client`) do not have file extensions. The previous `vercel.json` rewrite rule was catching these requests and serving `index.html` instead of the expected JavaScript code.

## Cause

The rewrite rule was configured to redirect any path without a dot (`.`) to `index.html` to support SPA routing:

```json
{ "source": "/((?!api/|.*\\..*).*)", "destination": "/index.html" }
```

This regex `(?!api/|.*\\..*)` matched `/@vite/client` because it doesn't start with `api/` and doesn't contain a dot.

## Fix

The rewrite rule was updated to explicitly exclude paths starting with `@`, which is used by Vite for internal modules.

**Updated `vercel.json`:**

```json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" },
    { "source": "/((?!api/|.*\\..*|@).*)", "destination": "/index.html" }
  ]
}
```

The addition of `|@` to the negative lookahead ensures that requests to `/@...` are not rewritten to `index.html`, allowing Vite to serve its internal client scripts correctly.

## Production Considerations

This change is safe for production **unless** the application uses client-side routes starting with `@` (e.g., `your-app.com/@username`).

- **Standard Routes** (e.g., `/dashboard`): Work correctly.
- **API Routes** (e.g., `/api/users`): Work correctly.
- **Static Assets**: Work correctly.
- **Routes starting with `@`**: Will **NOT** be handled by the React app and will likely return a 404 error, as Vercel will look for a physical file instead of serving `index.html`.

If `@` routes are needed in the future, the exclusion rule should be made more specific (e.g., excluding only `/@vite` and `/@fs`).
