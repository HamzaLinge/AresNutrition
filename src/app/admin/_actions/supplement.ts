"use server";

import db from "@/db/db";
import { formDataToObject } from "@/lib/utils";
import fs from "fs/promises";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import path from "path";
import { z } from "zod";

const fileSchema = z.instanceof(File, { message: "Required" });
const thumbnailSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/"),
  "Invalid format"
);

const addSupplementSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  priceInDinars: z.coerce
    .number()
    .int()
    .min(100, { message: "Enter a valid price" }),
  stock: z.coerce.number().int().min(0, { message: "Stock must be positive" }),
  categoryId: z.string().min(1, { message: "Select a category" }),
  thumbnails: z.array(
    thumbnailSchema.refine((file) => file.size > 0, "Thumbnail is required")
  ),
});

export async function addSupplement(prevState: unknown, formData: FormData) {
  const result = addSupplementSchema.safeParse(formDataToObject(formData));
  if (result.success === false) {
    console.log(result.error.formErrors.fieldErrors);
    return result.error.formErrors.fieldErrors;
  }
  const data = result.data;

  let thumbnailPaths: string[] = [];
  try {
    const publicDirPath = path.join(process.cwd(), "public");

    // console.log({ supplementsPath: path.join(publicDirPath, "supplements") });

    await fs.mkdir(path.join(publicDirPath, "supplements"), {
      recursive: true,
    });

    for (let i = 0; i < data.thumbnails.length; i++) {
      const thumbnailPath = `/supplements/${crypto.randomUUID()}-${data.thumbnails[i].name}`;
      // await fs.writeFile(
      //   `public${thumbnailPath}`,
      //   Buffer.from(await data.thumbnails[i].arrayBuffer())
      // );
      // console.log({
      //   thumbnailPath: `${i}-${path.join(publicDirPath, thumbnailPath)}`,
      // });

      await fs.writeFile(
        path.join(publicDirPath, thumbnailPath),
        Buffer.from(await data.thumbnails[i].arrayBuffer())
      );
      thumbnailPaths.push(thumbnailPath);
    }
  } catch (error) {
    console.error({ fileError: error });
    throw new Error("Parameter is not a number!");
  }
  await db.supplement.create({
    data: {
      name: data.name,
      priceInDinars: data.priceInDinars,
      stock: data.stock,
      description: data.description,
      categoryId: data.categoryId,
      thumbnailPaths: thumbnailPaths,
      isAvailableForPurchase: false,
    },
  });

  revalidatePath("/");
  revalidatePath("/supplements");

  redirect("/admin/supplements");
}

const editSupplementSchema = addSupplementSchema.extend({
  thumbnails: thumbnailSchema.optional(),
});

export async function updateSupplement(
  supplementId: string,
  prevState: unknown,
  formData: FormData
) {
  const result = editSupplementSchema.safeParse(formDataToObject(formData));
  console.log(result);

  if (result.success === false) {
    console.log(result.error.formErrors.fieldErrors);
    return result.error.formErrors.fieldErrors;
  }
  const data = result.data;
  const supplement = await db.supplement.findUnique({
    where: { id: supplementId },
  });

  if (supplement == null) return notFound();

  // let thumbnailPath = supplement.thumbnail;
  // if (data.thumbnail != null && data.thumbnail.size > 0) {
  //   await fs.unlink(`public${supplement.thumbnail}`);
  //   thumbnailPath = `/supplements/${crypto.randomUUID()}-${data.thumbnail.name}`;
  //   await fs.writeFile(
  //     `public${thumbnailPath}`,
  //     Buffer.from(await data.thumbnail.arrayBuffer())
  //   );
  // }

  await db.supplement.update({
    where: { id: supplementId },
    data: {
      name: data.name,
      priceInDinars: data.priceInDinars,
      stock: data.stock,
      description: data.description,
      categoryId: data.categoryId,
      isAvailableForPurchase: !(data.stock <= 0),
    },
  });

  revalidatePath("/");
  revalidatePath("/supplements");

  redirect("/admin/supplements");
}

export async function toggleSupplementAvailability(
  id: string,
  isAvailableForPurchase: boolean
) {
  await db.supplement.update({
    where: { id, stock: { gte: 0 } },
    data: { isAvailableForPurchase },
  });

  revalidatePath("/");
  revalidatePath("/supplements");
}

export async function deleteSupplement(id: string) {
  const supplement = await db.supplement.delete({
    where: { id },
  });

  if (supplement == null) return notFound();

  supplement.thumbnailPaths.forEach((filePath) =>
    fs.unlink(`public${filePath}`)
  );

  revalidatePath("/");
  revalidatePath("/supplements");
}
