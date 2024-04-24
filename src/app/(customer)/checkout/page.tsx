import CheckoutForm from "@/app/(customer)/checkout/_components/CheckoutForm";
import PageHeader from "@/components/PageHeader";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cache } from "@/lib/cache";
import { Wilaya } from "@/lib/wilaya";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Checkout - Ares Store",
  description: "Proceed to checkout by providing your shipping information",
};

const getWilayas = cache(async () => {
  const wilayasUrl =
    (process.env.NODE_ENV !== "production"
      ? "http://localhost:3000"
      : `https://${process.env.VERCEL_URL}`) + "/api/wilayas";

  console.log({ wilayasUrl });

  try {
    const res = await fetch(wilayasUrl);
    if (!res.ok) {
      console.error("Error getting wilayas");
      return notFound();
    }
    const wilayas: Wilaya[] = await res.json();
    return wilayas;
  } catch (error) {
    console.error("Something wrong with getting wilayas", error);
    throw new Error("Error getting wilayas");
  }
}, ["/checkout", "getWilayas"]);

export default async function CheckoutPage() {
  const wilayas = await getWilayas();

  return (
    <div className="container my-6 flex flex-col items-center gap-y-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/cart-review">Cart Review</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Checkout</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PageHeader>Checkout</PageHeader>

      <CheckoutForm wilayas={wilayas} />
    </div>
  );
}
