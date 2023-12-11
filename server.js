const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 3000;
const Thread = require("./models/Thread");

app.use(express.static("public"));
app.use(express.json()); // これを追加する

mongoose.connect(
  "mongodb+srv://enokida:abc@cluster0.kldbhmu.mongodb.net/?retryWrites=true&w=majority"
).then(() => {
  console.log("db connected");
}).catch(err => {
  console.error("Database connection error:", err);
});

// getメソッド
app.get("/api/v1/threads", async(req, res) => {
  try {
    const allthreads = await Thread.find({});
    res.status(200).json(allthreads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// postメソッド
app.post("/api/v1/thread", async(req, res) => {
  try {
    const createThread = await Thread.create(req.body);
    res.status(201).json(createThread); // 成功した場合は201ステータスコードを返す
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
