import AdminLayoutClient from './layout-client';

export const metadata = {
  title: 'Admin | KacaFilm',
  description: 'Dashboard admin untuk mengelola bahan kaca film dan foto hasil pemasangan.',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
