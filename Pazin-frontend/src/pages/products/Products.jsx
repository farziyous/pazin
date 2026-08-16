import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import axios from "axios"
import { Header } from "../../components/header/Header"
import { Footer } from '../../components/footer/Footer'
import { ProductCard } from "../../components/product/ProductCard"
import './Products.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export const Products = ({ categories, loading }) => {

    const [products, setProducts] = useState([])
    const [productsLoading, setProductsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController()

        const loadProducts = async () => {
            setProductsLoading(true)
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/api/products/`,
                    { signal: controller.signal }
                )
                setProducts(response.data)
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
    }, [])

    const [searchParams, setSearchParams] = useSearchParams()
    const activeFilter = searchParams.get('category') || ""
    const search = searchParams.get('search') || ''

    const handleFilterChange = (key) => {
        setSearchParams(key === "" ? {} : { category: key })
    }

    const activeCategory = categories.find((category) => category.slug === activeFilter)
    let pageTitle = ''

    if (search) {
        pageTitle = `نتیجه برای ${search}`
    }
    else {
        pageTitle = activeCategory ? activeCategory.title : "همه محصولات"
    }

    if (loading || productsLoading) {
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

    let filteredProducts = []

    if (search) {
        const normalizedSearch = search.trim().toLowerCase()
        filteredProducts = products.filter(
            (product) => product.title.toLowerCase().includes(normalizedSearch)
        )
    }
    else {
        filteredProducts = products.filter(
            (product) => !activeFilter || product.category.slug === activeFilter
        )
    }
    return (
        <>
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
                {filteredProducts.length === 0 ? (
                    <p className="empty-message">محصولی یافت نشد.</p>
                ) : (
                    <div className="products">
                        {filteredProducts.map((product) => (
                            <ProductCard product={product} key={product.slug} />
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    )
}