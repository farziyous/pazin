import { Link } from "react-router"
import { Header } from "../../components/header/Header"
import { Footer } from "../../components/footer/Footer"
import { BlogCard } from "../../components/blog/BlogCard"
import './Blogs.css'

export const Blogs = ({ categories, blogs, loading }) => {

    if (loading) {
        return (
            <>
                <Header categories={categories} />
                <div className="loading-blogs">در حال بارگذاری...</div>
                <Footer />
            </>
        )
    }

    return (
        <>
            <Header categories={categories} />
            <div className="container-blogs-page">
                <h1 className='blogs-title'>وبلاگ و مقاله ها</h1>
                {blogs.length === 0 ? (
                    <p className="empty-message">مقاله‌ای یافت نشد.</p>
                ) : (
                    <div className="blogs">
                        {blogs.map((blog) => (
                            <BlogCard blog={blog} />
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    )
}