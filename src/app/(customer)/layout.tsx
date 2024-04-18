import { Navigation, NavLink } from "@/components/Navigation";

export const dynamic = "force-dynamic"; // To force Next.js not to cache

function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navigation>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/supplements">Supplements</NavLink>
        <NavLink href="/orders">My Orders</NavLink>
      </Navigation>
      <div className="container my-6">{children}</div>
    </>
  );
}

export default CustomerLayout;
