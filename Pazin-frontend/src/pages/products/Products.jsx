import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import axios from "axios"
import { Header } from "../../components/header/Header"
import { Footer } from '../../components/footer/Footer'
import { ProductCard } from "../../components/product/ProductCard"
import './Products.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export const Products = ({ categories, loading }) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const activeFilter = searchParams.get('category') || ""
    const search = searchParams.get('search') || ''
    const page = Number(searchParams.get('page')) || 1

    const [products, setProducts] = useState([])
    const [count, setCount] = useState(0)
    const [hasNext, setHasNext] = useState(false)
    const [hasPrevious, setHasPrevious] = useState(false)
    const [productsLoading, setProductsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController()

        const loadProducts = async () => {
            setProductsLoading(true)
            try {
                const params = { page }
                if (activeFilter) params.category = activeFilter
                if (search) params.search = search

                const response = await axios.get(
                    `${API_BASE_URL}/api/products/`,
                    { params, signal: controller.signal }
                )
                setProducts(response.data.results)
                setCount(response.data.count)
                setHasNext(Boolean(response.data.next))
                setHasPrevious(Boolean(response.data.previous))
            } catch (err) {
                if (!axios.isCancel(err)) {
                    setError(err)
                    console.error('Failed to load products:', err)
                }
            } finally {
                setProductsLoading(false)
            }
        }

        loadProducts()
        return () => controller.abort()
    }, [activeFilter, search, page])

    const handleFilterChange = (key) => {
        setSearchParams(key === "" ? {} : { category: key })
    }

    const goToPage = (newPage) => {
        const params = {}
        if (activeFilter) params.category = activeFilter
        if (search) params.search = search
        params.page = newPage
        setSearchParams(params)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const activeCategory = categories.find((category) => category.slug === activeFilter)
    let pageTitle = ''

    if (search) {
        pageTitle = `نتیجه برای ${search}`
    } else {
        pageTitle = activeCategory ? activeCategory.title : "همه محصولات"
    }

    if (loading) {
        return (
            <>
                <Header categories={categories} />
                <div className="loading-products">در حال بارگذاری...</div>
                <Footer />
            </>
        )
    }

    if (error) {
        return (
            <>
                <Header categories={categories} />
                <div className="products-error">مشکلی پیش امده است لطفا بعدا تلاش کنید</div>
                <Footer />
            </>
        )
    }

    const totalPages = Math.ceil(count / 12) || 1

    return (
        <>
            <title>محصولات پازین</title>

            <Header categories={categories} />
            <div className="container">
                <h1 className="product-page-title">{pageTitle}</h1>
                {(search) ? '' :
                    <div className="filters">
                        <button
                            key=''
                            className={`filter-btn ${!activeFilter ? "active" : ""}`}
                            onClick={() => handleFilterChange('')}
                        >
                            همه
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category.slug}
                                className={`filter-btn ${activeFilter === category.slug ? "active" : ""}`}
                                onClick={() => handleFilterChange(category.slug)}
                            >
                                {category.title}
                            </button>
                        ))}
                    </div>
                }
                {productsLoading ? (
                    <p className="empty-message">در حال بارگذاری...</p>
                ) : products.length === 0 ? (
                    <p className="empty-message">محصولی یافت نشد.</p>
                ) : (
                    <>
                        <div className="products">
                            {products.map((product) => (
                                <ProductCard product={product} key={product.slug} />
                            ))}
                        </div>
                        {totalPages > 1 && (
                            <div className="pagination">
                                <button
                                    className="page-btn"
                                    disabled={!hasPrevious}
                                    onClick={() => goToPage(page - 1)}
                                >
                                    قبلی
                                </button>
                                <span className="page-info">
                                    صفحه {page.toLocaleString('fa-IR')} از {totalPages.toLocaleString('fa-IR')}
                                </span>
                                <button
                                    className="page-btn"
                                    disabled={!hasNext}
                                    onClick={() => goToPage(page + 1)}
                                >
                                    بعدی
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
            <Footer />
        </>
    )
}