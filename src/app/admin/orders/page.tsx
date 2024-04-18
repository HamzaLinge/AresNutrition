import PageHeader from "@/components/PageHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import db from "@/db/db";
import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";

export default async function AdminOrdersPage() {
  return (
    <>
      <PageHeader>Orders</PageHeader>
      <OrdersTable />
    </>
  );
}

async function OrdersTable() {
  const orders = await db.order.findMany({
    select: {
      id: true,
      amountInDinars: true,
      shippingName: true,
      shippingWilaya: true,
      shippingPhone: true,
      paymentStatus: true,
    },
    orderBy: { updatedAt: "desc" },
  });

  if (orders.length === 0) return <p>No orders found</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Amount</TableHead>
          <TableHead>Shipping</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          {orders.map((order) => (
            <>
              <TableCell>{formatCurrency(order.amountInDinars)}</TableCell>
              <TableCell className="grid grid-cols-3 gap-x-2">
                <span>{order.shippingName}</span>
                <span>{order.shippingWilaya}</span>
                <span>{order.shippingPhone}</span>
              </TableCell>
              <TableCell>
                <span
                  className={cn(
                    "p-1 rounded",
                    order.paymentStatus === "paid"
                      ? "bg-muted-foreground"
                      : "bg-destructive/75"
                  )}
                >
                  {order.paymentStatus}
                </span>
              </TableCell>
            </>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
}
