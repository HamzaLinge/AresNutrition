import LayoutCustomer from "@/app/(customer)/_components/LayoutCustomer";
import Footer from "@/app/(customer)/_components/Footer";

export const dynamic = "force-dynamic"; // To force Next.js not to cache

function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LayoutCustomer />
      <div>
        {children}
        <Footer />
      </div>
    </>
  );
}

export default CustomerLayout;
