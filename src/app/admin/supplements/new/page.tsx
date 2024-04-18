import SupplementForm from "@/app/admin/supplements/_components/SupplementForm";
import PageHeader from "@/components/PageHeader";
import db from "@/db/db";

export default async function NewSupplementPage() {
  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <>
      <PageHeader>Add Supplement</PageHeader>
      <SupplementForm categories={categories} />
    </>
  );
}
