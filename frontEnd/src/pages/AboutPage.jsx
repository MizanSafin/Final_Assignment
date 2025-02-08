import React from "react"
import TeamSection from "../components/TeamSection"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useAuth } from "../context/ContextProvider"


const AboutPage = () => {
const { teams } = useAuth()

  return (
    <div>
      <Header />
      <section className="py-16 text-4xl px-5">
        <h2 className="mb-4">About Me</h2>
        <p>This is the about section.</p>
      </section>
      <TeamSection team={teams} />
      <Footer />
    </div>
  )
}

export default AboutPage
