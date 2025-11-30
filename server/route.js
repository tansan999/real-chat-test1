const express = require("express");
const router = express.Router();

router.get("/", ({ req, res }) => {
  res.send("это только мир созданной мною !");
});

module.exports = router;
