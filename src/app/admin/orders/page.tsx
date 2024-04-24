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
import OrderTableActions from "@/app/admin/orders/_components/OrderTableActions";

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
    orderBy: { updatedAt: "desc" },
  });

  if (orders.length === 0) return <p>No orders found</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Status</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Shipping</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>
              <span
                className={cn(
                  "p-2 rounded uppercase text-primary-foreground",
                  order.paymentStatus === "paid"
                    ? "bg-muted-foreground"
                    : "bg-destructive/75"
                )}
              >
                {order.paymentStatus}
              </span>
            </TableCell>
            <TableCell>{formatCurrency(order.amountInDinars)}</TableCell>
            <TableCell className="space-x-4">
              <span>{order.shippingName}</span>
              <span>{order.shippingWilaya}</span>
              <span>{order.shippingPhone}</span>
            </TableCell>
            <TableCell>
              <OrderTableActions order={order} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
