import React, { useState } from "react"
import { Link } from "react-router-dom"
import { MdSpaceDashboard, MdMenu, MdClose } from "react-icons/md"
import { useAuth } from "../context/ContextProvider"

const Header = () => {
  const { auth } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const {logout} = useAuth();
  return (
    <>
      <header className="border-b-2 py-4 md:py-7 px-5 bg-white shadow-md">
        <nav className="flex justify-between items-center">
          {/* Logo or Brand Name */}
          <Link to="/" className="text-xl font-bold text-blue-600">
            MyPortfolio
          </Link>

          {/* Hamburger Menu Button (Mobile) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-2xl focus:outline-none"
          >
            {isMenuOpen ? <MdClose /> : <MdMenu />}
          </button>

          {/* Navigation Links */}
          <ul
            className={`absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none flex flex-col md:flex-row items-center gap-5 p-5 md:p-0 ${
              isMenuOpen ? "block" : "hidden"
            } md:flex`}
          >
            <li>
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Contact
              </Link>
            </li>

            {auth ? (
              <>
                <li>
                  <Link
                    to="/about"
                    className="text-gray-700 hover:text-blue-600 transition"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="text-gray-700 hover:text-blue-600 transition"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/service"
                    className="text-gray-700 hover:text-blue-600 transition"
                  >
                    Service
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={()=>logout()}
                    className="text-gray-700 hover:text-blue-600 transition"
                  >
                    Logout
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-blue-600 transition flex items-center gap-1"
                  >
                    <MdSpaceDashboard className="text-xl" /> Dashboard
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Header
