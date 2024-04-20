import NavigationCustomer from "@/app/(customer)/_components/NavigationCustomer";
import Footer from "@/app/(customer)/_components/Footer";

export const dynamic = "force-dynamic"; // To force Next.js not to cache

function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavigationCustomer />
      <div>
        {children}
        <Footer />
      </div>
    </>
  );
}

export default CustomerLayout;
