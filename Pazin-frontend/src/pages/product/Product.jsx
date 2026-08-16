import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import { Header } from '../../components/header/Header'
import { Footer } from '../../components/footer/Footer'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import './Product.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export const Product = ({ categories, loading }) => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const productSlug = searchParams.get('product') || ''

    const [product, setProduct] = useState(null)
    const [productLoading, setProductLoading] = useState(true)

    useEffect(() => {
        if (!productSlug) {
            navigate('/not-found', { replace: true })
            return
        }

        const controller = new AbortController()

        const loadProduct = async () => {
            setProductLoading(true)
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/api/products/${productSlug}`,
                    { signal: controller.signal }
                )
                const data = response.data

                if (!data || typeof data !== 'object') {
                    navigate('/not-found', { replace: true })
                    return
                }

                setProduct(data)
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error('Failed to load product:', error)
                    navigate('/not-found', { replace: true })
                }
            } finally {
                setProductLoading(false)
            }
        }

        loadProduct()
        return () => controller.abort()
    }, [productSlug, navigate])

    const handleBack = () => navigate(-1)

    const isLoading = loading || productLoading

    if (!productSlug || isLoading) {
        return (
            <>
                <Header categories={categories} />
                <div className="container-product-page">
                    <p className="loading-message">در حال بارگذاری...</p>
                </div>
                <Footer />
            </>
        )
    }

    if (!product) return null

    const images = product.images || []
    const hasMultipleImages = images.length > 1

    return (
        <>
            <Header categories={categories} />
            <div className="container-product-page">
                <button type="button" className="back-button" onClick={handleBack}>
                    بازگشت
                </button>
                <div className="right">
                    <h1 className='product-title'>{product.title}</h1>
                    <p className='product-des'>{product.description}</p>
                    <div className="product-price-row">
                        <span className="product-price">
                            {Number(product.price).toLocaleString('fa-IR')}
                        </span>
                        <span className="product-price-unit">تومان</span>
                    </div>
                    <Link
                        to={`/contact-us?about=${encodeURIComponent(product.title)}`}
                        className='contact-us-link'
                    >
                        تماس با ما درباره با این محصول
                    </Link>
                </div>
                <div className="left">
                    <div className="product-image-wrap">
                        <Swiper
                            modules={[Pagination, Navigation, Autoplay]}
                            pagination={hasMultipleImages ? { clickable: true } : false}
                            navigation={hasMultipleImages}
                            loop={hasMultipleImages}
                            autoplay={hasMultipleImages ? { delay: 3000, disableOnInteraction: false } : false}
                            observer={true}
                            observeParents={true}
                            className="product-swiper"
                        >
                            {images.map((image, index) => (
                                <SwiperSlide key={image.id || index}>
                                    <img
                                        src={image.path}
                                        alt={`${product.title} ${index + 1}`}
                                        className='product-img'
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}