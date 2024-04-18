import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";

async function getSalesData() {
  const [orderPaid, orderFailed] = await Promise.all([
    db.order.aggregate({
      _sum: { amountInDinars: true },
      _count: true,
      where: { paymentStatus: "paid" },
    }),
    db.order.aggregate({
      _sum: { amountInDinars: true },
      _count: true,
      where: { paymentStatus: "failed" },
    }),
  ]);

  return { orderPaid, orderFailed };
}

async function getSupplementData() {
  const [activeCount, inactiveCount] = await Promise.all([
    db.supplement.count({ where: { isAvailableForPurchase: true } }),
    db.supplement.count({ where: { isAvailableForPurchase: false } }),
  ]);

  return { activeCount, inactiveCount };
}

export default async function AdminDashboard() {
  const [salesData, supplementData] = await Promise.all([
    getSalesData(),
    getSupplementData(),
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard
        title={"Successful Sales"}
        description={`${formatNumber(salesData.orderPaid._count)} Orders`}
        content={formatCurrency(salesData.orderPaid._sum.amountInDinars || 0)}
      />
      <DashboardCard
        title={"Failed Sales"}
        description={`${formatCurrency(salesData.orderFailed._count)} Orders`}
        content={formatNumber(salesData.orderFailed._sum.amountInDinars || 0)}
      />
      <DashboardCard
        title={"Active Supplements"}
        description={`${formatNumber(supplementData.inactiveCount)} Inactive`}
        content={formatNumber(supplementData.activeCount)}
      />
    </div>
  );
}

function DashboardCard({
  title,
  description,
  content,
}: {
  title: string;
  description: string | number;
  content: string | number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
    </Card>
  );
}
