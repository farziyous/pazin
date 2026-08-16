import { useSearchParams, useNavigate, useLocation } from 'react-router'
import { useRef, useEffect } from 'react'
import './SearchInput.css'

let shouldRefocus = false

export const SearchInput = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const location = useLocation()
    const debounceRef = useRef(null)
    const inputRef = useRef(null)

    const searchValue = location.pathname === '/products'
        ? (searchParams.get('search') || '')
        : ''

    useEffect(() => {
        if (shouldRefocus && inputRef.current) {
            const input = inputRef.current
            input.focus()
            const len = input.value.length
            input.setSelectionRange(len, len)
        }
    }, [])

    const search = (event) => {
        const value = event.target.value
        shouldRefocus = true

        if (debounceRef.current) clearTimeout(debounceRef.current)

        debounceRef.current = setTimeout(() => {
            const params = new URLSearchParams(value ? { search: value } : {})
            navigate(`/products?${params.toString()}`, { replace: true })
        }, 300)
    }

    const handleBlur = () => {
        shouldRefocus = false
    }

    return (
        <div className='search'>
            <input
                ref={inputRef}
                type="text"
                placeholder='جستجو'
                defaultValue={searchValue}
                onChange={search}
                onBlur={handleBlur}
            />
            {searchValue === '' ?
                <div className='search-svg'>
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#0a423b" transform="matrix(-1, 0, 0, 1, 0, 0)">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                        <g id="SVGRepo_iconCarrier"> <path d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#0a423b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> </g>
                    </svg>
                </div>
                : ''}
        </div>
    )
}