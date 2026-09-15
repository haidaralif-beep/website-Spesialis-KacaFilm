'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="backdrop-blur-md bg-surface/20 border border-border rounded-b-xl fixed top-0 left-0 right-0 z-50 shadow-lg shadow-black/40">
      <div className="container-custom">
        <div className="flex justify-between items-center h-12 md:h-16">
          <Link href="/" className="flex items-center gap-2 text-lg md:text-xl font-bold text-white">
            <span className="text-electric text-sm md:text-xl">●</span>
            BandungSpectum
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-text-secondary hover:text-white transition-colors duration-200 py-2">Beranda</Link>
            <Link href="/#services" className="text-text-secondary hover:text-white transition-colors duration-200 py-2">Layanan</Link>
            <Link href="/#portfolio" className="text-text-secondary hover:text-white transition-colors duration-200 py-2">Project</Link>
            <Link href="/#katalog" className="text-text-secondary hover:text-white transition-colors duration-200 py-2">Katalog</Link>
            <a href="https://wa.me/6289637033005?text=Halo%2C%20saya%20ingin%20konsultasi%20mengenai%20kaca%20film." target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-5 py-2 text-sm font-medium border border-electric text-electric hover:bg-electric hover:text-background transition-all rounded-full">Hubungi Kami</a>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden text-electric p-1.5">
            <span className="text-lg">{open ? '✕' : '☰'}</span>
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-3 space-y-1 border-t border-border mt-1 pt-3 px-1">
            <Link href="/" className="block py-2 px-3 text-sm text-text-secondary hover:text-white rounded-lg hover:bg-white/5 transition-all">Beranda</Link>
            <Link href="/#services" className="block py-2 px-3 text-sm text-text-secondary hover:text-white rounded-lg hover:bg-white/5 transition-all">Layanan</Link>
            <Link href="/#portfolio" className="block py-2 px-3 text-sm text-text-secondary hover:text-white rounded-lg hover:bg-white/5 transition-all">Project</Link>
            <Link href="/#katalog" className="block py-2 px-3 text-sm text-text-secondary hover:text-white rounded-lg hover:bg-white/5 transition-all">Katalog</Link>
            <a href="https://wa.me/6289637033005?text=Halo%2C%20saya%20ingin%20konsultasi%20mengenai%20kaca%20film." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-4 py-2 mt-2 text-xs font-medium border border-electric text-electric hover:bg-electric hover:text-background transition-all rounded-full w-full">Hubungi Kami</a>
          </div>
        )}
      </div>
    </nav>
  );
}