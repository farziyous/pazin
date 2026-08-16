import { Link } from 'react-router'
import { SwiperCon } from '../../components/swiper/SwiperCon'
import './ProductRow.css'
import chevronDown from '../../assets/chevron-down.svg'

const defaultBreakpoints = {
  0: { slidesPerView: 1 },
  650: { slidesPerView: 2 },
  900: { slidesPerView: 3 },
  1200: { slidesPerView: 4 },
}

export const ProductRow = ({ title, products, breakpoints = defaultBreakpoints, space = 30, slug }) => {
  const displayedProducts = products.slice(0, 8)

  return (
    <div className='swiper-container'>
      <h1>{title}</h1>
      <SwiperCon breakpoints={breakpoints} space={space} images={displayedProducts} isBanner={false} />
      <Link to={`/products?category=${slug}`} className='more-link'>
        <p>نمایش بیشتر</p>
        <img src={chevronDown} />
      </Link>
    </div>
  )
}