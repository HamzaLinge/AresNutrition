"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store-provider";
import { Supplement } from "@prisma/client";

export default function AddToCart({ supplement }: { supplement: Supplement }) {
  const { addSupplementToChoppingCart, isPicked } = useCartStore((state) => ({
    addSupplementToChoppingCart: state.addSupplement,
    isPicked: !!state.supplements.find((food) => food.id === supplement.id),
  }));

  return (
    <>
      <Button
        size={"lg"}
        onClick={() => addSupplementToChoppingCart(supplement)}
        disabled={isPicked}
      >
        Add To Cart
      </Button>
    </>
  );
}
