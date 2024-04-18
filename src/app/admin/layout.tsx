import { Navigation, NavLink } from "@/components/Navigation";

export const dynamic = "force-dynamic"; // To force Next.js not to cache

function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navigation>
        <NavLink href="/admin">Dashboard</NavLink>
        <NavLink href="/admin/supplements">Supplements</NavLink>
        <NavLink href="/admin/categories">Categories</NavLink>
        <NavLink href="/admin/orders">Sales</NavLink>
      </Navigation>
      <div className="container my-6">{children}</div>
    </>
  );
}

export default AdminLayout;
