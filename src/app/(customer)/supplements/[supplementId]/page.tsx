import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "@/db/db";
import { formatCurrency } from "@/lib/formatters";
import { notFound } from "next/navigation";
import AddToCart from "@/app/(customer)/_components/AddToCart";

async function getSupplementById(supplementId: string) {
  return db.supplement.findUnique({ where: { id: supplementId } });
}

export default async function SupplementPage({
  params: { supplementId },
}: {
  params: { supplementId: string };
}) {
  const supplement = await getSupplementById(supplementId);

  if (!supplement) return notFound();

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{supplement.name}</CardTitle>
          <CardDescription>
            {formatCurrency(supplement.priceInDinars)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <AddToCart supplement={supplement} />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
