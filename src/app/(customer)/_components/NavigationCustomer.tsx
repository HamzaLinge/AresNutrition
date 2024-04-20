"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { CartSupplement } from "@/store/cart-store";
import { useCartStore } from "@/store/cart-store-provider";
import { ShoppingCartIcon, StoreIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

export default function NavigationCustomer() {
  return (
    <nav className="grid grid-cols-3 bg-accent justify-items-center place-items-center shadow">
      <p>Logo</p>
      <div className="flex items-center">
        <NavCustomerLink href={"/"}> Home</NavCustomerLink>
        <NavCustomerLink href="/supplements">Shop</NavCustomerLink>
        <NavCustomerLink href="/orders">My Order</NavCustomerLink>
        <NavCustomerLink href="/contact">Contact</NavCustomerLink>
        <NavCustomerLink href="/about-us">About Us</NavCustomerLink>
      </div>
      <div>
        <ShoppingCart />
      </div>
    </nav>
  );
}

function NavCustomerLink(
  props: Omit<ComponentProps<typeof Link>, "className">
) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        "p-3 m-1 rounded hover:bg-secondary-foreground/85 text-nowrap hover:text-secondary/85 focus-visible:bg-secondary-foreground focus-visible:text-secondary",
        pathname === props.href && "bg-primary text-background"
      )}
    />
  );
}

function ShoppingCart() {
  const { cartSupplements, clearCart } = useCartStore((state) => ({
    cartSupplements: state.supplements,
    clearCart: state.clearCart,
  }));
  const totalAmountInDinars = cartSupplements.reduce(
    (acc, curr) => (acc = acc + curr.priceInDinars * curr.quantity),
    0
  );
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="flex gap-x-1" variant={"ghost"}>
          <span className="sr-only">Shopping Cart</span>
          <ShoppingCartIcon />
          <Badge
            variant={cartSupplements.length === 0 ? "secondary" : "default"}
            className="pointer-events-none"
          >
            {cartSupplements.length}
          </Badge>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle asChild>
            <div className="flex items-center gap-x-2">
              <ShoppingCartIcon />
              <span>Shopping Cart</span>
            </div>
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="mt-10">
          {cartSupplements.length === 0 ? (
            <div className="space-y-2">
              <p className="text-muted-foreground text-center">
                You didn&apos;t pick any supplement yet!
              </p>
              <SheetFooter>
                <SheetClose asChild>
                  <Button asChild>
                    <Link href="/supplements" className="space-x-2 w-full">
                      <StoreIcon />
                      <span>Go to Shop</span>
                    </Link>
                  </Button>
                </SheetClose>
              </SheetFooter>
            </div>
          ) : (
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="divide-y">
                  {cartSupplements.map((food) => (
                    <ShoppingCartCard key={food.id} {...food} />
                  ))}
                </div>
                <div className="flex items-center justify-between border-t pt-2">
                  <span className="text-muted-foreground">Total:</span>
                  <p className="font-bold ">
                    {formatCurrency(totalAmountInDinars)}
                  </p>
                </div>
              </div>
              <SheetFooter className="gap-y-2">
                <SheetClose asChild>
                  <Button asChild size={"lg"} className="w-full space-x-2">
                    <Link href={"/cart-review"}>
                      <ShoppingCartIcon />
                      <span>Review Cart</span>
                    </Link>
                  </Button>
                </SheetClose>
                <Button
                  variant={"outline"}
                  size={"lg"}
                  onClick={() => clearCart()}
                >
                  Clear
                </Button>
              </SheetFooter>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function ShoppingCartCard(props: CartSupplement) {
  return (
    <div className="flex items-center gap-x-2 mb-2 last:mb-0 pt-2 first:pt-0 text-sm">
      <Link href={`/supplements/${props.id}`}>
        <div className="relative w-16 aspect-square overflow-hidden rounded">
          <Image
            src={props.thumbnailPaths[0]}
            alt={props.name}
            fill
            style={{ objectFit: "cover" }}
            sizes="30vw"
          />
        </div>
      </Link>
      <div className="grow">
        <h3>{props.name}</h3>
        <p className="text-muted-foreground line-clamp-1">
          {props.description}
        </p>
      </div>
      <div className="flex flex-col items-end">
        <p>{formatCurrency(props.priceInDinars)}</p>
        <p>x {formatNumber(props.quantity)}</p>
      </div>
    </div>
  );
}
