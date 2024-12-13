// 首页相关
const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
	res.send("welcome");
	res.end();
});

module.exports = router;