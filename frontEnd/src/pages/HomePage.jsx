import React from "react"
import BlogSection from "../components/BlogSection"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useAuth } from "../context/ContextProvider"


const HomePage = () => {
const {blogs} = useAuth()

  return (
    <div>
      <Header />
      <div className="p-5">
        <h1>Welcome to My Portfolio</h1>
        {/* Slider/Hero section */}
        <section className="py-10 text-4xl min-h-[300px]">
          <h2 className="mb-4">Hero Section</h2>
          <p>Welcome to my portfolio website.</p>
        </section>
      </div>
      <BlogSection blogs={blogs} />
      <Footer />
    </div>
  )
}

export default HomePage
