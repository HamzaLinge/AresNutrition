import db from "@/db/db";
import { notFound } from "next/navigation";
import PurchaseFallback from "./_components/PurchaseFallback";
import { Metadata } from "next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Chargily Purchase - Ares Store",
  description: "Confirmation of your purchase from Chargily Payment Gateway",
};

async function getOrderSupplements(checkout_id: string) {
  const order = await db.order.findFirst({
    where: { chargilyCheckoutId: checkout_id },
  });
  if (order == null) return notFound();

  const supplements = await db.orderSupplement.findMany({
    where: { orderId: order.id },
    include: { supplement: true },
  });

  return { order, supplements };
}

export default async function ChargilyPurchaseFallbackPage({
  searchParams: { checkout_id },
}: {
  searchParams: { checkout_id: string };
}) {
  const orderSupplements = await getOrderSupplements(checkout_id);

  return (
    <div className="container my-6 space-y-4">
      <Breadcrumb className="flex items-center justify-center">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/supplements">Shop</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Payment</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PurchaseFallback {...orderSupplements} />
    </div>
  );
}
