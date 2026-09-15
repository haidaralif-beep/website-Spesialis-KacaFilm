'use client';

import { useEffect } from 'react';

export default function SmoothScroll() {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const targetEl = document.querySelector(href);
      if (!targetEl) return;

      e.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
