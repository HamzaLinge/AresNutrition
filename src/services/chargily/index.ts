import {
  ChargilyCheckoutInput,
  ChargilyCheckoutResponse,
} from "@/services/chargily/types";

export async function createChargilyCheckout(
  checkoutInputs: ChargilyCheckoutInput
) {
  const res = await fetch(`${process.env.CHARGILY_URL}/checkouts`, {
    method: "POST",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${process.env.CHARGILY_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(checkoutInputs),
  });

  if (!res.ok) {
    const error = await res.json();
    throw Error("Something went wrong with Chargily");
  }

  const checkout: ChargilyCheckoutResponse = await res.json();
  return checkout;
}
