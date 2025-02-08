import React from "react"
import { CgProfile } from "react-icons/cg"

const TeamSection = ({ team }) => {
  return (
    <section className="p-5">
      <h2 className="text-3xl mb-4">Our Team</h2>
      <ul className="flex gap-5 flex-wrap">
        {team.map((member, index) => (
          <li
            key={index}
            className="min-h-[220px] min-w-[200px] bg-blue-100 px-4 py-5 rounded-md "
          >
            <h2 className="text-6xl mb-4 text-pink-800">
              <CgProfile />
            </h2>
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default TeamSection
