import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import './NotFound.css'

export const NotFound = ({ categories }) => {
    return (
        <>
            <title>صفحه مورد نظر یافت نشد</title>

            <Header categories={categories} />
            <div className="container-not-found-page">
                <p className="not-found-title">صفحه مورد نظر یافت نشد</p>
            </div>
            <Footer />
        </>
    )
}