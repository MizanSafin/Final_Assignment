import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/ContextProvider'
import axios from 'axios'

const UpdateService = () => {
    const [service, setService] = useState({})
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const { id } = useParams()
    const navigate = useNavigate()
    const { editService } = useAuth()

    const handleEdit = () => {
      editService(id, name, description)
      navigate("/dashboard")
    }

    useEffect(() => {
      const fetchService = async () => {
        try {
          let res = await axios.get(`http://localhost:5052/api/service/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          setService(res.data.service[0])
        } catch (error) {
          console.log(error.message)
        }
      }
      fetchService()
    }, [])
  return (
    <>
      <Header />
      <div className="p-5 flex flex-col gap-5 max-w-[700px]">
        <input
          placeholder={service.name}
          className="bg-blue-100 px-3 py-1"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder={service.description}
          className="bg-blue-100 p-2 min-h-[120px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button
          onClick={handleEdit}
          className="bg-blue-200 px-3 py-2 rounded-md text-[14px] mt-3 hover:bg-blue-300"
        >
          Update service
        </button>
      </div>
    </>
  )
}

export default UpdateService