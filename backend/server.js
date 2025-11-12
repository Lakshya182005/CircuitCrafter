
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const scanRoutes = require("./routes/scanRoutes");


const app = express();

app.use(morgan("dev"));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});


app.use("/api/auth", authRoutes);
app.use("/api/scans", scanRoutes);



app.get("/", (req, res) => res.send("CircuitCrafter API running..."));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server working fine on ${PORT}`));
