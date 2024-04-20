import db from "@/db/db";
import FilterDesktop from "./FilterDesktop";

export default async function Filter() {
  const categories = await db.category.findMany({ orderBy: { name: "asc" } });
  const rangePrice = await db.supplement.aggregate({
    _min: { priceInDinars: true },
    _max: { priceInDinars: true },
  });
  return (
    <div>
      <FilterDesktop
        categories={categories}
        rangePrice={{
          min: rangePrice._min.priceInDinars || 0,
          max: rangePrice._max.priceInDinars || 0,
        }}
      />
    </div>
  );
}
