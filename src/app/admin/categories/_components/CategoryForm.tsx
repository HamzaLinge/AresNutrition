"use client";

import { addCategory, updateCategory } from "@/app/admin/_actions/category";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Category } from "@prisma/client";
import { useFormState } from "react-dom";

export default function CategoryForm({
  category,
}: {
  category?: Category | null;
}) {
  const [error, action] = useFormState(
    category == null ? addCategory : updateCategory.bind(null, category.id),
    {}
  );

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={category?.name}
        />
        {error.name && <div className="text-destructive">{error.name}</div>}
      </div>
      <SubmitButton />
    </form>
  );
}
