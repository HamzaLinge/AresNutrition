import {
  SupplementCard,
  SupplementCardSkeleton,
} from "@/components/SupplementCard";
import { Button } from "@/components/ui/button";
import db from "@/db/db";
import { cache } from "@/lib/cache";
import { Supplement } from "@prisma/client";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const getMostPopularSupplements = cache(
  () => {
    return db.supplement.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { orders: { _count: "desc" } },
      take: 6,
    });
  },
  ["/", "getMostPopularSupplements"],
  { revalidate: 60 * 60 * 24 }
);

const getNewestSupplements = cache(
  () => {
    return db.supplement.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    });
  },
  ["/", "getMostPopularSupplements"],
  { revalidate: 60 * 60 * 24 }
);

export default function HomePage() {
  return (
    <main className="space-y-12">
      <SupplementGridSection
        title="Most Popular"
        supplementFetcher={getMostPopularSupplements}
      />
      <SupplementGridSection
        title="Newest"
        supplementFetcher={getNewestSupplements}
      />
    </main>
  );
}

type SupplementGridSectionProps = {
  title: string;
  supplementFetcher: () => Promise<Supplement[]>;
};

function SupplementGridSection({
  title,
  supplementFetcher,
}: SupplementGridSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex gap-4">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Button variant={"outline"} asChild>
          <Link href="/supplements" className="space-x-2">
            <span>View All</span>
            <ArrowRightIcon className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense
          fallback={
            <>
              <SupplementCardSkeleton />
              <SupplementCardSkeleton />
              <SupplementCardSkeleton />
            </>
          }
        >
          <SupplementsSuspense supplementFetcher={supplementFetcher} />
        </Suspense>
      </div>
    </section>
  );
}

async function SupplementsSuspense({
  supplementFetcher,
}: {
  supplementFetcher: () => Promise<Supplement[]>;
}) {
  return (await supplementFetcher()).map((supplement) => (
    <SupplementCard
      key={supplement.id}
      {...supplement}
      thumbnail={supplement.thumbnailPaths[0]}
    />
  ));
}
