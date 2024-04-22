import PageHeader from "@/components/PageHeader";
import {
  SupplementCard,
  SupplementCardSkeleton,
} from "@/components/SupplementCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import db from "@/db/db";
import { cache } from "@/lib/cache";
import { Prisma } from "@prisma/client";
import { Suspense } from "react";
import Filter from "./_components/Filter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop - Ares Store",
  description:
    "Shop Supplement Food for Athlete Enthusiasts at Ares Gym Mostaganem",
};

const getSupplements = (searchParams: Record<string, string>) => {
  const whereClause: Prisma.SupplementWhereInput = {
    isAvailableForPurchase: true,
  };

  if (searchParams.categoryId) {
    whereClause.categoryId = searchParams.categoryId;
  }

  if (searchParams.minPrice && searchParams.maxPrice) {
    whereClause.priceInDinars = {
      gte: parseInt(searchParams.minPrice, 10),
      lte: parseInt(searchParams.maxPrice, 10),
    };
  }

  // console.log("Querying Supplements with:", whereClause);

  return db.supplement.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
  });
};

export default function SupplementsPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return (
    <div className="space-y-10 container my-6">
      <Breadcrumb className="flex items-center justify-center">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Shop</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="w-full text-center">
        <PageHeader>Shop</PageHeader>
      </div>

      <Filter />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense
          fallback={
            <>
              <SupplementCardSkeleton />
              <SupplementCardSkeleton />
              <SupplementCardSkeleton />
              <SupplementCardSkeleton />
              <SupplementCardSkeleton />
              <SupplementCardSkeleton />
            </>
          }
        >
          <SupplementsSuspense searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

async function SupplementsSuspense({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const supplements = await getSupplements(searchParams);

  return supplements.map((supplement) => (
    <SupplementCard
      key={supplement.id}
      {...supplement}
      thumbnail={supplement.thumbnailPaths[0]}
    />
  ));
}
