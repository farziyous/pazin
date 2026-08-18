import { Link } from 'react-router'
import './ProductCard.css'

export const ProductCard = ({ product }) => {
    return (
        <div className="product">
            <Link to={`/product?product=${product.slug}`}>
                <img
                    src={product.default_image.path}
                    alt={product.title}
                />
            </Link>
            <div className="info">
                <p className="name">{product.title}</p>
                <p className="des">{product.description}</p>
                <div>
                    <Link to={`/product?product=${product.slug}`} className="follow-link">
                        نمایش
                    </Link>
                </div>
            </div>
        </div>
    )
}
