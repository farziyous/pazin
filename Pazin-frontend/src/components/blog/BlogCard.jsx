import { Link } from 'react-router'
import './BlogCard.css'

export const BlogCard = ({ blog }) => {
    return (
        <div className="blog" key={blog.slug}>
            <img src={blog.image_path} alt={blog.title} />
            <h3>{blog.title}</h3>
            <Link to={`/blog?blog=${blog.slug}`}>ادامه</Link>
        </div>
    )
}