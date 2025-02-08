import React, { useState } from 'react'
import Header from './Header'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/ContextProvider'

const CreateService = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const { fetchData } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
      e.preventDefault()

      try {
        if (name.trim() == "" || description.trim() == "") {
          return
        }
        const res = await axios.post(
          `http://localhost:5052/api/service`,
          { name, description },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        if (res.data.success) {
          setName("")
          setDescription("")
          fetchData()
          navigate("/service")
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
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-blue-100 w-full p-2 mb-2 border"
        />
        <textarea
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 mb-2 border bg-blue-100"
        />
        <button
          type="submit"
          className="w-full bg-blue-400 hover:bg-blue-700 text-white p-2"
        >
          Create Service
        </button>
      </form>
    </>
  )
}

export default CreateService