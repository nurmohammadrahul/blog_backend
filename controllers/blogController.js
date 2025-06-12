import Blog from "../models/Blog.js";

export const createBlog = async (req, res) => {
  try {
    const blog = new Blog({ ...req.body, author: req.user.id });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "username");
    res.json(blogs);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "username");
    if (!blog) return res.status(404).json("Blog not found");

    blog.views += 1;
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog.author.toString() !== req.user.id)
      return res.status(403).json("Not allowed");

    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog.author.toString() !== req.user.id)
      return res.status(403).json("Not allowed");

    await blog.deleteOne();
    res.json("Blog deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};
export const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch your blogs", error: err });
  }
};

