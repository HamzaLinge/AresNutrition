import {
  ActiveToggleSupplementDropdownItem,
  DeleteSupplementDropdownItem,
} from "@/app/admin/supplements/_components/SupplementActions";
import PageHeader from "@/components/PageHeader";
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
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import Link from "next/link";

export default async function AdminSupplementsPage() {
  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <PageHeader>Supplements</PageHeader>
        <Button asChild>
          <Link href="/admin/supplements/new">Add Supplement</Link>
        </Button>
      </div>
      <SupplementsTable />
    </>
  );
}

async function SupplementsTable() {
  const supplements = await db.supplement.findMany({
    select: {
      id: true,
      name: true,
      priceInDinars: true,
      stock: true,
      isAvailableForPurchase: true,
      _count: { select: { orders: true } },
    },
    orderBy: { name: "asc" },
  });

  if (supplements.length === 0) return <p>No supplements found</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-0">
            <span className="sr-only">Available For Purchase</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {supplements.map((supplement) => (
          <TableRow key={supplement.id}>
            <TableCell>
              {supplement.isAvailableForPurchase ? (
                <>
                  <span className="sr-only">Available</span>
                  <CheckCircle2 />
                </>
              ) : (
                <>
                  <span className="sr-only">Unavailable</span>
                  <XCircle className="stroke-destructive" />
                </>
              )}
            </TableCell>
            <TableCell>{supplement.name}</TableCell>
            <TableCell>{formatCurrency(supplement.priceInDinars)}</TableCell>
            <TableCell>{formatNumber(supplement.stock)}</TableCell>
            <TableCell>{formatNumber(supplement._count.orders)}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/supplements/${supplement.id}/edit`}>
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <ActiveToggleSupplementDropdownItem
                    id={supplement.id}
                    disabled={supplement.stock <= 0}
                    isAvailableForPurchase={supplement.isAvailableForPurchase}
                  />
                  <DropdownMenuSeparator />
                  <DeleteSupplementDropdownItem
                    id={supplement.id}
                    disabled={supplement._count.orders > 0}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
