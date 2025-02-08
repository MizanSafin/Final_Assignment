// backend/routes/blogRoutes.js
import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import TeamModel from "../models/TeamModel.js"
const teamRouter = express.Router()

// Get all teams
teamRouter.get("/", async (req, res) => {
  try {
    const teamMembers = await TeamModel.find({})
    res
      .status(200)
      .json({ success: true, count: teamMembers.length, teamMembers })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
// Get single teamMember
teamRouter.get("/:id",authMiddleware,async (req, res) => {
  try {
    const {id} = req.params;
    const teamMember = await TeamModel.find({_id:id})
    res
      .status(200)
      .json({ success: true, teamMember })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Create a new teams
teamRouter.post("/", authMiddleware, async (req, res) => {
  const { name, role } = req.body
  let userId = req.headers["user_id"]
  const team = new TeamModel({ name,role,userId })
  try {
    const teamMember = await team.save()
    res
      .status(201)
      .json({
        success: true,
        message: "teamMember is created successfully",
        teamMember,
      })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Update a teams
teamRouter.put("/:id", authMiddleware, async (req, res) => {
  try {
    const teamMember = await TeamModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    )
    res.status(200).json({
      success: true,
      teamMember,
      message: "teamMember is updated successfully",
    })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Delete a teams
teamRouter.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await TeamModel.findByIdAndDelete(req.params.id)
    res.status(200).json({success:true, message: "teamMember deleted" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default teamRouter
