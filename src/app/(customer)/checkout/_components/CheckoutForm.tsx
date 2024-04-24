"use client";

import { createOrder } from "@/app/(customer)/checkout/_actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { useCartStore } from "@/store/cart-store-provider";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Loader2Icon, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { FaMoneyBill } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Wilaya } from "@/lib/wilaya.type";

const EXPEDITION_FEES = 500;

type CheckoutFormProps = {
  wilayas: Wilaya[];
};

export default function CheckoutForm({ wilayas }: CheckoutFormProps) {
  const supplements = useCartStore((state) => state.supplements);
  const [error, action] = useFormState(createOrder.bind(null, supplements), {});
  const { pending } = useFormStatus();

  const [termsChecked, setTermsChecked] = useState<CheckedState>(false);

  if (supplements.length === 0)
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          There are no supplements on your shopping cart
        </p>
        <Button asChild className="w-full" size={"lg"}>
          <Link href="/supplements" className="space-x-2">
            <ShoppingCartIcon />
            <span>Go to Shop</span>
          </Link>
        </Button>
      </div>
    );

  const totalAmountInDinars =
    supplements.reduce(
      (acc, value) => (acc = acc + value.priceInDinars * value.quantity),
      0
    ) + EXPEDITION_FEES;

  return (
    <form
      action={action}
      className="flex flex-col lg:grid lg:grid-cols-2 gap-12 w-full"
    >
      <div className="space-y-8">
        <p className="text-2xl text-muted-foreground uppercase">
          Shipping Information
        </p>
        {/* <Separator className="mt-4 mb-8" /> */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="shippingName">Name</Label>
            <Input id="shippingName" name="shippingName" required />
            <p className="text-muted-foreground text-sm">
              Please provide the first and last name of the person who will
              receive your order.
            </p>
            {error?.shippingName && (
              <p className="text-destructive">{error.shippingName}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="shippingPhone">Phone Number</Label>
            <Input id="shippingPhone" name="shippingPhone" required max={10} />
            <p className="text-muted-foreground text-sm">
              Please enter a valid phone number, if possible linked to a
              WhatsApp or Viber account.
            </p>
            {error?.shippingPhone && (
              <p className="text-destructive">{error.shippingPhone}</p>
            )}
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="shippingWilaya">Wilaya</Label>
            <Select name="shippingWilaya">
              <SelectTrigger id="shippingWilaya">
                <SelectValue placeholder="Select Wilaya" />
              </SelectTrigger>
              <SelectContent>
                {wilayas.map((city) => (
                  <SelectItem key={city.city} value={city.city}>
                    {city.city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-muted-foreground text-sm">
              Please indicate the Wilaya where the necklace will be shipped.
            </p>
            {error?.shippingWilaya && (
              <p className="text-destructive">{error.shippingWilaya}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="shippingAddress">Address</Label>
            <Input id="shippingAddress" name="shippingAddress" />
            <p className="text-muted-foreground text-sm">
              Please indicate shipping address
            </p>
            {error?.shippingAddress && (
              <p className="text-destructive">{error.shippingAddress}</p>
            )}
          </div>
        </div>
      </div>

      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="py-4">
          <div>
            <div className="space-y-2">
              <h4 className="text-xl font-semibold tracking-tight">
                Supplements
              </h4>
              <ul className="ml-6">
                {supplements.map((food) => (
                  <li
                    key={food.id}
                    className="flex items-center gap-x-2 justify-between"
                  >
                    <Link
                      href={`/supplements/${food.id}`}
                      className="text-muted-foreground"
                    >
                      {food.name}
                    </Link>
                    <p className="space-x-4">
                      <span>{formatCurrency(food.priceInDinars)}</span>
                      <span>x {formatNumber(food.quantity)}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <h4 className="text-xl font-semibold tracking-tight">Shipping</h4>
              <div className="items-center flex justify-between ml-6">
                <p className="text-muted-foreground">Expedition Fees</p>
                <p>{formatCurrency(500)}</p>
              </div>
            </div>

            <Separator className="my-4" />

            <p className="space-x-4 font-semibold text-end text-lg">
              <span className="text-muted-foreground">TOTAL:</span>
              <span>{formatCurrency(totalAmountInDinars)}</span>
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="space-y-12">
            <div className="space-y-6">
              <p className="text-muted-foreground">
                Your personal data will be used to process your order, support
                your experience throughout this website, and for other purposes
                described in our{" "}
                <Link href={"/privacy-policy"} className="text-card-foreground">
                  privacy policy
                </Link>
                .
              </p>
              <div className="flex items-center justify-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={termsChecked}
                  onCheckedChange={setTermsChecked}
                />
                <Label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I have read and agree to the website terms and conditions
                </Label>
              </div>
            </div>
            <Button size="lg" className="h-12 w-full" disabled={!termsChecked}>
              {pending ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                <div className="flex items-center gap-x-4">
                  <FaMoneyBill size={22} />
                  <span>Proceed to Payment</span>
                </div>
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
