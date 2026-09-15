'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Images, Camera, MessageSquare, LogOut, Menu } from 'lucide-react';

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="backdrop-blur-md bg-surface/20 border border-border rounded-b-xl fixed top-0 left-0 right-0 z-50 mx-4 mt-4 shadow-lg shadow-black/40">
      <div className="container-custom">
        <div className="flex justify-between items-center h-14">
          <Link href="/admin/material" className="flex items-center gap-2 text-xl font-bold text-white">
            <span className="text-electric">●</span>
            KacaFilm Admin
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/admin/material"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isActive('/admin/material')
                  ? 'bg-electric text-background shadow-[0_0_15px_rgba(25,167,255,0.3)]'
                  : 'text-text-secondary hover:text-white hover:bg-electric/10'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 inline mr-1" />
              Dashboard
            </Link>
            <Link
              href="/admin/material/tambah"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isActive('/admin/material/tambah')
                  ? 'bg-electric text-background shadow-[0_0_15px_rgba(25,167,255,0.3)]'
                  : 'text-text-secondary hover:text-white hover:bg-electric/10'
              }`}
            >
              <Images className="w-4 h-4 inline mr-1" />
              Tambah Bahan
            </Link>
            <Link
              href="/admin/foto/upload"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isActive('/admin/foto/upload')
                  ? 'bg-electric text-background shadow-[0_0_15px_rgba(25,167,255,0.3)]'
                  : 'text-text-secondary hover:text-white hover:bg-electric/10'
              }`}
            >
              <Camera className="w-4 h-4 inline mr-1" />
              Hasil Pemasangan
            </Link>
            <Link
              href="/admin/testimonials"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                pathname.startsWith('/admin/testimonials')
                  ? 'bg-electric text-background shadow-[0_0_15px_rgba(25,167,255,0.3)]'
                  : 'text-text-secondary hover:text-white hover:bg-electric/10'
              }`}
            >
              <MessageSquare className="w-4 h-4 inline mr-1" />
              Testimoni
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full text-sm font-medium border border-electric text-electric hover:bg-electric hover:text-background transition-all"
            >
              <LogOut className="w-4 h-4 inline mr-1" />
              Keluar
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-full border border-border text-text-secondary hover:text-white transition-all text-sm"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
