'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const buttonClasses = `fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-electric text-background flex items-center justify-center transition-all duration-300`;
  const visibleClasses = 'opacity-100 translate-y-0 pointer-events-auto shadow-[0_0_30px_rgba(25,167,255,0.5)]';
  const hiddenClasses = 'opacity-0 translate-y-4 pointer-events-none shadow-none';

  return (
    <button
      onClick={scrollToTop}
      className={`${buttonClasses} ${visible ? visibleClasses : hiddenClasses}`}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
