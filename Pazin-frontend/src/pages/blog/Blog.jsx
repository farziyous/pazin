import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router"
import axios from "axios"
import ReactMarkdown from "react-markdown"
import { Header } from '../../components/header/Header'
import { Footer } from '../../components/footer/Footer'
import './Blog.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export const Blog = ({ categories, loading }) => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const blogSlug = searchParams.get('blog') || ''

    const [blog, setBlog] = useState(null)
    const [blogLoading, setBlogLoading] = useState(true)

    useEffect(() => {
        if (!blogSlug) {
            navigate('/not-found', { replace: true })
            return
        }

        const controller = new AbortController()

        const loadBlog = async () => {
            setBlogLoading(true)
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/api/blogs/${blogSlug}`,
                    { signal: controller.signal }
                )
                const data = response.data

                if (!data || typeof data !== 'object') {
                    navigate('/not-found', { replace: true })
                    return
                }

                setBlog(data)
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error('Failed to load blog:', error)
                    navigate('/not-found', { replace: true })
                }
            } finally {
                setBlogLoading(false)
            }
        }

        loadBlog()
        return () => controller.abort()
    }, [blogSlug, navigate])

    const handleBack = () => navigate(-1)

    if (loading) {
        return (
            <>
                <Header categories={categories} />
                <div className="loading-blog">در حال بارگذاری...</div>
                <Footer />
            </>
        )
    }

    if (!blogSlug || blogLoading || !blog) return null

    return (
        <>
            <title>{blog.title}</title>

            <Header categories={categories} />
            <div className="container-blog-page">
                <button type="button" className="back-button" onClick={handleBack}>
                    بازگشت
                </button>
                <h1 className="blog-title">{blog.title}</h1>
                <div className="blog-text">
                    <img src={blog.image_path} alt={blog.title} className="blog-img" />
                    <ReactMarkdown>{blog.content}</ReactMarkdown>
                </div>
            </div>
            <Footer />
        </>
    )
}