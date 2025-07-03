import React, { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './ImageSlider.scss';

// Dynamically import every file in /assets/images (Vite feature)
const images = import.meta.glob('/src/assets/images/*.{jpg,jpeg,png,gif,webp}', {
  eager: true,
  import: 'default',
});

const ImageSlider: React.FC = () => {
  // Memoise the list so it’s only built once
  const paths = useMemo(() => Object.values(images) as string[], []);

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      loop
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      className="image-slider"
    >
      {paths.map((src, idx) => (
        <SwiperSlide key={idx}>
          <img src={src} alt={`Slide ${idx + 1}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;