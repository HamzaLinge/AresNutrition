"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { formatCurrency } from "@/lib/formatters";
import { Category } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { AiOutlineClear } from "react-icons/ai";

export default function FilterDesktop({
  categories,
  rangePrice,
}: {
  categories: Category[];
  rangePrice: { min: number; max: number };
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [priceSlider, setPriceSlider] = useState<number[]>([
    searchParams.has("minPrice")
      ? Number(searchParams.get("minPrice"))
      : rangePrice.min,
    searchParams.has("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : rangePrice.max,
  ]);

  const handleSelectCategory = (categoryId: string) => {
    const params = new URLSearchParams(searchParams);
    if (categoryId === "-1") params.delete("categoryId");
    else params.set("categoryId", categoryId);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSelectedPrice = (values: number[]) => {
    const params = new URLSearchParams(searchParams);
    params.set("minPrice", values[0].toString());
    params.set("maxPrice", values[1].toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form className="flex items-center gap-x-6">
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          onValueChange={handleSelectCategory}
          defaultValue={
            searchParams.has("categoryId")
              ? (searchParams.get("categoryId") as string)
              : "-1"
          }
        >
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

      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <p className="w-full flex items-center justify-between text-muted-foreground text-sm">
          <span>{formatCurrency(priceSlider[0])}</span>
          <span>{formatCurrency(priceSlider[1])}</span>
        </p>
        <Slider
          id="price"
          defaultValue={priceSlider}
          min={rangePrice.min}
          max={rangePrice.max}
          step={100}
          className={"w-64"}
          onValueChange={(values) => setPriceSlider(values)}
          onValueCommit={handleSelectedPrice}
          minStepsBetweenThumbs={10}
        />
      </div>

      <Button
        variant="outline"
        className="space-x-2 self-end"
        onClick={() => router.push(pathname)}
      >
        <AiOutlineClear size={18} />
        <span>Clear Filter</span>
      </Button>
    </form>
  );
}
