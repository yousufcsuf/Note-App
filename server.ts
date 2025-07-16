import express from "express";

import Notemodel from "./src/models/note";
import mongoose from "mongoose";
const app = express();
const port = 5000;

const MONGO_URI = "mongodb://localhost:27017/my_database";
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};
connectDB();

app.get("/", async (req, res) => {
  const notes = await Notemodel.find().exec();
  res.status(200).json(notes);
});

app.post("/create", async (req, res) => {
  const queryParams = req.query;
  console.log(queryParams);

  const newNote = new Notemodel({
    title: queryParams.title,
    text: queryParams.text,
  });
  console.log("NewNotes", newNote);
  const notes = await Notemodel.find().exec();
  await newNote.save();
  res.status(200).json(notes);
});

app.listen(port, () => {
  console.log("Server is started");
});
