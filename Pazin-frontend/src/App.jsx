import { useState, useEffect } from 'react'
import axios from 'axios'
import { Routes, Route } from 'react-router'
import { Home } from './pages/home/Home'
import { Products } from './pages/products/Products'
import { Product } from './pages/product/Product'
import { Contact } from './pages/contact/Contact'
import { Blogs } from './pages/blogs/Blogs'
import { Blog } from './pages/blog/Blog'
import { NotFound } from './pages/not-found/NotFound'
import './App.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

function App() {
  const [categories, setCategories] = useState([])
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    const loadInitialData = async () => {
      try {
        setLoading(true)
        const [categoriesRes, blogsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/categories/`, { signal: controller.signal }),
          axios.get(`${API_BASE_URL}/api/blogs/`, { signal: controller.signal }),
        ])
        setCategories(categoriesRes.data)
        setBlogs(blogsRes.data)
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(err)
          console.error('Failed to load initial data:', err)
        }
      } finally {
        setLoading(false)
      }
    }

    loadInitialData()
    return () => controller.abort()
  }, [])

  if (error) {
    return <div className="app-error">مشکلی پیش امده است لطفا بعدا تلاش کنید</div>
  }

  return (
    <Routes>
      <Route index element={<Home categories={categories} blogs={blogs} loading={loading} />} />
      <Route path='products' element={<Products categories={categories} loading={loading} />} />
      <Route path='product' element={<Product categories={categories} loading={loading} />} />
      <Route path='contact-us' element={<Contact categories={categories} loading={loading} />} />
      <Route path='blogs' element={<Blogs categories={categories} blogs={blogs} loading={loading} />} />
      <Route path='blog' element={<Blog categories={categories} loading={loading} />} />
      <Route path='*' element={<NotFound categories={categories} />} />
    </Routes>
  )
}

export default App