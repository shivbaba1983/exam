import React, { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './SectionedGallery.scss';

// 1️⃣ Glob import every image in ALL sub‑folders
const files = import.meta.glob('/src/assets/images/**/*.{jpg,jpeg,png,gif,webp}', {
  eager: true,
  import: 'default',
});

type Sections = Record<string, string[]>; // { landscapes: [url, …], portraits: [url, …] }

const SectionedGallery: React.FC = () => {
  // 2️⃣ Group by top‑level folder name after /images/
  const sections = useMemo<Sections>(() => {
    const map: Sections = {};
    for (const [path, url] of Object.entries(files)) {
      // e.g. path = "/src/assets/images/portraits/alice.webp"
      const match = path.match(/\/images\/(.*?)\//);
      if (!match) continue;
      const folder = match[1];
      (map[folder] ||= []).push(url as string);
    }
    // Optional: sort sections alphabetically & images naturally
    return Object.fromEntries(
      Object.entries(map)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, arr]) => [k, [...arr].sort()])
    );
  }, []);

  return (
    <div className="sectioned-gallery">
      {Object.entries(sections).map(([folder, imgs]) => (
        <section key={folder} className="gallery-section">
          <h2 className="section-title">{folder}</h2>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            loop
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            className="section-swiper"
          >
            {imgs.map((src, idx) => (
              <SwiperSlide key={idx}>
                <img src={src} alt={`${folder} ${idx + 1}`} loading="lazy" />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      ))}
    </div>
  );
};

export default SectionedGallery;