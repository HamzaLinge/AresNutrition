"use client";

import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/formatters";
import { useCartStore } from "@/store/cart-store-provider";
import { Category, Supplement } from "@prisma/client";
import { MinusIcon, PlusIcon, ShoppingCartIcon } from "lucide-react";

export default function AddToCart({ supplement }: { supplement: Supplement }) {
  const {
    addSupplementToChoppingCart,
    quantityPicked,
    increaseQuantity,
    decreaseQuantity,
  } = useCartStore((state) => ({
    addSupplementToChoppingCart: state.addSupplement,
    quantityPicked:
      state.supplements.find((food) => food.id === supplement.id)?.quantity ||
      0,
    increaseQuantity: state.increaseQuantity,
    decreaseQuantity: state.decreaseQuantity,
  }));

  return (
    <div className="space-y-2 w-full">
      {quantityPicked >= supplement.stock && (
        <p className="text-destructive text-sm">Out of stock</p>
      )}
      <Button
        size={"lg"}
        onClick={() => addSupplementToChoppingCart(supplement)}
        disabled={supplement.stock === 0 || quantityPicked > 0}
        className="h-12 w-full space-x-2"
      >
        <ShoppingCartIcon />
        <span>Add To Cart</span>
      </Button>
      {quantityPicked > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            {formatNumber(quantityPicked)} selected
          </p>
          <div className="flex gap-x-2 items-center">
            <Button
              variant={"outline"}
              size={"icon"}
              onClick={() => decreaseQuantity(supplement.id)}
            >
              <MinusIcon />
            </Button>
            <Button
              disabled={quantityPicked >= supplement.stock}
              variant={"outline"}
              size={"icon"}
              onClick={() => increaseQuantity(supplement.id)}
            >
              <PlusIcon />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
