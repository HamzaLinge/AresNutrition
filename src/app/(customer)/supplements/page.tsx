import PageHeader from "@/components/PageHeader";
import {
  SupplementCard,
  SupplementCardSkeleton,
} from "@/components/SupplementCard";
import db from "@/db/db";
import { cache } from "@/lib/cache";
import { Suspense } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Filter from "@/app/(customer)/supplements/_components/Filter";

const getSupplements = cache(
  () => {
    return db.supplement.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { createdAt: "desc" },
    });
  },
  ["/supplements", "getSupplements"]
  //   { revalidate: 60 * 60 * 24 }
);

export default function SupplementsPage() {
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
          <SupplementsSuspense />
        </Suspense>
      </div>
    </div>
  );
}

async function SupplementsSuspense() {
  const supplements = await getSupplements();
  return supplements.map((supplement) => (
    <SupplementCard
      key={supplement.id}
      {...supplement}
      thumbnail={supplement.thumbnailPaths[0]}
    />
  ));
}
