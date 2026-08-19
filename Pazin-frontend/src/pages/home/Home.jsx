import { Link } from 'react-router'
import { Header } from '../../components/header/Header'
import { SwiperCon } from '../../components/swiper/SwiperCon'
import { ProductRow } from './ProductRow'
import { Footer } from '../../components/footer/Footer'
import { ProductCard } from '../../components/product/ProductCard'
import { BlogCard } from '../../components/blog/BlogCard'
import './Home.css'
import mainBanner from '../../assets/banners/main-banner.webp'
import mobileMainBanner from '../../assets/banners/mobile-main-banner.webp'
import sandalBanner from '../../assets/banners/sandal-banner.webp'
import sandalBannerMobile from '../../assets/banners/sandal-banner-mobile.webp'
import kidsBanner from '../../assets/banners/kids-banner.webp'
import kidsBannerMobile from '../../assets/banners/kids-banner-mobile.webp'
import sneakersBanner from '../../assets/banners/sneaker-banner.webp'
import sneakersBannerMobile from '../../assets/banners/sneaker-banner-mobile.webp'
import womensBanner from '../../assets/banners/womens-banner.webp'
import womensBannerMobile from '../../assets/banners/womens-banner-mobile.webp'
import plasticBanner from '../../assets/banners/plastic-banner.webp'
import plasticBannerMobile from '../../assets/banners/plastic-banner-mobile.webp'
import collectionImg1 from '../../assets/collection-images/collection-img1.webp'
import collectionImg2 from '../../assets/collection-images/collection-img2.webp'
import collectionImg3 from '../../assets/collection-images/collection-img3.webp'
import collectionImg4 from '../../assets/collection-images/collection-img4.webp'
import collectionImg5 from '../../assets/collection-images/collection-img5.webp'
import collectionImg6 from '../../assets/collection-images/collection-img6.webp'

const bannerBreakpoints = {
    0: { slidesPerView: 1 },
}

const collections = [
    { img: collectionImg1, alt: 'راحتی با پازین', label: 'راحتی' },
    { img: collectionImg2, alt: 'استایل با پازین', label: 'استایل' },
    { img: collectionImg3, alt: 'کیفیت با پازین', label: 'کیفیت' },
    { img: collectionImg4, alt: 'ایمنی با پازین', label: 'ایمنی' },
    { img: collectionImg5, alt: 'روزمره با پازین', label: 'روزمره' },
    { img: collectionImg6, alt: 'شیک بودن با پازین', label: 'کلاسیک' },
]

export const Home = ({ categories, blogs, loading }) => {

    const displayedBlogs = blogs.slice(0, 3)

    const featuredCategories = categories.filter((category) => category.featured_product)

    if (loading) {
        return (
            <>
                <Header categories={categories} />
                <div className='container'>
                    <p className="loading-message">در حال بارگذاری...</p>
                </div>
                <Footer />
            </>
        )
    }

    return (
        <>
            <Header categories={categories} />
            <div className='container'>
                <div className="main-banner">
                    <img src={mainBanner} alt="پازین بنر اصلی" className='main-banner-img' />
                    <img src={mobileMainBanner} alt="پازین بنر اصلی" className='mobile-main-banner-img' />
                    <img src='/shoe-img.png' alt="کفش الفا کرم" className='shoe-img' />
                </div>

                <div className='banners'>
                    <SwiperCon
                        breakpoints={bannerBreakpoints}
                        space={0}
                        images={[sandalBanner, kidsBanner, sneakersBanner, womensBanner, plasticBanner]}
                        isBanner={true}
                    />
                </div>

                <div className="banners-mobile">
                    <SwiperCon
                        breakpoints={bannerBreakpoints}
                        space={0}
                        images={[sandalBannerMobile, kidsBannerMobile, sneakersBannerMobile, womensBannerMobile, plasticBannerMobile]}
                        isBanner={true}
                    />
                </div>

                {categories
                    .filter((category) => (category.products?.length || 0) >= 8)
                    .map((category) => (
                        <ProductRow key={category.id} title={category.title} products={category.products} slug={category.slug} />
                    ))}

                <div className="collections">
                    {collections.map((collection) => (
                        <Link to="/products" key={collection.label}>
                            <div className="collection">
                                <img src={collection.img} alt={collection.alt} />
                                <p>{collection.label}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className='chosen-product-container'>
                    <h1 className='product-page-title'>منتخب ها</h1>
                    <div className="chosen-products">
                        {featuredCategories.map((category) => {
                            const product = category.featured_product
                            return (
                                <ProductCard product={product}  key={product.slug} />
                            )
                        })}
                    </div>
                </div>
                <div className="blogs-container">
                    <h1>مقالات کاربردی</h1>
                    <div className='blogs'>
                        {displayedBlogs.map((blog) => (
                            <BlogCard blog={blog} key={blog.slug} />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}