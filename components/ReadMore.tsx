'use client';

import { useState } from 'react';

export default function ReadMore({ text, className = '' }: { text: string; className?: string }) {
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  const isLong = text.length > 80;

  if (!isLong) {
    return <p className={className}>{text}</p>;
  }

  return (
    <div className={className}>
      <p>{expanded ? text : text.slice(0, 80) + '...'}</p>
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-electric text-xs font-semibold mt-1 hover:underline"
      >
        {expanded ? 'Tutup' : 'Selengkapnya'}
      </button>
    </div>
  );
}
