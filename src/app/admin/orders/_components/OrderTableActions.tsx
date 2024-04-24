"use client";

import { useTransition } from "react";
import { deleteOrderById } from "@/app/admin/_actions/order";
import { Order } from "@prisma/client";
import { toast } from "sonner";
import { LoaderIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
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

type OrderTableActions = {
  order: Order;
};

export default function OrderTableActions({ order }: OrderTableActions) {
  const [isPending, startTransition] = useTransition();
  const handleDeleteOrderById = () => {
    startTransition(async () => deleteOrderById(order.id));
    toast.success("Order successfully deleted.");
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            size={"icon"}
            variant={"ghost"}
            className="text-destructive hover:text-destructive-foreground shadow-sm hover:bg-destructive/90"
          >
            {isPending ? (
              <LoaderIcon size={18} className="animate-spin" />
            ) : (
              <TrashIcon size={18} />
            )}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              order and remove all the order-supplements that are related with
              it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90"
              onClick={handleDeleteOrderById}
            >
              {isPending ? (
                <LoaderIcon size={18} className="animate-spin" />
              ) : (
                "Yes, I'm sure"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
