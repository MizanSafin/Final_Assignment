import React, { useState } from 'react'
import Header from './Header'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/ContextProvider'
import axios from 'axios'

const CreateTeam = () => {
    const [name, setName] = useState("")
    const [role, setRole] = useState("")
    const { fetchData } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
      e.preventDefault()

      try {
        if (name.trim() == "" || role.trim() == "") {
          return
        }
        const res = await axios.post(
          `http://localhost:5052/api/team`,
          { name, role },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        if (res.data.success) {
          setName("")
          setRole("")
          fetchData()
          navigate("/about")
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
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-blue-100 w-full p-2 mb-2 border"
        />
        <textarea
          placeholder="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          className="w-full p-2 mb-2 border bg-blue-100"
        />
        <button
          type="submit"
          className="w-full bg-blue-400 hover:bg-blue-700 text-white p-2"
        >
          Create Team Member
        </button>
      </form>
    </>
  )
}

export default CreateTeam