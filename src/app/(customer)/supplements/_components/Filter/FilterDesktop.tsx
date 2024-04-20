"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@prisma/client";
import * as Slider from "@radix-ui/react-slider";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function FilterDesktop({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSelectCategory = (categoryId: string) => {
    const params = new URLSearchParams(searchParams);
    if (categoryId === "-1") params.delete("categoryId");
    else params.set("categoryId", categoryId);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form>
      <div>
        <Label htmlFor="category">Category</Label>
        <Select onValueChange={handleSelectCategory} defaultValue="-1">
          <SelectTrigger className="w-[180px]" id="category">
            <SelectValue placeholder="Select a Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="-1">All</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="category">Min Price</Label>
        <Slider.Root defaultValue={[25, 75]}>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb />
          <Slider.Thumb />
        </Slider.Root>
      </div>
    </form>
  );
}
