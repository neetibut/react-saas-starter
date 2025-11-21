import clientPromise from "./mongodb.js";
import { verifySession } from "./_utils.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // 1. Verify the user's session
    const userId = await verifySession(req);
    console.log("Checking subscription for verified user:", userId);

    const client = await clientPromise;
    const db = client.db("bootcamp_db");

    const user = await db.collection("users").findOne({ clerkId: userId });
    console.log("User found in DB:", user);

    if (user && user.isSubscribed) {
      return res.status(200).json({ isSubscribed: true });
    } else {
      return res.status(200).json({ isSubscribed: false });
    }
  } catch (error) {
    console.error(error);
    if (error.message.startsWith("Unauthorized")) {
      return res.status(401).json({ message: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
}
