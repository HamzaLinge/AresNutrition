"use client";

import { useCartStore } from "@/store/cart-store-provider";
import { Order } from "@prisma/client";

export default function PurchaseFallback({ order }: { order: Order }) {
  const clearStore = useCartStore((state) => state.clearCart);

  const isSuccess = order.paymentStatus === "paid";

  if (isSuccess) clearStore();

  return (
    <div className="max-w-5xl w-full mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          {isSuccess ? "Success!" : "Failed!"}
        </h1>
        <p className="text-muted-foreground">
          {isSuccess
            ? "Great, your payment has been accepted"
            : "Oh, something made your payment fail"}
        </p>
      </div>
      <div></div>
    </div>
  );
}
