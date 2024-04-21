"use client";

import SubmitButton from "@/components/SubmitButton";
import { createOrder } from "@/app/(customer)/checkout/_actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState, useFormStatus } from "react-dom";
import { useCartStore } from "@/store/cart-store-provider";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaMoneyBill } from "react-icons/fa";

export default function CheckoutForm() {
  const supplements = useCartStore((state) =>
    state.supplements.map((food) => ({
      id: food.id,
      priceInDinars: food.priceInDinars,
      quantity: food.quantity,
    }))
  );
  const [error, action] = useFormState(createOrder.bind(null, supplements), {});
  const { pending } = useFormStatus();

  if (supplements.length === 0)
    return <div>There are no supplements on your shopping cart</div>;

  return (
    <form action={action} className="space-y-8 w-full max-w-xl">
      <p className="text-sm text-muted-foreground">
        Enter your Shipping Information
      </p>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="shippingName">Name</Label>
          <Input id="shippingName" name="shippingName" required />
          {error?.shippingName && (
            <p className="text-destructive">{error.shippingName}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="shippingPhone">Phone Number</Label>
          <Input id="shippingPhone" name="shippingPhone" required max={10} />
          {error?.shippingPhone && (
            <p className="text-destructive">{error.shippingPhone}</p>
          )}
        </div>
      </div>
      <div>
        <div className="space-y-4">
          <Label htmlFor="shippingWilaya">Wilaya</Label>
          <Input id="shippingWilaya" name="shippingWilaya" required />
          {error?.shippingWilaya && (
            <p className="text-destructive">{error.shippingWilaya}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="shippingAddress">Address</Label>
          <Input id="shippingAddress" name="shippingAddress" />
          {error?.shippingAddress && (
            <p className="text-destructive">{error.shippingAddress}</p>
          )}
        </div>
      </div>
      <Button size="lg" className="h-12 w-full">
        {pending ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <div className="flex items-center gap-x-4">
            <FaMoneyBill size={22} />
            <span>Proceed to Payment</span>
          </div>
        )}
      </Button>
    </form>
  );
}
