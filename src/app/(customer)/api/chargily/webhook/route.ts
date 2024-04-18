import { Supplement } from "@prisma/client";
import db from "@/db/db";
import { ChargilyWebhookEvent } from "@/services/chargily/types";
import { verifySignature } from "@/services/chargily/utils";
import { headers } from "next/headers";

export async function POST(req: Request) {
  // Extract the Chargily signature from headers
  const headersList = headers();
  const signature = headersList.get("signature");

  if (!signature) {
    console.error("Signature not found");
    return new Response("Signature not found", { status: 404 });
  }

  // Extract Chargily webhook payload
  const payload: string = await req.text();

  // Perform the signature verification
  const isValid = verifySignature(payload, signature);

  if (!isValid) {
    console.error("Invalid signature");
    return new Response("Invalid signature", { status: 403 });
  }

  // If the signature is valid, process the webhook data
  const webhook: ChargilyWebhookEvent = JSON.parse(payload);

  // Handle the event based on its type
  switch (webhook.type) {
    case "checkout.paid":
      // Handle the payment success
      const order = await db.order.update({
        where: { chargilyCheckoutId: webhook.data.id },
        data: { chargilyWebhookId: webhook.id, paymentStatus: "paid" },
        select: { supplements: true },
      });
      await Promise.all(
        order.supplements.map(async (orderSupplement) => {
          const supplement = await db.supplement.findUnique({
            where: { id: orderSupplement.supplementId },
            select: { stock: true },
          });
          if (supplement) {
            await db.supplement.update({
              where: { id: orderSupplement.supplementId },
              data: {
                stock: { decrement: orderSupplement.quantity },
                isAvailableForPurchase: {
                  set: supplement.stock - orderSupplement.quantity > 0,
                },
              },
            });
          }
        })
      );

      break;
    case "checkout.failed":
      // Handle the payment failure
      await db.order.update({
        where: { chargilyCheckoutId: webhook.data.id },
        data: { chargilyWebhookId: webhook.id, paymentStatus: "failed" },
      });
      break;
    default:
      console.warn("Received unsupported event type");
  }

  // Respond to Chargily to acknowledge receipt of the webhook
  console.log("Chargily webhook received");
  return new Response("Chargily webhook received", { status: 200 });
}
