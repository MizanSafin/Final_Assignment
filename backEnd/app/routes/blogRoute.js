// backend/routes/blogRoutes.js
import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import BlogModel from "../models/BlogModel.js"
const blogRouter = express.Router()

// Get all blogs
blogRouter.get("/",  async (req, res) => {
  try {
    const blogs = await BlogModel.find()
    res.status(200).json({success:true,count:blogs.length,blogs})
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
// Get  blog by ID
blogRouter.get("/:id",  async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await BlogModel.find({_id:id})
    res.status(200).json({success:true,blog})
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Create a new blog
blogRouter.post("/", authMiddleware, async (req, res) => {
  const { title, excerpt } = req.body
  let userId = req.headers["user_id"]
  const blog = new BlogModel({ title, excerpt, userId })
  try {
    const newBlog = await blog.save()
    res
      .status(201)
      .json({ success: true, message: "Blog is created successfully", newBlog })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Update a blog
blogRouter.put("/:id", authMiddleware, async (req, res) => {
  try {
    const blog = await BlogModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.status(201).json({success:true,blog,message:"Blog is updated successfully" })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Delete a blog
blogRouter.delete("/:id", authMiddleware, async (req, res) => {
  try {
    let result = await BlogModel.findByIdAndDelete(req.params.id)
    res.status(200).json({success:true, message: "Blog deleted",result })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default blogRouter
