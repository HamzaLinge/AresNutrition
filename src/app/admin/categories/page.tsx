import { DeleteCategoryDropdownItem } from "@/app/admin/categories/_components/CategoryActions";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import db from "@/db/db";
import { formatNumber } from "@/lib/formatters";
import { MoreVertical } from "lucide-react";
import Link from "next/link";

export default async function AdminCategoriesPage() {
  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <PageHeader>Categories</PageHeader>
        <Button asChild>
          <Link href="/admin/categories/new">Add Category</Link>
        </Button>
      </div>
      <CategoriesTable />
    </>
  );
}

async function CategoriesTable() {
  const categories = await db.category.findMany({
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          supplements: true,
        },
      },
    },
    orderBy: { name: "asc" },
  });

  if (categories.length === 0) return <p>No categories found</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Supplements Count</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell>{category.name}</TableCell>
            <TableCell>{formatNumber(category._count.supplements)}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/categories/${category.id}/edit`}>
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DeleteCategoryDropdownItem
                    id={category.id}
                    disabled={category._count.supplements > 0}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
