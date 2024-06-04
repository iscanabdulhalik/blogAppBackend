import Blog from "../Model/Blog.js";
import User from "../Model/User.js";

async function createBlog(req, res) {
  const user = req.user;
  try{
    const blog = new Blog(req.body);
    await blog.save();
    user.blogs.push(blog);
    await user.save();
    res.status(201).json({ message: "Blog created successfully" });
    const blogs = await Blog.find().populate("user", "name", "email");
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

async function getUserBlogById(req, res) {
  const userId = req.params.id;
  try {
    const blogId = await User.findById(userId).select("blogs");
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(blogId);
    const blogs = await User.findById(userId).populate("blogs").select("blogs");
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

async function getAllBlogs(req, res) {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

async function getBlogById(req, res) {
  const blogId = req.params.id;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

async function updateBlog(req, res) {
  const blogId = req.params.id;
  const blog = await Blog.findById(blogId);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  const { title, content } = req.body;
  try {
    await Blog.findByIdAndUpdate(blogId, {
      title,
      content,
      updatedAt: Date.now(),
    });
    res.status(200).json({ message: "Blog updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

async function deleteBlog(req, res) {
  const blogId = req.params.id;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    } else {
      await Blog.findByIdAndDelete(blogId);
      res.status(200).json({ message: "Blog deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export {
  createBlog,
  getAllBlogs,
  getUserBlogById,
  getBlogById,
  updateBlog,
  deleteBlog,
};
