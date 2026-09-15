'use client';

import { usePathname } from 'next/navigation';
import AdminNavbar from '@/components/AdminNavbar';

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  return (
    <>
      {!isLoginPage && <AdminNavbar />}
      {children}
    </>
  );
}
