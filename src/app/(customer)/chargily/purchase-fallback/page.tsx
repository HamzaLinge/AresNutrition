import db from "@/db/db";
import { notFound } from "next/navigation";
import PurchaseFallback from "./_components/PurchaseFallback";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chargily Purchase - Ares Store",
  description: "Confirmation of your purchase from Chargily Payment Gateway",
};

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
