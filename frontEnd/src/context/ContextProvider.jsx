import axios from "axios"
import React, { createContext, useContext, useEffect, useState } from "react"

const authContext = createContext()

function ContextProvider({ children }) {
  const [auth, setAuth] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [services, setServices] = useState([])
  const [teams, setTeams] = useState([])

  const fetchData = async () => {
    try {
      const [blogRes, serviceRes, teamRes] = await Promise.all([
        axios.get(`http://localhost:5052/api/blog`),
        axios.get(`http://localhost:5052/api/service`),
        axios.get(`http://localhost:5052/api/team`),
      ])

      setBlogs(blogRes.data.blogs)
      setServices(serviceRes.data.services)
      setTeams(teamRes.data.teamMembers)
    } catch (error) {
      console.error("Error fetching data", error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  const login = (auth) => {
    setAuth(auth)
  }

  const logout = () => {
    localStorage.removeItem("token")
    login(false)
  }
  useEffect(() => {
    const verifyUser = async () => {
      try {
        let response = await axios.get(
          `http://localhost:5052/api/auth/verify`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        if (response.data.success) {
          setAuth(response.data.success)
        }
      } catch (error) {
        console.log(error)
      }
    }

    verifyUser()
  }, [])

  const handleBlogDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5052/api/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (res.data.success) {
        fetchData()
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleServiceDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5052/api/service/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (res.data.success) {
        fetchData()
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleTeamDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5052/api/team/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )

      if (res.data.success) {
        fetchData()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const editBlog = async (id, title, excerpt) => {
    if (title.trim() == "" || excerpt.trim() == "") {
      return
    } else {
      let response = await axios.put(
        `http://localhost:5052/api/blog/${id}`,
        {
          title,
          excerpt,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )

      if (response.data.success) {
        fetchData()
      }
    }
  }

  const editService = async (id, name, description) => {
    if (name.trim() == "" || description.trim() == "") {
      return
    } else {
      let response = await axios.put(
        `http://localhost:5052/api/service/${id}`,
        {
          name,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )

      if (response.data.success) {
        fetchData()
      }
    }
  }
  const editTeam = async (id, name, role) => {
    if (name.trim() == "" || role.trim() == "") {
      return
    } else {
      let response = await axios.put(
        `http://localhost:5052/api/team/${id}`,
        {
          name,
          role,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )

      if (response.data.success) {
        fetchData()
      }
    }
  }
  return (
    <authContext.Provider
      value={{
        auth,
        login,
        logout,
        blogs,
        services,
        teams,
        handleBlogDelete,
        handleServiceDelete,
        handleTeamDelete,
        editBlog,
        fetchData,
        editService,
        editTeam
      }}
    >
      {children}
    </authContext.Provider>
  )
}

export const useAuth = () => useContext(authContext)
export default ContextProvider
