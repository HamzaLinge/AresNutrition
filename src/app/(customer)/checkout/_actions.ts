"use server";

import db from "@/db/db";
import { formDataToObject } from "@/lib/utils";
import { createChargilyCheckout } from "@/services/chargily";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";

const createOrderSchema = z.object({
  shippingName: z.string().min(1, { message: "Name is required" }),
  shippingPhone: z
    .string()
    .min(1, { message: "An active phone number is required" }),
  shippingWilaya: z.string().min(1, { message: "Wilaya is required" }),
  shippingAddress: z.string().min(1, { message: "Address is required" }),
});

export async function createOrder(
  supplements: { id: string; priceInDinars: number; quantity: number }[],
  prevState: unknown,
  formData: FormData
) {
  if (!supplements || supplements.length === 0) return notFound();

  const result = createOrderSchema.safeParse(formDataToObject(formData));
  if (result.success === false) {
    console.log(result.error.formErrors.fieldErrors);
    return result.error.formErrors.fieldErrors;
  }
  const data = result.data;

  const amountInDinars =
    supplements.reduce(
      (acc, current) => (acc = acc + current.priceInDinars * current.quantity),
      0
    ) + Number(process.env.SHIPPING_COST || 500);

  const chargilyCheckout = await createChargilyCheckout({
    amount: amountInDinars,
    currency: "dzd",
    locale: "en",
    webhook_endpoint: process.env.CHARGILY_WEBHOOK_ENDPOINT as string,
    success_url: process.env.CHARGILY_FALLBACK_URL as string,
    failure_url: process.env.CHARGILY_FALLBACK_URL as string,
  });

  const order = await db.order.create({
    data: {
      chargilyCheckoutId: chargilyCheckout.id,
      amountInDinars: amountInDinars,
      shippingName: data.shippingName,
      shippingPhone: data.shippingPhone,
      shippingWilaya: data.shippingWilaya,
      shippingAddress: data.shippingAddress,
      // metadata: { "chargily-checkout": chargilyCheckout },
    },
  });

  await Promise.all(
    supplements.map(async (food) => {
      await db.orderSupplement.create({
        data: {
          orderId: order.id,
          supplementId: food.id,
          priceInDinars: food.priceInDinars,
          quantity: food.quantity,
        },
      });
    })
  );

  redirect(chargilyCheckout.checkout_url);
}
