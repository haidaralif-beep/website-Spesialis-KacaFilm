'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Images, Camera, MessageSquare, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navLinks = [
    { href: '/admin/material', label: 'Dashboard', icon: LayoutDashboard, activeCheck: () => isActive('/admin/material') },
    { href: '/admin/material/tambah', label: 'Tambah Bahan', icon: Images, activeCheck: () => isActive('/admin/material/tambah') },
    { href: '/admin/foto/upload', label: 'Hasil Pemasangan', icon: Camera, activeCheck: () => isActive('/admin/foto/upload') },
    { href: '/admin/testimonials', label: 'Testimoni', icon: MessageSquare, activeCheck: () => pathname.startsWith('/admin/testimonials') },
  ];

  return (
    <>
      <nav className="backdrop-blur-md bg-surface/20 border border-border rounded-b-xl fixed top-0 left-0 right-0 z-50 mx-4 mt-4 shadow-lg shadow-black/40">
        <div className="container-custom">
          <div className="flex justify-between items-center h-14">
            <Link href="/admin/material" className="flex items-center gap-2 text-xl font-bold text-white">
              <span className="text-electric">●</span>
              KacaFilm Admin
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    link.activeCheck()
                      ? 'bg-electric text-background shadow-[0_0_15px_rgba(25,167,255,0.3)]'
                      : 'text-text-secondary hover:text-white hover:bg-electric/10'
                  }`}
                >
                  <link.icon className="w-4 h-4 inline mr-1" />
                  {link.label}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-full text-sm font-medium border border-electric text-electric hover:bg-electric hover:text-background transition-all"
              >
                <LogOut className="w-4 h-4 inline mr-1" />
                Keluar
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-text-secondary hover:text-white transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="absolute top-[80px] left-4 right-4 bg-surface border border-border rounded-xl p-4 shadow-2xl shadow-black/50 space-y-2"
            onClick={(e) => e.stopPropagation()}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  link.activeCheck()
                    ? 'bg-electric text-background'
                    : 'text-text-secondary hover:text-white hover:bg-white/5'
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => { setMobileOpen(false); handleLogout(); }}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium border border-electric text-electric hover:bg-electric hover:text-background transition-all"
            >
              <LogOut className="w-4 h-4" />
              Keluar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
