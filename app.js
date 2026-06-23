require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// routes
const produkRoutes = require("./routes/produk.routes");
app.use("/produk", produkRoutes);

const chatRoutes = require("./routes/chat.routes");
app.use("/chat", chatRoutes);

// homepage
app.get("/", (req, res) => {
  res.send("Server jalan");
});

// ❗ DEBUG ERROR HANDLER (WAJIB)
app.use((err, req, res, next) => {
  console.log("🔥 ERROR:", err.message);
  res.status(500).json({ error: err.message });
});

app.listen(3000, () => {
  console.log("Server running http://localhost:3000");
});