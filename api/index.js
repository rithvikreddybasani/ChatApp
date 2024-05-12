const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connectDB");
const router = require("./routes/index");
const cookiesParser = require("cookie-parser");
const { app, server } = require("./socket/index");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// Create an instance of Express
const app = express();

// Middleware setup

// CORS configuration
app.use(
  cors({
    origin: "https://mern-chat-app-client-zeta.vercel.app",
    methods: ["POST", "GET", "PUT", "DELETE"],
  })
);

// JSON body parsing middleware
app.use(express.json());

// Cookie parsing middleware
app.use(cookiesParser());

// Routes

// Default route
app.get("/", (request, response) => {
  response.json({
    message: "Server running at " + PORT,
  });
});

// API endpoints
app.use("/api", router);

// Connect to the database
connectDB()
  .then(() => {
    // Start the server
    server.listen(PORT, () => {
      console.log("Server running at " + PORT);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Set the port
const PORT = process.env.PORT || 8080;

// Start listening for requests on the specified port
app.listen(PORT, () => {
  console.log("Server running at port " + PORT);
});
