"use client";

import SubmitButton from "@/components/SubmitButton";
import { createOrder } from "@/app/(customer)/checkout/_actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";
import { useCartStore } from "@/store/cart-store-provider";

export default function CheckoutForm() {
  const supplements = useCartStore((state) =>
    state.supplements.map((food) => ({
      id: food.id,
      priceInDinars: food.priceInDinars,
      quantity: food.quantity,
    }))
  );
  const [error, action] = useFormState(createOrder.bind(null, supplements), {});

  if (supplements.length === 0)
    return <div>There are no supplements on your shopping cart</div>;

  return (
    <form action={action} className="space-y-10">
      <div className="space-y-8">
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
        <div className="space-y-2">
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
      <SubmitButton />
    </form>
  );
}
