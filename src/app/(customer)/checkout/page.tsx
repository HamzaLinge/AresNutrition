import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CheckoutForm from "@/app/(customer)/checkout/_components/CheckoutForm";
import PageHeader from "@/components/PageHeader";

export default function CheckoutPage() {
  return (
    <div className="container my-6">
      <PageHeader>Checkout</PageHeader>
      <CheckoutForm />
    </div>
  );
}
