import NavigationCustomer from "@/app/(customer)/_components/NavigationCustomer";

export const dynamic = "force-dynamic"; // To force Next.js not to cache

function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavigationCustomer />
      <div className="container my-6">{children}</div>
    </>
  );
}

export default CustomerLayout;
