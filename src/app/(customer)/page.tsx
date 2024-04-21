import {
  SupplementCard,
  SupplementCardSkeleton,
} from "@/components/SupplementCard";
import { Button } from "@/components/ui/button";
import db from "@/db/db";
import { cache } from "@/lib/cache";
import { Supplement } from "@prisma/client";
import { ArrowRightIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Home - Ares Store",
  description:
    "Ares Store Nutrition Supplement Food by Ares Gym Mostaganem powered by Hamza",
};

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
    <main className="">
      <section className="relative aspect-video">
        <Image
          src={"/home-cover.jpg"}
          alt={"home-cover"}
          fill
          style={{ objectFit: "cover" }}
        />
      </section>
      <section className="container my-12 space-y-8">
        <SupplementGridSection
          title="Most Popular"
          supplementFetcher={getMostPopularSupplements}
        />
        <SupplementGridSection
          title="Newest"
          supplementFetcher={getNewestSupplements}
        />
      </section>
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
