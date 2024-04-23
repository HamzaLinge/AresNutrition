"use client";

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
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { useCartStore } from "@/store/cart-store-provider";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CreditCardIcon,
  ShoppingCartIcon,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TableCartReview() {
  const supplements = useCartStore((state) => state.supplements);

  if (supplements.length === 0)
    return (
      <div className="gap-y-2 flex flex-col items-center">
        <p className="text-muted-foreground text-center">
          You didn&apos;t pick any supplement yet!
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
            <TableHead className="w-20">
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
                  <div className="relative w-20 aspect-square rounded overflow-hidden">
                    <Image
                      src={food.thumbnailPaths[0]}
                      alt={food.name}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes={
                        "(max-width: 640px) 10vw, (max-width: 768px) 20vw, 30vw"
                      }
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
                <TableCartReviewActions
                  supplementId={food.id}
                  supplementName={food.name}
                  supplementStock={food.stock}
                />
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
        <Button asChild size={"lg"} className="h-12 w-full">
          <Link href={"/checkout"} className="space-x-4">
            <CreditCardIcon size={22} />
            <span>Checkout</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}

type TableCartReviewActionsProps = {
  supplementId: string;
  supplementName: string;
  supplementStock: number;
};

function TableCartReviewActions(props: TableCartReviewActionsProps) {
  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <DotsVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <TableCartReviewQuantityAction
            supplementId={props.supplementId}
            supplementStock={props.supplementStock}
          />
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <AlertDialogTrigger className="focus:bg-destructive focus:text-destructive-foreground text-destructive gap-x-2 w-full flex items-center justify-center py-2">
              <Trash2 size={20} />
              <span>Delete</span>
            </AlertDialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <TableCartReviewDeleteAction {...props} />
    </AlertDialog>
  );
}

function TableCartReviewQuantityAction({
  supplementId,
  supplementStock,
}: Omit<TableCartReviewActionsProps, "supplementName">) {
  const { decrease, quantity, increase } = useCartStore((state) => ({
    decrease: state.decreaseQuantity,
    quantity:
      state.supplements.find((food) => food.id === supplementId)?.quantity || 0,
    increase: state.increaseQuantity,
  }));

  return (
    <div className="flex items-center justify-between">
      <Button
        onClick={() => decrease(supplementId)}
        disabled={quantity <= 1}
        variant={"ghost"}
        size={"icon"}
      >
        <ArrowLeftIcon />
      </Button>
      <span>{quantity}</span>
      <Button
        onClick={() => increase(supplementId)}
        disabled={quantity >= supplementStock}
        variant={"ghost"}
        size={"icon"}
      >
        <ArrowRightIcon />
      </Button>
    </div>
  );
}

function TableCartReviewDeleteAction({
  supplementId,
  supplementName,
}: TableCartReviewActionsProps) {
  const removeSupplement = useCartStore((state) => state.removeSupplement);
  return (
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
  );
}
