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
import {
  MenuIcon,
  NavigationIcon,
  ShoppingCartIcon,
  StoreIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

export default function LayoutCustomer() {
  const pathname = usePathname();
  return (
    <header className="grid grid-cols-3 bg-accent justify-items-center place-items-center shadow sticky top-0 left-0 z-10">
      <NavMobile />
      <p>Logo</p>
      <NavigationDesktop />
      <div>
        {!["/checkout", "/cart-review"].includes(pathname) && <ShoppingCart />}
      </div>
    </header>
  );
}

function NavigationDesktop() {
  return (
    <nav className="hidden items-center lg:flex">
      <NavDesktopLink href={"/"}> Home</NavDesktopLink>
      <NavDesktopLink href="/supplements">Shop</NavDesktopLink>
      <NavDesktopLink href="/orders">My Orders</NavDesktopLink>
    </nav>
  );
}

function NavDesktopLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        "p-3 w-32 text-center m-1 rounded hover:bg-secondary-foreground/50 text-nowrap hover:text-secondary focus-visible:bg-secondary-foreground focus-visible:text-secondary",
        pathname === props.href && "bg-primary text-background"
      )}
    />
  );
}

function NavMobile() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="lg:hidden my-2">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="px-0">
        <SheetHeader>
          <SheetTitle asChild>
            <p className="flex items-center gap-x-4 px-4 justify-center">
              <NavigationIcon />
              <span>Navigation</span>
            </p>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col mt-10 w-full divide-y">
          <NavMobileLink href={"/"}> Home</NavMobileLink>
          <NavMobileLink href="/supplements">Shop</NavMobileLink>
          <NavMobileLink href="/orders">My Orders</NavMobileLink>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

function NavMobileLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        "p-4 text-center hover:bg-secondary-foreground/50 text-nowrap hover:text-secondary focus-visible:bg-secondary-foreground focus-visible:text-secondary",
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
