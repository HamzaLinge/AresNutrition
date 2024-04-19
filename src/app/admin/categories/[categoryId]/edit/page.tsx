import CategoryForm from "@/app/admin/categories/_components/CategoryForm";
import PageHeader from "@/components/PageHeader";
import db from "@/db/db";

export default async function EditCategoryPage({
  params: { categoryId },
}: {
  params: { categoryId: string };
}) {
  const category = await db.category.findUnique({ where: { id: categoryId } });

  return (
    <>
      <PageHeader>Edit Category</PageHeader>
      <CategoryForm category={category} />
    </>
  );
}
