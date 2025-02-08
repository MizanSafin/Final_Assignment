import axios from "axios"
import React, { useEffect,  useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Header from "./Header"
import { useAuth } from "../context/ContextProvider"

const UpdateBlog = () => {
  const [blog, setBlog] = useState({})
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const { id } = useParams()
  const navigate = useNavigate()
  const {editBlog} = useAuth();
  

  const handleEdit = ()=>{
     editBlog(id,title,excerpt);
     navigate("/dashboard")
  }

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        let res = await axios.get(`http://localhost:5052/api/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        setBlog(res.data.blog[0])
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchBlog()
  }, [])

  return (
    <>
      <Header />
      <div className="p-5 flex flex-col gap-5 max-w-[700px]">
        <input
          placeholder={blog.title}
          className="bg-blue-100 px-3 py-1"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder={blog.excerpt}
          className="bg-blue-100 p-2 min-h-[120px]"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        ></textarea>
        <button
          onClick={handleEdit}
          className="bg-blue-200 px-3 py-2 rounded-md text-[14px] mt-3 hover:bg-blue-300"
        >
          Update blog
        </button>
      </div>
    </>
  )
}

export default UpdateBlog
