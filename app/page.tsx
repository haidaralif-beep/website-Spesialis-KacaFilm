'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { 
  Building2, 
  Home, 
  Car, 
  Sparkles, 
  Sun, 
  Shield,
  ShieldCheck,
  Thermometer,
  Eye,
  MapPin
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import HomeLayout from '../components/HomeLayout';
import ReadMore from '../components/ReadMore';

interface HasilPemasangan {
  id: number;
  nama_tempat: string;
  deskripsi: string | null;
  foto_url: string;
  created_at: string;
}

interface Material {
  id: number;
  nama_bahan: string;
  deskripsi: string | null;
  spesifikasi: string | null;
}

interface MaterialPhoto {
  id: number;
  material_id: number;
  url: string;
  caption: string | null;
}

interface Testimonial {
  id: number;
  nama: string;
  rating: number;
  testimoni: string;
  lokasi: string | null;
  created_at: string;
}

export default function HomePage() {
  const [hasilPemasangan, setHasilPemasangan] = useState<HasilPemasangan[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [photos, setPhotos] = useState<MaterialPhoto[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch('/api/hasil-pemasangan')
      .then(res => res.json())
      .then(data => setHasilPemasangan(data.items || []))
      .catch(err => console.error(err));

    Promise.all([
      fetch('/api/materials').then(r => r.json()),
      fetch('/api/materials?include=photos').then(r => r.json()),
    ])
      .then(([matData, photoData]) => {
        setMaterials(matData.materials || []);
        setPhotos(photoData.photos || []);
      })
      .catch(err => console.error(err));

    fetch('/api/testimonials?limit=10')
      .then(res => res.json())
      .then(data => setTestimonials(data.testimonials || []))
      .catch(err => console.error(err));
  }, []);

  const getPhotoForMaterial = (materialId: number) => {
    return photos.find(p => p.material_id === materialId);
  };
  const services = [
    { icon: Building2, title: 'Kaca Film Gedung', description: 'Hemat energi dan privasi untuk perkantoran, mall, dan gedung komersial.', features: ['Hemat listrik', 'Reduksi UV 99%'] },
    { icon: Home, title: 'Kaca Film Rumah', description: 'Ciptakan rumah yang nyaman, sejuk, dan terlindungi dari sinar matahari.', features: ['Nyaman sepanjang hari', 'Privasi terjaga', 'Estetika modern'] },
    { icon: Car, title: 'Kaca Film Mobil', description: 'Lindungi interior mobil dan penumpang dari panas dan sinar UV berbahaya.', features: ['Perlindungan UV', 'Kabin lebih sejuk', 'Tampilan elegan'] },
    { icon: Sparkles, title: 'Kaca Film Dekoratif', description: 'Tambahkan sentuhan estetika dengan motif dan warna yang menarik.', features: ['Banyak pilihan motif', 'Privasi', 'Nilai estetika tinggi'] },
    { icon: Shield, title: 'Kaca Film Keamanan', description: 'Perlindungan ekstra dari pecahan kaca dan upaya pembobolan.', features: ['Anti pecah', 'Keamanan ekstra', 'Mencegah pembobolan'] },
    { icon: Sun, title: 'Kaca Film Thermal', description: 'Teknologi canggih untuk menolak panas dan menjaga suhu ruangan.', features: ['Hemat energi', 'Suhu stabil', 'Ramah lingkungan'] },
  ];

  return (
    <HomeLayout>
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div className="container-custom relative z-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-6 flex flex-col justify-center space-y-8">
              <ScrollReveal direction="right">
              <div className="flex flex-col items-start gap-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black tracking-tight text-electric bg-electric/10 border border-electric/30 w-max">
                  <span className="w-2 h-2 rounded-full bg-electric animate-pulse"></span>
                  <span className="whitespace-nowrap">Jasa Pemasangan Kaca Film</span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                <span className="text-white block">Pasang Kaca Film Gedung & Rumah</span>
                <span className="text-electric block">Tolak Panas & Tingkatkan Privasi</span>
              </h1>

              <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-xl">
                Solusi profesional penolakan panas matahari, perlindungan UV hingga 99%, dan privasi maksimal untuk kantor, gedung komersial, ruko, serta hunian residensial Anda. Melayani survei & pasang langsung ke lokasi.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <Link href="https://wa.me/6289637033005?text=Halo%2C%20saya%20tertarik%20dengan%20layanan%20pemasangan%20kaca%20film.%20Saya%20ingin%20mendapatkan%20informasi%20lebih%20lanjut%20mengenai%20pilihan%20kaca%20film%2C%20harga%2C%20dan%20rekomendasi%20yang%20sesuai%20dengan%20kebutuhan%20saya.%20Apakah%20bisa%20melakukan%20konsultasi%20gratis%3F" className="btn-cta-blue inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 text-sm font-bold shadow-[0_0_25px_rgba(25,167,255,0.35)]">
                  <span>Konsultasi Gratis</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </Link>
                <Link href="#portfolio" className="inline-flex items-center px-6 py-3.5 text-sm font-semibold border border-border text-text-secondary hover:text-electric hover:bg-electric/10 transition-all rounded-full">
                  <span>Lihat Project</span>
                </Link>
              </div>

              <div className="mt-10 pt-8 border-t border-border grid grid-cols-3 gap-6 sm:gap-8 max-w-lg">
                <div>
                  <div className="text-3xl sm:text-4xl font-black stat-accent tracking-tight">20+</div>
                  <div className="text-xs sm:text-sm text-text-secondary mt-1 font-medium">Tahun Pengalaman</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-black stat-accent tracking-tight">1000+</div>
                  <div className="text-xs sm:text-sm text-text-secondary mt-1 font-medium">Proyek Selesai</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">100%</div>
                  <div className="text-xs sm:text-sm text-text-secondary mt-1 font-medium">Barang Resmi</div>
                </div>
              </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-6 relative overflow-visible">
              <ScrollReveal direction="left" delay={200}>
              <div className="glass-panel overflow-hidden shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)]">
                <div className="relative aspect-[4/3] group">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105"
                  >
                    <source src="/videos/hero-video.mp4" type="video/mp4" />
                    <img
                      loading="lazy"
                      src="https://lh3.googleusercontent.com/aida/AEtjO1We8AEKMUaPlIwuKvC3OGQgMuqcqBhZ805muZg3bqiIi7pgnGUdSxduHTAD08CZMGYi7VHRY2G-EusNYRh8dlRwEoYdmqDxIJWzcqnFsuqUzLO1uxInt9AQWI5DEktzAC4XsNm0ZkXTYm0lsMkilzScUMu4Km3Ivl6yTqT8ZU1pbu3uQEZ9TFSNTx6cI_PDSctzzAOAVMNID_-3SxUTIJUGCa8t54FzHiXpP2_zsGCrfuyq2MMiMHbFV-Ie"
                      alt="Modern luxury architectural interior and exterior with large tinted glass windows"
                      className="w-full h-full object-cover object-center"
                    />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent"></div>
                </div>
              </div>
              {/* Badge di luar glass-panel */}
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 lg:bottom-6 lg:-right-8 flex flex-col gap-2 sm:gap-3 z-20">
                    <div className="glass-panel px-2.5 py-2 sm:px-3.5 sm:py-3 flex items-center gap-2 sm:gap-3 cursor-default group/badge hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(25,167,255,0.2)] hover:border-electric/40">
                      <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-electric/15 border border-electric/30 flex items-center justify-center shrink-0 group-hover/badge:bg-electric/25 group-hover/badge:border-electric/50 transition-all duration-300">
                        <Thermometer className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-electric" />
                      </div>
                      <div>
                        <div className="text-[10px] sm:text-xs font-bold text-white leading-tight">Tolak Panas Maksimal</div>
                        <div className="text-[8px] sm:text-[10px] text-electric font-medium mt-0.5">Infrared Rejection 98%</div>
                      </div>
                    </div>
                    <div className="glass-panel px-2.5 py-2 sm:px-3.5 sm:py-3 flex items-center gap-2 sm:gap-3 cursor-default group/badge hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(25,167,255,0.2)] hover:border-electric/40">
                      <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-electric/15 border border-electric/30 flex items-center justify-center shrink-0 group-hover/badge:bg-electric/25 group-hover/badge:border-electric/50 transition-all duration-300">
                        <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-electric" />
                      </div>
                      <div>
                        <div className="text-[10px] sm:text-xs font-bold text-white leading-tight">Privasi & Kenyamanan</div>
                        <div className="text-[8px] sm:text-[10px] text-electric font-medium mt-0.5">Pilihan Kegelapan 20% - 80%</div>
                      </div>
                    </div>
                    <div className="glass-panel px-2.5 py-2 sm:px-3.5 sm:py-3 flex items-center gap-2 sm:gap-3 cursor-default group/badge hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(25,167,255,0.2)] hover:border-electric/40">
                      <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-electric/15 border border-electric/30 flex items-center justify-center shrink-0 group-hover/badge:bg-electric/25 group-hover/badge:border-electric/50 transition-all duration-300">
                        <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-electric" />
                      </div>
                      <div>
                        <div className="text-[10px] sm:text-xs font-bold text-white leading-tight">Perlindungan UV 99.9%</div>
                        <div className="text-[8px] sm:text-[10px] text-electric font-medium mt-0.5">Cegah Degradasi Interior</div>
                      </div>
                  </div>
              </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-20 bg-surface-secondary" id="services">
        <div className="container-custom">
          <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-electric text-xs font-bold tracking-widest uppercase mb-3">LAYANAN UTAMA</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-4">Solusi Kaca Film Gedung, Rumah & Komersial</h2>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">Pemasangan kaca film arsitektural berspesifikasi tinggi untuk efisiensi energi, privasi hunian, keamanan kaca, serta instalasi standar kendaraan.</p>
          </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {services.map((service, index) => (
              <ScrollReveal key={index} delay={index * 100}>
              <div className="glass-panel p-6 sm:p-7 shadow-lg hover:border-electric/40 hover:shadow-[0_0_35px_rgba(25,167,255,0.2)] transition-all duration-300 group flex flex-col justify-between h-full">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-electric/10 border border-electric/20 text-electric flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-electric/40 transition-transform">
                    <service.icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-electric transition-colors">{service.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-6">{service.description}</p>
                  <ul className="space-y-2.5 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-text-secondary">
                        <span className="flex-shrink-0 w-4 h-4 rounded-full bg-electric text-background flex items-center justify-center">
                          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href="#konsultasi" className="text-xs font-semibold text-electric inline-flex items-center gap-1 group-hover:gap-2 transition-all pt-3 border-t border-border">
                  <span>Konsultasi Sekarang</span>
                  <span>→</span>
                </Link>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO CAROUSEL */}
      <section className="py-20" id="portfolio" style={{ backgroundColor: '#05070a', backgroundImage: 'linear-gradient(rgba(25, 167, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(25, 167, 255, 0.05) 1px, transparent 1px)', backgroundSize: '64px 64px' }}>
        <div className="container-custom">
          <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-electric text-xs font-bold tracking-widest uppercase mb-3">PROJECT</span>
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-black text-white tracking-tight leading-tight mb-4">Hasil Pemasangan Kaca Film</h2>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">Lihat hasil karya kami dalam berbagai proyek pemasangan kaca film gedung bertingkat, residensial mewah, ruko komersial, dan instalasi standar kendaraan.</p>
          </div>
          </ScrollReveal>

          <div className="relative">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
              nextEl: '.portfolio-next',
              prevEl: '.portfolio-prev'
            }}
            pagination={{ clickable: true, el: '.portfolio-pagination' }}
            spaceBetween={24}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="pb-4"
          >
            {hasilPemasangan.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="rounded-[15px] overflow-hidden bg-surface border-2 border-white/[0.1] hover:border-electric/30 transition-all duration-300 group flex flex-col h-full">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <img 
                      loading="lazy"
                      src={item.foto_url} 
                      alt={item.nama_tempat}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-mono font-semibold text-electric bg-electric/20 backdrop-blur-md border border-electric/30 px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {item.nama_tempat}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col justify-between flex-grow">
                    <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-electric transition-colors">{item.nama_tempat}</h3>
                    {item.deskripsi && (
                      <ReadMore text={item.deskripsi} className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2" />
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <style>{`
            .portfolio-pagination .swiper-pagination-bullet {
              width: 8px;
              height: 8px;
              border-radius: 9999px;
              background: rgba(156,167,181,0.25);
              opacity: 1;
              margin: 0 4px;
            }
            .portfolio-pagination .swiper-pagination-bullet-active {
              background: #19a7ff;
              box-shadow: 0 0 8px #19a7ff;
            }
          `}</style>

          {/* Custom Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8 mb-8">
            <button type="button" className="portfolio-prev w-11 h-11 rounded-xl glass-badge border border-slate-700/80 hover:border-electric flex items-center justify-center text-slate-300 hover:text-white hover:bg-electric/15 transition-all duration-300 active:scale-95 shadow-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M15.75 19.5L8.25 12l7.5-7.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>

            <div className="portfolio-pagination flex items-center justify-center gap-1.5"></div>

            <button type="button" className="portfolio-next w-11 h-11 rounded-xl glass-badge border border-slate-700/80 hover:border-electric flex items-center justify-center text-slate-300 hover:text-white hover:bg-electric/15 transition-all duration-300 active:scale-95 shadow-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M8.25 4.5l7.5 7.5-7.5 7.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
          </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/portfolio" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-electric/40 hover:border-electric text-white font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_15px_rgba(25,167,255,0.3)]">
              <span>Lihat Semua project (500+ project)</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* KATALOG BAHAN FILM */}
      <section className="py-20" id="katalog" style={{ backgroundColor: '#05070a', backgroundImage: 'linear-gradient(rgba(25, 167, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(25, 167, 255, 0.05) 1px, transparent 1px)', backgroundSize: '64px 64px' }}>
        <div className="container-custom">
          <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-electric text-xs font-bold tracking-widest uppercase mb-3">KATALOG BAHAN & STIKER</div>
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-black text-white tracking-tight leading-tight mb-4">Pilihan Bahan Kaca Film Berkualitas Tinggi</h2>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">Kami menyediakan berbagai jenis kaca film & stiker berkualitas tinggi dari merek-merek ternama.</p>
          </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {materials.slice(0, 4).map((item, i) => {
              const photo = getPhotoForMaterial(item.id);
              return (
                <ScrollReveal key={item.id} delay={i * 100}>
                <div className="group rounded-[15px] overflow-hidden bg-surface border-2 border-white/[0.1] hover:border-electric/30 transition-all duration-300 flex flex-col h-full">
                  <div className="h-48 overflow-hidden">
                    {photo ? (
                      <img
                        loading="lazy"
                        src={photo.url}
                        alt={item.nama_bahan}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-surface-secondary flex items-center justify-center">
                        <span className="text-text-secondary text-xs">Belum ada foto</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-white font-bold text-base mb-2 group-hover:text-electric transition-colors">{item.nama_bahan}</h3>
                    {item.spesifikasi && (
                      <ReadMore text={item.spesifikasi} className="text-text-secondary text-sm leading-relaxed flex-1 line-clamp-2" />
                    )}
                    <Link href="https://wa.me/6289637033005?text=Halo%2C%20saya%20tertarik%20dengan%20layanan%20pemasangan%20kaca%20film.%20Saya%20ingin%20mendapatkan%20informasi%20lebih%20lanjut%20mengenai%20pilihan%20kaca%20film%2C%20harga%2C%20dan%20rekomendasi%20yang%20sesuai%20dengan%20kebutuhan%20saya.%20Apakah%20bisa%20melakukan%20konsultasi%20gratis%3F" className="text-xs font-semibold text-electric inline-flex items-center gap-1 group-hover:gap-2 transition-all mt-4">
                      <span>Konsultasi Sekarang</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
                </ScrollReveal>
              );
            })}
            {materials.length === 0 && (
              <p className="col-span-full text-center text-text-secondary text-sm py-10">Belum ada bahan kaca film.</p>
            )}
          </div>

          <div className="mt-12 text-center">
            <Link href="/materials" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-electric/40 hover:border-electric text-white font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_15px_rgba(25,167,255,0.3)]">
              <span>Lihat Semua Bahan (500+ Bahan)</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-surface-secondary" id="testimoni">
        <div className="container-custom">
          <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-electric text-xs font-bold tracking-widest uppercase mb-3">TESTIMONI</div>
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-black text-white tracking-tight leading-tight mb-4">Apa Kata Pelanggan Kami?</h2>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">Kepuasan pelanggan adalah prioritas utama kami.</p>
          </div>
          </ScrollReveal>

          <style>{`
            @keyframes scroll-left {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .testimonial-track {
              display: flex;
              gap: 1.5rem;
              animation: scroll-left 18s linear infinite;
              width: max-content;
            }
            .testimonial-track:hover {
              animation-play-state: paused;
            }
          `}</style>

          <div className="relative w-full overflow-hidden -mx-4">
            <div className="testimonial-track">
              {testimonials.length > 0 ? testimonials.map((item) => (
                <div key={item.id} className="w-[320px] sm:w-[380px] flex-shrink-0 glass-panel p-7 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-0.5 text-electric text-base mb-5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className={star <= item.rating ? '' : 'opacity-20'}>★</span>
                      ))}
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed mb-5">&quot;{item.testimoni}&quot;</p>
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{item.nama}</div>
                    {item.lokasi && <div className="text-xs text-text-secondary mt-0.5">{item.lokasi}</div>}
                  </div>
              </div>
              )) : (
                <>
                  {[
                    { name: 'Budi Santoso', location: 'Jakarta Selatan', text: 'Hasil pemasangan sangat rapi dan profesional. Rumah jadi lebih sejuk tanpa perlu AC terus-menerus.' },
                    { name: 'Siti Rahayu', location: 'Tangerang', text: 'Pelayanan cepat dan ramah. Tim datang tepat waktu dan bekerja dengan sangat bersih. Sangat direkomendasikan!' },
                    { name: 'Agus Wijaya', location: 'Bekasi', text: 'Sudah pakai jasa ini untuk 3 proyek. Kualitas kaca film bagus dan tahan lama. Harga juga kompetitif.' },
                  ].map((testimonial, index) => (
                    <div key={index} className="w-[320px] sm:w-[380px] flex-shrink-0 glass-panel p-7 h-full flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1 text-electric text-base mb-5 tracking-widest">
                          {'★'.repeat(5)}
                        </div>
                        <p className="text-text-secondary text-sm leading-relaxed mb-5">&quot;{testimonial.text}&quot;</p>
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">{testimonial.name}</div>
                        <div className="text-xs text-text-secondary mt-0.5">{testimonial.location}</div>
                      </div>
                  </div>
                  ))}
                </>
              )}
          </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/testimonial/submit" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-electric/40 hover:border-electric text-white font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_15px_rgba(25,167,255,0.3)]">
              <span>Kirim Testimoni Anda</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="py-20 bg-surface-secondary" id="konsultasi">
        <div className="container-custom text-center">
          <ScrollReveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">Siap Membuat Ruangan Lebih Nyaman?</h2>
          <p className="text-text-secondary text-sm sm:text-base max-w-2xl mx-auto mb-8">Konsultasikan kebutuhan Anda secara gratis. Tim profesional kami siap membantu 24/7.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="https://wa.me/6289637033005?text=Halo%2C%20saya%20tertarik%20dengan%20layanan%20pemasangan%20kaca%20film.%20Saya%20ingin%20mendapatkan%20informasi%20lebih%20lanjut%20mengenai%20pilihan%20kaca%20film%2C%20harga%2C%20dan%20rekomendasi%20yang%20sesuai%20dengan%20kebutuhan%20saya.%20Apakah%20bisa%20melakukan%20konsultasi%20gratis%3F" className="btn-cta-blue inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 text-sm font-bold shadow-[0_0_25px_rgba(25,167,255,0.4)]">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.69.248-1.29.173-1.414z"></path>
              </svg>
              <span>Chat WhatsApp</span>
            </Link>
            <Link href="tel:+6289637033005" className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full border border-electric text-electric hover:bg-electric/10 text-sm font-bold transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Telepon Sekarang</span>
            </Link>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-surface py-12">
        <div className="container-custom py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
            <ScrollReveal delay={0}>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-electric shadow-[0_0_8px_#19A7FF] inline-block"></span>
                <span className="font-bold text-xl text-white tracking-tight">BandungSpectum </span>
              </div>
              <p className="text-sm text-text-secondary">Solusi pemasangan kaca film profesional untuk rumah, gedung, dan mobil.</p>
            </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
            <div>
              <h4 className="font-bold text-base text-white mb-4 tracking-wide">Layanan</h4>
              <ul className="space-y-2.5 text-sm text-text-secondary">
                <li><Link href="#services" className="hover:text-white transition-colors">Kaca Film Gedung</Link></li>
                <li><Link href="#services" className="hover:text-white transition-colors">Kaca Film Rumah</Link></li>
                <li><Link href="#services" className="hover:text-white transition-colors">Kaca Film Mobil</Link></li>
                <li><Link href="#services" className="hover:text-white transition-colors">Kaca Film Dekoratif</Link></li>
              </ul>
            </div>
            </ScrollReveal>
            <div>
              <h4 className="font-bold text-base text-white mb-4 tracking-wide">Kontak</h4>
              <ul className="space-y-3 text-sm text-text-secondary">
                <li className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-electric flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  <span>0896-3703-3005</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-electric flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  <span>Bandung, Jl.Sangkuriang Barat 3, Puri Cipageran Indah 1 Blok F gg Madrasah 1 Indonesia</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-electric flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round"></circle>
                    <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  <span>Buka 24/7</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-base text-white mb-4 tracking-wide">Jam Operasional</h4>
              <div className="space-y-2 text-sm">
                <div className="text-text-secondary">Senin - Minggu</div>
                <div className="text-electric font-bold text-sm tracking-wide">24 Jam Nonstop</div>
                <div className="text-electric text-sm">
                    <span>Konsultasi Gratis</span>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center">
            <p className="text-xs text-text-secondary font-normal">© 2024 KacaFilm Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </HomeLayout>
  );
}
