import React, { useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Zoom } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/zoom';
import './SectionedGallery.scss';

// 1️⃣ Glob import every image in ALL sub‑folders
const files = import.meta.glob('/src/assets/images/**/*.{jpg,jpeg,png,gif,webp}', {
  eager: true,
  import: 'default',
});

type Sections = Record<string, string[]>; // { landscapes: [url, …], portraits: [url, …] }

/** A mini component for one folder’s carousel */
const SectionCarousel: React.FC<{ folder: string; imgs: string[]; autoPlay: boolean }> = ({
  folder,
  imgs,
  autoPlay,
}) => {
  const [current, setCurrent] = useState(1);

  const total = imgs.length;
  const currentName = imgs[current - 1]?.split('/').pop();

  return (
    <section className="gallery-section">
      <h2 className="section-title">
        {folder}
        <span className="counter">
          {current}/{total}
        </span>
      </h2>
      {currentName && <p className="image-name">{currentName}</p>}

      <Swiper
        modules={[Navigation, Pagination, Zoom, Autoplay]}
        spaceBetween={16}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop
        zoom
        autoHeight
        autoplay={autoPlay ? { delay: 3500, disableOnInteraction: false } : false}
        onSlideChange={(sw) => setCurrent(sw.realIndex + 1)}
        className="section-swiper"
      >
        {imgs.map((src, idx) => (
          <SwiperSlide key={idx}>
            <div className="swiper-zoom-container">
              <img src={src} alt={`${folder} ${idx + 1}`} loading="lazy" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

const SectionedGallery: React.FC = () => {
  const [autoPlay, setAutoPlay] = useState(false); // ▶️ autoplay OFF by default

  // 2️⃣ Group by top‑level folder name after /images/
  const sections = useMemo<Sections>(() => {
    const map: Sections = {};
    for (const [path, url] of Object.entries(files)) {
      const match = path.match(/\/images\/(.*?)\//);
      if (!match) continue;
      const folder = match[1];
      (map[folder] ||= []).push(url as string);
    }
    return Object.fromEntries(
      Object.entries(map)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, arr]) => [k, [...arr].sort()])
    );
  }, []);

  return (
    <div className="sectioned-gallery">
      {/* 🔘 Toggle autoplay */}
      <div className="slider-toggle">
        <label className="switch">
          <input
            type="checkbox"
            checked={autoPlay}
            onChange={(e) => setAutoPlay(e.target.checked)}
          />
          <span className="slider round"></span>
        </label>
        <span className="toggle-label">Auto‑slide</span>
      </div>

      {Object.entries(sections).map(([folder, imgs]) => (
        <SectionCarousel key={folder} folder={folder} imgs={imgs} autoPlay={autoPlay} />
      ))}
    </div>
  );
};

export default SectionedGallery;