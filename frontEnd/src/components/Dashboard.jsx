import React, { useEffect,  useState } from "react"
import Header from "./Header"
import { CiEdit } from "react-icons/ci"
import { MdDeleteOutline } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/ContextProvider"
// const API_BASE_URL = `http://localhost:5052/api`

const Dashboard = () => {
 
  const navigate = useNavigate();

  const { handleBlogDelete,handleServiceDelete,handleTeamDelete, blogs, services, teams } = useAuth()



  return (
    <>
      <Header />
      <div className="p-5 lg:px-10">
        <h2 className="mt-5 text-xl font-bold mb-10">Dashboard</h2>

        <section className="mb-10 max-w-[900px]">
          <h3>Blogs</h3>
          <button
            onClick={() => navigate("/create-blog")}
            className="my-4 px-2 py-1 bg-blue-500 hover:bg-blue-900 text-[16px] text-blue-50 rounded-md"
          >
            Create blog
          </button>
          {blogs.map((blog) => (
            <div key={blog._id} className="p-2 border cursor-pointer">
              <h2 className="mb-3 ">{blog.title}</h2>
              <h4 className="text-[15px]">{blog.excerpt}</h4>
              <div className=" flex gap-5 mt-3">
                <button className="text-[18px] hover:text-[20px]">
                  <CiEdit onClick={() => navigate(`/blogUpdate/${blog._id}`)} />
                </button>
                <button className="text-[18px] hover:text-[20px]">
                  <MdDeleteOutline onClick={() => handleBlogDelete(blog._id)} />
                </button>
              </div>
            </div>
          ))}
        </section>
        <section className="mb-10 max-w-[900px]">
          <h3 className="mb-3">Services</h3>
          <button
            onClick={() => navigate("/create-service")}
            className="my-4 px-2 py-1 bg-blue-500 hover:bg-blue-900 text-[16px] text-blue-50 rounded-md"
          >
            Create service
          </button>
          {services.map((service) => (
            <div key={service._id} className="p-2 border">
              <h2>{service.name}</h2>
              <p className="mt-2 text-[16px]">{service.description}</p>
              <div className=" flex gap-5 mt-3">
                <button className="text-[18px] hover:text-[20px]">
                  <CiEdit
                    onClick={() => navigate(`/serviceUpdate/${service._id}`)}
                  />
                </button>
                <button className="text-[18px] hover:text-[20px]">
                  <MdDeleteOutline
                    onClick={() => handleServiceDelete(service._id)}
                  />
                </button>
              </div>
            </div>
          ))}
        </section>
        <section className="mb-10 max-w-[900px]">
          <h3>Teams</h3>
          <button
            onClick={() => navigate("/create-team")}
            className="my-4 px-3 py-2 bg-blue-500 hover:bg-blue-900 text-[16px] text-blue-50 rounded-md"
          >
            Create Team Member
          </button>
          {teams.map((team) => (
            <div key={team._id} className="p-4 border">
              <h2 className="mb-2">{team.name}</h2>
              <p className="text-[16px]">{team.role}</p>
              <div className=" flex gap-5 mt-3">
                <button className="text-[18px] hover:text-[20px]">
                  <CiEdit onClick={() => navigate(`/teamUpdate/${team._id}`)} />
                </button>
                <button className="text-[18px] hover:text-[20px]">
                  <MdDeleteOutline onClick={() => handleTeamDelete(team._id)} />
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  )
}

export default Dashboard
