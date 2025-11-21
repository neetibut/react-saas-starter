import Omise from "omise";
import clientPromise from "./mongodb.js";
import { verifySession, validate } from "./_utils.js";
import { z } from "zod";

const omise = Omise({
  publicKey: process.env.VITE_OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

const checkoutSchema = z.object({
  token: z.string().min(1, "Payment token is required"),
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // 1. Verify User
    const userId = await verifySession(req);

    // 2. Validate Input
    const { token } = validate(checkoutSchema, req.body);

    console.log("Processing payment for verified user:", userId);

    // 3. Charge the card via Omise
    const charge = await omise.charges.create({
      amount: 290000, // 2,900.00 THB (in satang)
      currency: "thb",
      card: token,
      description: `Subscription for user ${userId}`,
      metadata: { clerkId: userId },
    });

    if (charge.status === "successful") {
      // 4. Update MongoDB
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
    if (
      error.message.startsWith("Unauthorized") ||
      error.message.startsWith("Validation Error")
    ) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
}
