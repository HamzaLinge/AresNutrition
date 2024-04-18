"use client";

import {
  addSupplement,
  updateSupplement,
} from "@/app/admin/_actions/supplement";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { Category, Supplement } from "@prisma/client";
import { useState } from "react";
import { useFormState } from "react-dom";

export default function SupplementForm({
  categories,
  supplement,
}: {
  categories: Category[];
  supplement?: Supplement | null;
}) {
  const [error, action] = useFormState(
    supplement == null
      ? addSupplement
      : updateSupplement.bind(null, supplement.id),
    {}
  );

  const [priceInDinars, setPriceInDinars] = useState<number | undefined>(
    supplement?.priceInDinars
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
          defaultValue={supplement?.name}
        />
        {error.name && <div className="text-destructive">{error.name}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="categoryId">Category</Label>
        <Select name="categoryId" defaultValue={supplement?.categoryId}>
          <SelectTrigger className="" id="categoryId">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem
                key={category.id}
                value={category.id}
                className="capitalize"
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error.categoryId && (
          <div className="text-destructive">{error.categoryId}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="priceInDinars">Price In Dinars</Label>
        <Input
          type="number"
          id="priceInDinars"
          name="priceInDinars"
          required
          value={priceInDinars || ""}
          onChange={(e) => setPriceInDinars(Number(e.target.value))}
        />
        <p className="text-muted-foreground">
          {formatCurrency(priceInDinars || 0)}
        </p>
        {error.priceInDinars && (
          <div className="text-destructive">{error.priceInDinars}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="stock">Stock</Label>
        <Input
          type="number"
          id="stock"
          name="stock"
          required
          defaultValue={supplement?.stock}
        />
        {error.stock && <div className="text-destructive">{error.stock}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          required
          defaultValue={supplement?.description}
        />
        {error.description && (
          <div className="text-destructive">{error.description}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="thumbnails">Thumbnails</Label>
        <Input
          type="file"
          multiple
          id="thumbnails"
          name="thumbnails"
          required={supplement == null}
        />
        {error.thumbnails && (
          <div className="text-destructive">{error.thumbnails}</div>
        )}
      </div>
      <SubmitButton />
    </form>
  );
}
