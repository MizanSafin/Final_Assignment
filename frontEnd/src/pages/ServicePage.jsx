import React from "react"
import Header from "../components/Header"
import ServiceSection from "../components/ServiceSection"
import Footer from "../components/Footer"
import { useAuth } from "../context/ContextProvider"



const ServicePage = () => {
const {services} = useAuth()

  return (
    <div>
      <Header />
      <ServiceSection services={services} />
      <Footer />
    </div>
  )
}

export default ServicePage
