import { Post } from "../models/post.model.js";

// Creating a Post Controller
const createPost = async (req, res) => {
  try {
    const { name, description, age } = req.body;
    if (!name || !description || !age) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }
    const post = await Post.create({ name, description, age });
    res.status(201).json({
      message: "Post created successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Creating a Get All Posts Controller

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    // basic validation to check if the body is empty
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is empty" });
    }
    const { id } = req.params;
    const { name, description, age } = req.body;
    const post = await Post.findByIdAndUpdate(
      id,
      { name, description, age },
      { new: true },
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({
      message: "Post updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createPost, getAllPosts, updatePost, deletePost };
