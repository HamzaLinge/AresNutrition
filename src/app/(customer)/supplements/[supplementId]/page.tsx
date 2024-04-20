import AddToCart from "@/app/(customer)/_components/AddToCart";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import db from "@/db/db";
import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SupplementCard } from "@/components/SupplementCard";

async function getSupplementData(supplementId: string) {
  const supplement = await db.supplement.findUnique({
    where: { id: supplementId },
    include: { category: true },
  });
  if (supplement == null) return notFound();

  const relatedSupplements = await db.supplement.findMany({
    where: { categoryId: supplement.categoryId, id: { not: supplement.id } },
    take: 6,
  });

  return { supplement, relatedSupplements };
}

export default async function SupplementPage({
  params: { supplementId },
}: {
  params: { supplementId: string };
}) {
  const { supplement, relatedSupplements } =
    await getSupplementData(supplementId);

  return (
    <div className="space-y-10 container mt-6 mb-20">
      <Breadcrumb className="flex justify-center">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/supplements">Shop</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{supplement.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex gap-x-8">
        <Carousel className="w-1/3">
          <CarouselContent>
            {supplement.thumbnailPaths.map((imgPath) => (
              <CarouselItem key={imgPath}>
                <div className="relative w-full aspect-square rounded overflow-hidden">
                  <Image
                    src={imgPath}
                    alt={imgPath}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="space-y-10">
          <div className="space-y-4">
            <h1 className="text-4xl">{supplement.name}</h1>
            <p>{supplement.category.name}</p>
            <p className="font-semibold">
              {formatCurrency(supplement.priceInDinars)}
            </p>
          </div>
          <p className="text-muted-foreground">{supplement.description}</p>
          <AddToCart supplement={supplement} />
        </div>
      </div>

      {relatedSupplements.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {relatedSupplements.map((food) => (
            <SupplementCard
              key={food.id}
              {...food}
              thumbnail={food.thumbnailPaths[0]}
            />
          ))}
        </div>
      )}
    </div>
  );
}
