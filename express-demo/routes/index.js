const courseRouter = require("./course");
const homeRouter = require("./home");

const initRouter = (app) => {
	app.use("/", homeRouter);
	app.use("/api/courses", courseRouter);
};

module.exports = initRouter;