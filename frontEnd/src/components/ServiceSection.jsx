import React from "react"

const ServiceSection = ({ services }) => {
  return (
    <section className="min-h-screen bg-blue-50 p-5">
      <h2 className="text-4xl mb-5">Services</h2>
      <ul className="flex gap-5 flex-wrap">
        {services.map((service, index) => (
          <li key={index} className="min-h-[300px] bg-blue-100 p-4 rounded-md">
            <h3 className="text-2xl mb-2">{service.name}</h3>
            <p>{service.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ServiceSection
