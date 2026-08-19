import { useState } from 'react'
import { useSearchParams } from 'react-router'
import axios from 'axios'
import { Header } from '../../components/header/Header'
import './Contact.css'
import contactBanner from '../../assets/banners/contact-banner.webp'
import instaLogo from '../../assets/logos/instagram-logo.jpg'
import teleLogo from '../../assets/logos/telegram-logo.png'
import rubikaLogo from '../../assets/logos/rubika-logo.png'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export const Contact = ({ categories, loading }) => {
    const [searchParams] = useSearchParams()
    const aboutProduct = searchParams.get('about') || ''

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState(
        aboutProduct ? `ارسال پیام در مورد ${aboutProduct}:` : ''
    )
    const [status, setStatus] = useState('idle')
    const [errorMsg, setErrorMsg] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!name.trim() || !phone.trim() || !message.trim()) {
            setStatus('error')
            setErrorMsg('لطفا تمام فیلدها را پر کنید')
            return
        }
        else if (name.trim().length < 2) {
            setStatus('error')
            setErrorMsg('نام نامعتبر است')
            return
        }
        else if (phone.trim().length < 10 || !/^\d+$/.test(phone.trim())) {
            setStatus('error')
            setErrorMsg('تلفن نامعتبر است')
            return
        }

        setStatus('sending')
        setErrorMsg('')

        try {
            await axios.post(`${API_BASE}/contact/`, {
                name,
                phone,
                message,
            })

            setStatus('success')
            setName('')
            setPhone('')
            setMessage('')
        } catch (err) {
            setStatus('error')
            setErrorMsg(
                err.response?.data?.error ||
                err.response?.data?.detail ||
                'ارسال پیام با خطا مواجه شد'
            )
        }
    }

    if (loading) {
        return (
            <>
                <Header categories={categories} />
                <div className="loading-contact">در حال بارگذاری...</div>
            </>
        )
    }

    return (
        <>
            <Header categories={categories} />
            <div className="container-contact-page">
                <div className="contact-info">
                    <h3 className='phone-title'>شماره تماس: <span className='phone'>09126848540</span></h3>
                    <p className='address-title'>آدرس: <span className='address'>تهران جاده خاوران دوربرگردان قیامدشت به سمت  تهران دو کیلومتر بالا تر از روستای سنگتراشان</span></p>
                    <p className='email-title'>ایمیل: <span className='email'>pazin@pazinshoes.ir</span></p>
                    <div className="media">
                        <a href="https://www.instagram.com/pazin.shoes/"
                            target="_blank"
                            rel="noopener noreferrer"><img src={instaLogo} alt="ایستاگرام کفش پازین" /></a>
                        <a href='https://t.me/pazin'
                            target="_blank"
                            rel="noopener noreferrer"><img src={teleLogo} alt="تلگرام کفش پازین" /></a>
                        <a href='https://web.rubika.ir/#c=c0B6dhy06c2c03238650051afa232c83'
                            target="_blank"
                            rel="noopener noreferrer"><img src={rubikaLogo} alt="روبیکا کفش پازین" /></a>
                    </div>
                </div>
                <div className="banner-wrap">
                    <img src={contactBanner} alt="ارتباط با ما پازین" className='contact-banner' />
                </div>
            </div>
            <form className="form" id='form' onSubmit={handleSubmit}>
                <h2>ارسال پیام مستقیم به ما</h2>
                <input
                    type="text"
                    placeholder='نام و نام خانوادگی'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder='شماره تلفن'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <textarea
                    placeholder='متن پیام'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit" disabled={status === 'sending'}>
                    {status === 'sending' ? 'در حال ارسال...' : 'ارسال'}
                </button>
                {status === 'success' && <p className="form-success">پیام شما با موفقیت ارسال شد</p>}
                {status === 'error' && <p className="form-error">{errorMsg}</p>}
            </form>
        </>
    )
}