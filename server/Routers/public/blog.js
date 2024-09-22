const express = require("express");
const router = express.Router();
const BlogPost = require("../../Models/blog");

router.get("", async (req, res) => {
  const { page = 1, limit = 6 } = req.query;

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

// Route to get a blog by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await BlogPost.findById(id);
    if (!blog) {
      return res
        .status(404)
        .json({ message: "Blog not found.", success: false });
    }

    res.status(200).json({ blog, success: true });
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    res.status(500).json({ message: "Failed to fetch blog.", success: false });
  }
});

module.exports = router;
