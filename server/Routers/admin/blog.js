const express = require("express");
const BlogPost = require("../../Models/blog");
const requireAdmin = require("../../middlewares/requireAdmin");
const router = express.Router();

router.post("", requireAdmin, async (req, res) => {
  try {
    const { title, image, description, content } = req.body;

    if (!title || !image || !description) {
      return res
        .status(400)
        .json({ message: "Please fill in all fields.", success: false });
    }

    const newPost = new BlogPost({
      title,
      image,
      description,
      content: content || undefined,
    });

    await newPost.save();

    res
      .status(201)
      .json({ message: "Blog post created successfully.", success: true });
  } catch (error) {
    console.error("Error adding blog post:", error);
    res
      .status(500)
      .json({ message: "Failed to add blog post.", success: false });
  }
});

router.get("", requireAdmin, async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const blogs = await BlogPost.find()
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 })
      .select("-content");

    const totalBlogs = await BlogPost.countDocuments();

    res.status(200).json({
      blogs,
      total: totalBlogs,
      page: Number(page),
      hasMore: (page - 1) * limit + blogs.length < totalBlogs,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Failed to fetch blogs.", success: false });
  }
});

router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPost = await BlogPost.findByIdAndDelete(id);

    if (!deletedPost) {
      return res
        .status(404)
        .json({ message: "Blog post not found.", success: false });
    }

    res
      .status(200)
      .json({ message: "Blog post deleted successfully.", success: true });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    res
      .status(500)
      .json({ message: "Failed to delete blog post.", success: false });
  }
});

module.exports = router;
