const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", verifyToken, (req, res) => {
  res.json({ message: "Scan route working fine!" });
});

module.exports = router;
