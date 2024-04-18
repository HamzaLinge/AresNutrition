import { AdminPageHeader } from "@/app/admin/_components/AdminPageHeader";
import CategoryForm from "@/app/admin/categories/_components/CategoryForm";
import db from "@/db/db";

export default async function EditCategoryPage({
  params: { categoryId },
}: {
  params: { categoryId: string };
}) {
  const category = await db.category.findUnique({ where: { id: categoryId } });

  return (
    <>
      <AdminPageHeader>Edit Category</AdminPageHeader>
      <CategoryForm category={category} />
    </>
  );
}
