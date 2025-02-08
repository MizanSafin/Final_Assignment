import React from "react"

const BlogSection = ({ blogs }) => {
  return (
    <section className="bg-blue-100 px-5 min-h-screen pt-16">
      <h2 className="pb-8 text-4xl">Blog</h2>
      <ul className="flex flex-wrap gap-5 pb-10">
        {blogs.map((blog, index) => (
          <li key={index} className="bg-blue-50 min-h-[200px] px-5 py-6 rounded-md max-w-[500px]">
            <h3 className="mb-3 text-2xl">{blog.title}</h3>
            <p>{blog.excerpt}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default BlogSection
