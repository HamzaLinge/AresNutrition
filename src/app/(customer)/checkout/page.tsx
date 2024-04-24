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
import { getWilayas } from "@/lib/wilaya";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout - Ares Store",
  description: "Proceed to checkout by providing your shipping information",
};

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
