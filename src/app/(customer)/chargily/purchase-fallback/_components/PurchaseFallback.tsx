"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store-provider";
import { Order, OrderSupplement, Supplement } from "@prisma/client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Contact2Icon, CopyIcon, ShoppingBagIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

type PurchaseFallbackProps = {
  supplements: (OrderSupplement & { supplement: Supplement })[];
  order: Order;
};

export default function PurchaseFallback(props: PurchaseFallbackProps) {
  const clearStore = useCartStore((state) => state.clearCart);

  const isSuccess = props.order.paymentStatus === "paid";

  useEffect(() => {
    if (isSuccess) clearStore();
  }, [isSuccess, clearStore]);

  if (!isSuccess) <FailureFallback />;

  return <SuccessFallback {...props} />;
}

function SuccessFallback({ order, supplements }: PurchaseFallbackProps) {
  const copyToClipBoard = async () => {
    if (!navigator.clipboard) {
      toast.error("Copying not supported or denied. Please copy manually.");
      return;
    }
    await navigator.clipboard.writeText(order.id);
    toast.success("The order ID has been copied to your clipboard");
  };

  return (
    <div className="w-full space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Bravo, Successful Payment.
        </h1>
        <p>Your order has been received successfully.</p>
        <blockquote className="mt-6 border-l-2 pl-6 italic">
          <p>
            <span>Expect someone to call you at </span>
            <span className="border rounded px-2 py-1 shadow">
              {order.shippingPhone}
            </span>
          </p>
          <p>
            Otherwise,{" "}
            <Link
              href="/contact-us"
              className="hover:cursor-pointer text-primary border-b border-primary"
            >
              click here to contact us
            </Link>
            .
          </p>
        </blockquote>
      </div>
      <div className="space-y-10 w-full max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Order Identifier</CardTitle>
            <CardDescription>
              Please keep this ID for future reference.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="space-x-4 py-2 px-4 rounded border shadow flex items-center justify-between">
                <span className="text-xs sm:text-sm md:text-base">
                  {order.id}
                </span>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  onClick={copyToClipBoard}
                  className="hidden md:inline-flex"
                >
                  <CopyIcon />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button asChild size={"lg"} className="space-x-2 w-full">
          <Link href={"/supplements"}>
            <ShoppingBagIcon />
            <span>Go to Shop</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}

function FailureFallback() {
  const router = useRouter();

  return (
    <div className="max-w-4xl w-full space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Hm, it seems your purchase has failed.
        </h1>
        <p className="text-destructive/75">
          This failure may be due to the Payment Gateway
        </p>
      </div>
      <div className="space-y-8">
        <p>Since your payment didn&apos;t passed, you can:</p>
        <ol className="ml-9 list-decimal space-y-4">
          <li>
            <Button
              className="space-x-2 w-72 h-12"
              onClick={() => router.refresh()}
            >
              <ReloadIcon />
              <span>Refresh</span>
            </Button>
          </li>
          <li>
            <Button
              asChild
              variant={"secondary"}
              className="space-x-2 w-72 h-12"
            >
              <Link href="/supplements">
                <ShoppingBagIcon />
                <span>Go to Shop</span>
              </Link>
            </Button>
          </li>
          <li>
            <Button asChild variant={"outline"} className="space-x-2 w-72 h-12">
              <Link href="/contact-us">
                <Contact2Icon />
                <span>Contact Us</span>
              </Link>
            </Button>
          </li>
        </ol>
      </div>
    </div>
  );
}
