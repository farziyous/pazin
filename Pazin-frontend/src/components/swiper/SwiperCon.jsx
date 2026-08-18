import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './SwiperCon.css';
import { Autoplay } from 'swiper/modules';

export function SwiperCon({ breakpoints, space, images, isBanner }) {
  return (
    <div className="swiper-div">
      <Swiper
        slidesPerView={1}
        spaceBetween={space}
        breakpoints={breakpoints}
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: isBanner ? 2200 : 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {isBanner
          ? images.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} alt='جشنواره های پازین' className='swiper-banner' />
              </SwiperSlide>
            ))
          : images.map((image) => (
              <SwiperSlide key={image.id}>
                <div className="card">
                  <Link href="#" className="card-img-link">
                    <img src={image.default_image.path} alt={image.title} className='swiper-img' />
                  </Link>
                  <p className='name'>{image.title}</p>
                  <Link to={`/product?product=${image.slug}`} className='follow-link'>نمایش</Link>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
}