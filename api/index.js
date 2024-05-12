const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connectDB");
const router = require("./routes/index");
const cookiesParser = require("cookie-parser");
const { app, server } = require("./socket/index");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

app.use(
  cors({
    origin: "https://mern-chat-app-client-zeta.vercel.app",
    methods: ["POST", "GET", "PUT", "DELETE"],

  })
);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cookiesParser());

const PORT = process.env.PORT || 8080;

app.get("/", (request, response) => {
  response.json({
    message: "Server running at " + PORT,
  });
});

//api endpoints
app.use("/api", router);
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log("server running at " + PORT);
  });
});
