"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  deleteSupplement,
  toggleSupplementAvailability,
} from "@/app/admin/_actions/supplement";

export function ActiveToggleSupplementDropdownItem({
  id,
  disabled,
  isAvailableForPurchase,
}: {
  id: string;
  disabled: boolean;
  isAvailableForPurchase: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <DropdownMenuItem
      disabled={isPending || disabled}
      onClick={() => {
        startTransition(async () => {
          await toggleSupplementAvailability(id, !isAvailableForPurchase);
          router.refresh();
        });
      }}
    >
      {isAvailableForPurchase ? "Deactivate" : "Activate"}
    </DropdownMenuItem>
  );
}

export function DeleteSupplementDropdownItem({
  id,
  disabled,
}: {
  id: string;
  disabled: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <DropdownMenuItem
      className="focus:bg-destructive focus:text-destructive-foreground text-destructive"
      disabled={disabled || isPending}
      onClick={() => {
        startTransition(async () => {
          await deleteSupplement(id);
          router.refresh();
        });
      }}
    >
      Delete
    </DropdownMenuItem>
  );
}
