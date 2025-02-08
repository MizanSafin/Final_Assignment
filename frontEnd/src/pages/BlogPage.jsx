import React from "react"
import BlogSection from "../components/BlogSection"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useAuth } from "../context/ContextProvider"



const BlogPage = () => {
  const { blogs } = useAuth()
  return (
    <div>
      <Header />
      <BlogSection blogs={blogs} />
      <Footer />
    </div>
  )
}

export default BlogPage
