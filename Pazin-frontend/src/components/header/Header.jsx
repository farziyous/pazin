import { useState } from 'react'
import { NavLink } from 'react-router'
import { SearchInput } from './SearchInput'
import './Header.css'
import mainLogo from '../../assets/logos/main-logo.png'
import dropDownSvg from '../../assets/drop-down.svg'

export const Header = ({ categories }) => {
    return (
        <>
            <div className="header-container">
                <div className="top">
                    <NavLink to='/' ><img src={mainLogo} alt='پازین' /></NavLink>
                    <SearchInput />
                </div>
                <div className="bottom">
                    <div className="collection-links-drop-down">
                        <img src={dropDownSvg} className='drop-down-svg' />
                        <div className="drop-down-list">
                            {categories.map((category) => <NavLink to="/products">{category.title}</NavLink>)}
                        </div>
                    </div>
                    <NavLink to="/contact-us">تماس با ما</NavLink>
                    <NavLink to='/blogs'>وبلاگ</NavLink>
                    <NavLink to='/products'>محصولات</NavLink>
                    <div className='collection-links'>
                        {categories.map((category) => <NavLink to={`/products?category=${category.slug}`}>{category.title}</NavLink>)}
                    </div>
                </div>
            </div>
        </>
    )
}