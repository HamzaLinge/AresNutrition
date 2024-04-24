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
import { Wilaya } from "@/lib/wilaya.type";
import fs from "fs/promises";
import { Metadata } from "next";
import path from "path";

export const metadata: Metadata = {
  title: "Checkout - Ares Store",
  description: "Proceed to checkout by providing your shipping information",
};

const getWilayas = cache(async () => {
  const filePath = path.join(process.cwd(), "src", "data", "wilayas.json");

  try {
    const buffer = await fs.readFile(filePath, { encoding: "utf-8" });
    const wilayas: Wilaya[] = JSON.parse(buffer);

    return wilayas;
  } catch (error) {
    console.error("Error reading wilayas", error);
    throw new Error("Error reading wilayas");
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
