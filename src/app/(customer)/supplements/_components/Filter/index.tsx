import db from "@/db/db";
import FilterDesktop from "./FilterDesktop";

export default async function Filter() {
  const categories = await db.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <FilterDesktop categories={categories} />
    </div>
  );
}
