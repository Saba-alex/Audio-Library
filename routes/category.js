const express = require("express");
const router = express.Router();
const categoryControllers = require("../controllers/category");


router.post("/addCategories", categoryControllers.addCategory);

module.exports = router;