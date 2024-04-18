import CategoryForm from "@/app/admin/categories/_components/CategoryForm";
import PageHeader from "@/components/PageHeader";

export default function NewCategoryPage() {
  return (
    <>
      <PageHeader>Add Category</PageHeader>
      <CategoryForm />
    </>
  );
}
