import { User } from "../models/user.model.js";

// Creating a Register User Controller
const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body ?? {};

    // basic validation
    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }
    if (
      typeof password !== "string" ||
      password.length < 6 ||
      password.length > 50
    ) {
      return res
        .status(400)
        .json({ message: "Password must be between 6 and 50 characters" });
    }

    // check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    // create new user
    const newUser = await User.create({ username, password, email });
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    if (error?.code === 11000) {
      return res
        .status(409)
        .json({ message: "Username or email already exists" });
    }
    if (error?.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Creating a Login User Controller
const loginUser = async (req, res) => {
  try {
    // checking if the user exists
    const { email, password } = req.body ?? {};
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }
    const newUser = await User.findOne({ email });

    if (!newUser) {
      return res.status(400).json({ message: "User not found" });
    }

    // compare the password with the hashed password
    const isPasswordMatch = await newUser.comparePassword(password);

    // checking if the password is correct
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const logoutUser = async (req, res) => {
  try {
    const { email } = req.body;
    const newUser = await User.findOne({
      email,
    });

    if (!newUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Logout Successful",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export { registerUser, loginUser, logoutUser };
