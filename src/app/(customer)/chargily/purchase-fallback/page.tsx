import db from "@/db/db";
import { notFound } from "next/navigation";
import PurchaseFallback from "./_components/PurchaseFallback";

export default async function ChargilyPurchaseFallbackPage({
  searchParams: { checkout_id },
}: {
  searchParams: { checkout_id: string };
}) {
  const order = await db.order.findFirst({
    where: { chargilyCheckoutId: checkout_id },
  });
  if (order == null) return notFound();

  return <PurchaseFallback order={order} />;
}
