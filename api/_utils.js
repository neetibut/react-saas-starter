import { Clerk } from "@clerk/clerk-sdk-node";

// Initialize Clerk with the secret key
// Ensure CLERK_SECRET_KEY is set in your environment variables
const clerk = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

export async function verifySession(req) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized: Missing or invalid Authorization header");
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token using Clerk's SDK
    // This validates the signature and expiration
    const session = await clerk.verifyToken(token);

    // Return the user ID (sub) from the token
    return session.sub;
  } catch (error) {
    console.error("Token verification failed:", error);
    throw new Error("Unauthorized: Invalid session token");
  }
}

export function validate(schema, data) {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errorMessage = result.error.errors
      .map((e) => `${e.path.join(".")}: ${e.message}`)
      .join(", ");
    throw new Error(`Validation Error: ${errorMessage}`);
  }
  return result.data;
}
