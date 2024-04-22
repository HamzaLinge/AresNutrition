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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { formatCurrency } from "@/lib/formatters";
import { Category } from "@prisma/client";
import { FilterIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { AiOutlineClear } from "react-icons/ai";

type FilterFormProps = {
  categories: Category[];
  rangePrice: { min: number; max: number };
};

export default function FilterForm(props: FilterFormProps) {
  return (
    <>
      <FilterDesktop {...props} />
      <FilterMobile {...props} />
    </>
  );
}

function FilterDesktop({ categories, rangePrice }: FilterFormProps) {
  return (
    <form className="hidden md:flex items-center gap-x-6">
      <div className="w-48">
        <FilterCategory categories={categories} />
      </div>

      <div className="w-72">
        <FilterPrice rangePrice={rangePrice} />
      </div>

      <div className="self-end ml-10">
        <ClearFilter />
      </div>
    </form>
  );
}

function FilterMobile({ categories, rangePrice }: FilterFormProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"} size={"icon"} className="md:hidden">
          <FilterIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Filter</SheetTitle>
        </SheetHeader>
        <form className="flex flex-col items-center gap-y-6">
          <div className="w-full">
            <FilterCategory categories={categories} />
          </div>

          <div className="w-full">
            <FilterPrice rangePrice={rangePrice} />
          </div>

          <SheetFooter className="w-full mt-10">
            <SheetClose asChild>
              <ClearFilter />
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

function FilterCategory({ categories }: Pick<FilterFormProps, "categories">) {
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
        <SelectTrigger id="category">
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
  );
}

function FilterPrice({ rangePrice }: Pick<FilterFormProps, "rangePrice">) {
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

  const handleSelectedPrice = (values: number[]) => {
    const params = new URLSearchParams(searchParams);
    params.set("minPrice", values[0].toString());
    params.set("maxPrice", values[1].toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
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
        onValueChange={(values) => setPriceSlider(values)}
        onValueCommit={handleSelectedPrice}
        minStepsBetweenThumbs={10}
      />
    </div>
  );
}

function ClearFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const clearSearchParams = () => {
    if (!searchParams.entries().next().done) {
      router.push(`${pathname}`);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      className={"space-x-2"}
      onClick={clearSearchParams}
    >
      <AiOutlineClear size={18} />
      <span>Clear Filter</span>
    </Button>
  );
}
