import PageHeader from "@/components/PageHeader";
import db from "@/db/db";
import SupplementForm from "../../_components/SupplementForm";

export default async function EditCategoryPage({
  params: { supplementId },
}: {
  params: { supplementId: string };
}) {
  const supplement = await db.supplement.findUnique({
    where: { id: supplementId },
  });
  const categories = await db.category.findMany({ orderBy: { name: "asc" } });

  return (
    <>
      <PageHeader>Edit Category</PageHeader>
      <SupplementForm supplement={supplement} categories={categories} />
    </>
  );
}
