import React from "react"
import { useState } from "react"
import Header from "./Header"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/ContextProvider"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
   const {login} = useAuth(); 

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`http://localhost:5052/api/auth/login`, {
        email,
        password,
      })
      localStorage.setItem("token", res.data.token)
      login(true)
      navigate("/")
    } catch (error) {
      console.error("Login failed", error)
    }
  }
  return (
    <>
      <Header />
      <h2 className="mrq">
        <marquee className=" mt-5  py-2 bg-red-300">
          Please login with the following admin email & password
        </marquee>
      </h2>
      <div className="p-5 max-w-[700px] mx-auto text-center">
        <h3>Email : safin@gmail.com</h3>
        <h5>password: safin@gmail.com</h5>
      </div>
      <form
        onSubmit={handleLogin}
        className="max-w-sm mx-auto px-6 text-gray-50 mt-5"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="text-blue-950 bg-blue-100 rounded-md w-full p-2 mb-4 border"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="text-blue-950 bg-blue-100 rounded-md w-full p-2 mb-4 border"
        />
        <button
          type="submit"
          className="w-full bg-blue-50 text-gray-500 border-2 border-blue-700 rounded-md  p-2"
        >
          Login
        </button>
      </form>
    </>
  )
}

export default Login
