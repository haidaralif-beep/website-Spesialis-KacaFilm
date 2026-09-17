import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kirim Testimoni',
  description: 'Bagikan pengalaman Anda menggunakan jasa pemasangan kaca film BandungSpectum. Testimoni Anda membantu kami memberikan layanan terbaik.',
  keywords: 'testimoni kaca film, review kaca film bandung, pengalaman pasang kaca film',
  openGraph: {
    title: 'Kirim Testimoni | BandungSpectum',
    description: 'Bagikan pengalaman Anda menggunakan jasa pemasangan kaca film BandungSpectum.',
  },
};

export default function TestimonialLayout({ children }: { children: React.ReactNode }) {
  return children;
}
