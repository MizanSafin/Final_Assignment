import React, { useState } from "react"
import Header from "./Header"
import { useAuth } from "../context/ContextProvider"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const CreateBlog = () => {
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const { fetchData } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (title.trim() == "" || excerpt.trim() == "") {
        return
      }
      const res = await axios.post(
        `http://localhost:5052/api/blog`,
        { title, excerpt },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      if (res.data.success) {
        setTitle("")
        setExcerpt("")
        fetchData()
        navigate("/blog")
      }
    } catch (error) {
      console.error("Error creating blog", error)
    }
  }

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit} className="max-w-[900px]   p-6">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="bg-blue-100 w-full p-2 mb-2 border"
        />
        <textarea
          placeholder="Excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          required
          className="w-full p-2 mb-2 border bg-blue-100"
        />
        <button
          type="submit"
          className="w-full bg-blue-400 hover:bg-blue-700 text-white p-2"
        >
          Create Blog
        </button>
      </form>
    </>
  )
}

export default CreateBlog
