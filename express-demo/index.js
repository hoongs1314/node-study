const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const initRouter = require("./routes/index");

const auth = require("./middleware/auth");
const logger = require("./middleware/logger");

const port = process.env.PORT || 3000;
const app = express();

// 初始化路由
initRouter(app);

// 挂载中间件
app.use(express.json());
app.use(helmet());

// 自定义中间件
app.use(auth);
app.use(logger);

if (app.get("env") === "development") {
	app.use(morgan("tiny"));
	console.log("morgan running...");
}

console.log(`App Name: ${ config.get("name") }`);
console.log(`App Name: ${ config.get("mail.host") }`);

app.listen(port, () => {
	console.log(`listening ${ port }...`);
});
