"use client";

import { useCartStore } from "@/store/cart-store-provider";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  CreditCardIcon,
  DeleteIcon,
  ShoppingCartIcon,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function TableCartReview() {
  const supplements = useCartStore((state) => state.supplements);

  if (supplements.length === 0)
    return (
      <div className="gap-y-2 flex flex-col items-center">
        <p className="text-muted-foreground text-center">
          You didn't pick any supplement yet!
        </p>
        <Button asChild size="lg">
          <Link href="supplements" className="space-x-2">
            <ShoppingCartIcon />
            <span>Got to Shop</span>
          </Link>
        </Button>
      </div>
    );

  const totalAmountInDinars = supplements.reduce(
    (acc, crr) => (acc = acc + crr.priceInDinars * crr.quantity),
    0
  );

  return (
    <div className="w-full max-w-4xl space-y-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <span className="sr-only">Thumbnail</span>
            </TableHead>
            <TableHead className="grow">Name</TableHead>
            <TableHead className="w-20">Price</TableHead>
            <TableHead className="w-20">Quantity</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {supplements.map((food) => (
            <TableRow key={food.id}>
              <TableCell>
                <Link href={`/supplements/${food.id}`}>
                  <div className="relative aspect-square rounded overflow-hidden">
                    <Image
                      src={food.thumbnailPaths[0]}
                      alt={food.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </Link>
              </TableCell>
              <TableCell>
                <span>{food.name}</span>
                <p className="line-clamp-3 text-muted-foreground">
                  {food.description}
                </p>
              </TableCell>
              <TableCell>{formatCurrency(food.priceInDinars)}</TableCell>
              <TableCell>x {formatNumber(food.quantity)}</TableCell>
              <TableCell className="text-right">
                <div>
                  <TableCartReviewDeleteAction
                    supplementId={food.id}
                    supplementName={food.name}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end gap-x-4 border-t pt-2">
        <span>Total:</span>
        <span className="font-semibold">
          {formatCurrency(totalAmountInDinars)}
        </span>
      </div>
      <div className="w-full flex items-center justify-center">
        <Button asChild size={"lg"} className="h-12 w-72">
          <Link href={"/checkout"} className="space-x-2">
            <CreditCardIcon />
            <span>Checkout</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}

function TableCartReviewDeleteAction({
  supplementId,
  supplementName,
}: {
  supplementId: string;
  supplementName: string;
}) {
  const removeSupplement = useCartStore((state) => state.removeSupplement);
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash2 size={20} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You are going to remove {supplementName} from your shopping cart.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant={"destructive"}
              onClick={() => removeSupplement(supplementId)}
            >
              Yes
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
