import express from "express";

// create an express application
const app = express();
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes import
import userRoutes from "./routes/user.route.js";

// routes declaration
app.use("/api/v1/users", userRoutes);

// example route: http://localhost:5000/api/v1/users

export default app;
