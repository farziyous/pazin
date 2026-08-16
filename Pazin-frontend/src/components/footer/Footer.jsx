import './Footer.css'
import instaLogo from '../../assets/logos/instagram-logo.jpg'
import teleLogo from '../../assets/logos/telegram-logo.png'
import eitaaLogo from '../../assets/logos/eitaa-logo.png'

export const Footer = () => {
    return (
        <>
            <div className="fotter-container">
                <div className="fotter-top">
                    <a href=""><img src={instaLogo} alt="ایستاگرام کفش پازین" /></a>
                    <a href=""><img src={teleLogo} alt="تلگرام کفش پازین" /></a>
                    <a href=""><img src={eitaaLogo} alt="ایتا کفش پازین" /></a>
                </div>
                <div className="fotter-middle">
                    <div className="socials">
                        <h2>راه های ارتباطی</h2>
                        <p>تماس :0990000000</p>
                        <p>ایمیل: sdafjlk;@lgal.cop</p>
                    </div>
                    <div className='address'>
                        <h2>آدرس</h2>
                        <p>یت سب اسیشا بنسیب اسشابنش تسا یبس شیا بنسشیت  منبت س  یشمن تبم نسیشتبتس تبسی شت بمتس شبمتسشیمن بتسیمشنتبمن سشیتب</p>
                    </div>
                </div>
                <p className='fotter-bottom'>کفش پازین</p>
            </div>
        </>
    )
}