// backend/routes/blogRoutes.js
import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import ServiceModel from "../models/ServiceModel.js"
const serviceRouter = express.Router()

// Get all Services
serviceRouter.get("/", async (req, res) => {
  try {
    const services = await ServiceModel.find({})
    res
      .status(200)
      .json({ success: true, count: services.length, services })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Create a new service
serviceRouter.post("/", authMiddleware, async (req, res) => {
  const { name, description } = req.body
  let userId = req.headers["user_id"]
  const serviceObj = new ServiceModel({ name, description, userId })
  try {
    const service = await serviceObj.save()
    res.status(201).json({
      success: true,
      message: "service is created successfully",
      service,
    })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Update a service
serviceRouter.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedService = await ServiceModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    )
    res.status(200).json({
      success: true,
      updatedService,
      message: "Service is updated successfully",
    })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Delete a service
serviceRouter.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await ServiceModel.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "Service deleted" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default serviceRouter
