'use client';

import { useState } from 'react';

interface ReadMoreProps {
  text: string;
  className?: string;
  maxLength?: number;
}

export default function ReadMore({ text, className = '', maxLength = 120 }: ReadMoreProps) {
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  const isLong = text.length > maxLength;

  if (!isLong) {
    return <p className={className}>{text}</p>;
  }

  return (
    <div className={className}>
      <p className={expanded ? '' : 'line-clamp-3'}>{expanded ? text : text.slice(0, maxLength) + '...'}</p>
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-electric text-xs font-semibold mt-2 inline-flex items-center gap-1 hover:gap-2 transition-all"
      >
        <span>{expanded ? 'Tutup' : 'Lihat Semua Penjelasan'}</span>
        <span>→</span>
      </button>
    </div>
  );
}
