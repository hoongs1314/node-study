const startupDebugger = require("debug")("startup");

module.exports = (req, res, next) => {
	// 分级打印启动信息
	startupDebugger("启动中...");
	next();
};