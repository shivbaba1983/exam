import React, { useMemo, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Zoom, Autoplay, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/zoom';
import './SectionedGallery.scss';

const files = import.meta.glob('/src/assets/images/**/*.{jpg,jpeg,png,gif,webp}', {
  eager: true,
  import: 'default',
});

type Sections = Record<string, string[]>;

type SectionCarouselProps = {
  folder: string;
  imgs: string[];
  autoPlay: boolean;
  expanded: boolean;
  onToggle: () => void;
};

const SectionCarousel: React.FC<SectionCarouselProps> = ({
  folder,
  imgs,
  autoPlay,
  expanded,
  onToggle,
}) => {
  const [current, setCurrent] = useState(1);
  const total = imgs.length;
  const currentName = imgs[current - 1]?.split('/').pop();

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <section className="gallery-section">
      <div className="section-header" onClick={onToggle}>
        <h2 className="section-title">
          {folder}
          <span className="counter">{current}/{total}</span>
        </h2>
        <button className="expand-btn" aria-label="Toggle section">
          {expanded ? '−' : '+'}
        </button>
      </div>

      {expanded && (
        <>
          {currentName && <p className="image-name">{currentName}</p>}

          <button ref={prevRef} className="nav-btn prev" aria-label="Previous slide">
            <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button ref={nextRef} className="nav-btn next" aria-label="Next slide">
            <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <Swiper
            className="section-swiper"
            modules={[Navigation, Pagination, Zoom, Autoplay, Keyboard]}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            onBeforeInit={(sw) => {
              sw.params.navigation.prevEl = prevRef.current;
              sw.params.navigation.nextEl = nextRef.current;
            }}
            pagination={{ clickable: true }}
            keyboard={{ enabled: true, onlyInViewport: true }}
            spaceBetween={16}
            slidesPerView={1}
            loop={imgs.length > 1}
            zoom
            autoHeight
            autoplay={
              autoPlay
                ? { delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }
                : undefined
            }
            onSlideChange={(sw) => setCurrent(sw.realIndex + 1)}
          >
            {imgs.map((src, i) => (
              <SwiperSlide key={i}>
                <div className="swiper-zoom-container">
                  <img src={src} alt={`${folder} ${i + 1}`} loading="lazy" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </section>
  );
};

const SectionedGallery: React.FC = () => {
  const [autoPlay, setAutoPlay] = useState(false);
  const [expandedFolder, setExpandedFolder] = useState<string | null>(null);

  const sections = useMemo<Sections>(() => {
    const grouped: Sections = {};
    for (const [path, url] of Object.entries(files)) {
      const match = path.match(/\/images\/(.*?)\//);
      if (!match) continue;
      const folder = match[1];
      (grouped[folder] ||= []).push(url as string);
    }
    return Object.fromEntries(
      Object.entries(grouped)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, arr]) => [k, arr.sort()])
    );
  }, []);

  const toggleSection = (folder: string) => {
    setExpandedFolder((prev) => (prev === folder ? null : folder));
  };

  return (
    <div className="sectioned-gallery">
      <div className="slider-toggle">
        <label className="switch">
          <input
            type="checkbox"
            checked={autoPlay}
            onChange={(e) => setAutoPlay(e.target.checked)}
          />
          <span className="slider round" />
        </label>
        <span className="toggle-label">Auto‑slide</span>
      </div>

      {Object.entries(sections).map(([folder, imgs]) => (
        <SectionCarousel
          key={folder}
          folder={folder}
          imgs={imgs}
          autoPlay={autoPlay}
          expanded={expandedFolder === folder}
          onToggle={() => toggleSection(folder)}
        />
      ))}
    </div>
  );
};

export default SectionedGallery;
