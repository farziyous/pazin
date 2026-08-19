import './Footer.css'
import instaLogo from '../../assets/logos/instagram-logo.jpg'
import teleLogo from '../../assets/logos/telegram-logo.png'
import rubikaLogo from '../../assets/logos/rubika-logo.png'

export const Footer = () => {
    return (
        <>
            <div className="fotter-container">
                <div className="fotter-top">
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
                <div className="fotter-middle">
                    <div className="socials">
                        <h2>راه های ارتباطی</h2>
                        <p>تماس :09126848540</p>
                        <p>ایمیل: pazin@pazinshoes.ir</p>
                    </div>
                    <div className='address'>
                        <h2>آدرس</h2>
                        <p>تهران جاده خاوران دوربرگردان قیامدشت به سمت  تهران دو کیلومتر بالا تر از روستای سنگتراشان</p>
                    </div>
                </div>
                <p className='fotter-bottom'>کفش پازین</p>
            </div>
        </>
    )
}