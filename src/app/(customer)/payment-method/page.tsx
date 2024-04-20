import PageHeader from "@/components/PageHeader";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Payment Method",
  description: "Chargily Gateway Payment",
};

export default function PaymentMethod() {
  return (
    <div className="container mt-6 mb-12 space-y-12">
      <Breadcrumb className="w-full flex justify-center">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Payment Method</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PageHeader>Payment Method</PageHeader>
      <main className={"space-y-8"}>
        <p className={""}>
          At Ares Nutrition, we prioritize your convenience and security.
        </p>

        <div className={"space-y-2"}>
          <h2 className="font-semibold">Chargily Payment Gateway &rarr;</h2>
          <div>
            <p>We use Chargily as our exclusive payment gateway.</p>
            <p>
              Chargily allows you to make payments securely online using your
              credit card or bank account.
            </p>
          </div>
          <p>
            When you choose to complete your purchase, you&apos;ll be redirected
            to the Chargily payment page where you can safely enter your payment
            details.
          </p>
        </div>
        <Button asChild size={"lg"}>
          <Link href="/">Back to home</Link>
        </Button>
      </main>
    </div>
  );
}
