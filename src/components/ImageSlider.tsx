// import React, { useMemo, useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay, Zoom } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/zoom';
// import './ImageSlider.scss';

// // Dynamically import every image in /assets/images
// const images = import.meta.glob('/src/assets/images/*.{jpg,jpeg,png,gif,webp}', {
//   eager: true,
//   import: 'default',
// });

// const ImageSlider: React.FC = () => {
//   const paths = useMemo(() => Object.values(images) as string[], []);
//   const [autoPlay, setAutoPlay] = useState(false); // autoplay OFF by default
//   const [current, setCurrent] = useState(1);

//   const total = paths.length;
//   const currentName = paths[current - 1]?.split('/').pop();

//   return (
//     <div className="basic-slider">
//       {/* 🔘 autoplay switch */}
//       <div className="slider-toggle">
//         <label className="switch">
//           <input
//             type="checkbox"
//             checked={autoPlay}
//             onChange={(e) => setAutoPlay(e.target.checked)}
//           />
//           <span className="slider round" />
//         </label>
//         <span className="toggle-label">Auto‑slide</span>
//       </div>

//       {/* 🛈 counter + filename */}
//       <div className="slider-header">
//         <h2 className="counter">
//           {current}/{total}
//         </h2>
//         {currentName && <p className="image-name">{currentName}</p>}
//       </div>

//       <Swiper
//         modules={[Navigation, Pagination, Zoom, Autoplay]}
//         spaceBetween={20}
//         slidesPerView={1}
//         loop
//         navigation
//         pagination={{ clickable: true }}
//         zoom
//         autoHeight        // <-- Added here
//         autoplay={autoPlay ? { delay: 3000, disableOnInteraction: false } : false}
//         onSlideChange={(sw) => setCurrent(sw.realIndex + 1)}
//         className="image-slider"
//       >
//         {paths.map((src, idx) => (
//           <SwiperSlide key={idx}>
//             <div className="swiper-zoom-container">
//               <img src={src} alt={`Slide ${idx + 1}`} loading="lazy" />
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//     </div>
//   );
// };

// export default ImageSlider;