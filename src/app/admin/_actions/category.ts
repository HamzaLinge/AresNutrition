"use server";

import db from "@/db/db";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";

const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export async function addCategory(prevState: unknown, formData: FormData) {
  const result = categorySchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (result.success === false) {
    console.log(result.error.formErrors.fieldErrors);

    return result.error.formErrors.fieldErrors;
  }
  const data = result.data;

  await db.category.create({ data: { name: data.name } });

  redirect("/admin/categories");
}

export async function updateCategory(
  categoryId: string,
  prevState: unknown,
  formData: FormData
) {
  const result = categorySchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (result.success === false) {
    console.log(result.error.formErrors.fieldErrors);

    return result.error.formErrors.fieldErrors;
  }
  const data = result.data;

  const category = await db.category.findUnique({ where: { id: categoryId } });
  if (category == null) return notFound();

  await db.category.update({
    where: { id: categoryId },
    data: { name: data.name },
  });

  redirect("/admin/categories");
}

export async function deleteCategory(id: string) {
  const category = await db.category.delete({ where: { id } });

  if (category == null) return notFound();
}
