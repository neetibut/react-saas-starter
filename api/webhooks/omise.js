import clientPromise from "../mongodb.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const event = req.body;

  // Log the event for debugging
  console.log("Webhook received:", event.key);

  if (event.key === "charge.complete" && event.data.status === "successful") {
    const charge = event.data;
    const userId = charge.metadata.clerkId;

    if (userId) {
      try {
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
        console.log(`Webhook: Subscription updated for user ${userId}`);
      } catch (error) {
        console.error("Webhook Error:", error);
        return res.status(500).json({ message: "Database error" });
      }
    } else {
      console.warn("Webhook: Missing clerkId in metadata");
    }
  }

  return res.status(200).json({ received: true });
}
