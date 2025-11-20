import Omise from "omise";
import clientPromise from "./mongodb.js";

const omise = Omise({
  publicKey: process.env.VITE_OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { token, userId } = req.body;
  console.log("Processing payment for user:", userId);

  try {
    // 1. Charge the card via Omise
    const charge = await omise.charges.create({
      amount: 290000, // 2,900.00 THB (in satang)
      currency: "thb",
      card: token,
      description: `Subscription for user ${userId}`,
      metadata: { clerkId: userId },
    });

    if (charge.status === "successful") {
      // 2. Update MongoDB
      const client = await clientPromise;
      const db = client.db("bootcamp_db");

      await db.collection("users").updateOne(
        { clerkId: userId },
        {
          $set: {
            isSubscribed: true,
            omiseCustomerId: charge.customer,
            lastPaymentId: charge.id,
            updatedAt: new Date(),
          },
        },
        { upsert: true }
      );

      return res.status(200).json({ success: true });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
