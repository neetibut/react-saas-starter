import clientPromise from "./mongodb.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { userId } = req.query;
  console.log("Checking subscription for:", userId);

  if (!userId) {
    return res.status(400).json({ message: "Missing userId" });
  }

  try {
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
    return res.status(500).json({ error: error.message });
  }
}
