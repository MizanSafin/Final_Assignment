import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/ContextProvider'
import axios from 'axios'

const UpdateTeam = () => {
    const [teamMember, setTeamMember] = useState({})
    const [name, setName] = useState("")
    const [role, setRole] = useState("")
    const { id } = useParams()
    const navigate = useNavigate()
    const { editTeam } = useAuth()

    const handleEdit = () => {
      editTeam(id, name, role)
      navigate("/dashboard")
    }

    useEffect(() => {
      const fetchTeam = async () => {
        try {
          let res = await axios.get(`http://localhost:5052/api/team/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          setTeamMember(res.data.teamMember[0])
        } catch (error) {
          console.log(error.message)
        }
      }
      fetchTeam()
    }, [])
  return (
    <>
      <Header />
      <div className="p-5 flex flex-col gap-5 max-w-[700px]">
        <input
          placeholder={teamMember.name}
          className="bg-blue-100 px-3 py-1"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder={teamMember.role}
          className="bg-blue-100 p-2 min-h-[120px]"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        ></textarea>
        <button
          onClick={handleEdit}
          className="bg-blue-200 px-3 py-2 rounded-md text-[14px] mt-3 hover:bg-blue-300"
        >
          Update team
        </button>
      </div>
    </>
  )
}

export default UpdateTeam