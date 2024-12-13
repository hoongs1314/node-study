const express = require("express");
const Joi = require("joi");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const startupDebugger = require("debug")("startup")

const auth = require("./Auth");

const port = process.env.PORT || 3000;
const app = express();

startupDebugger("启动中...")

app.use(express.json());
app.use(helmet());

if (app.get("env") === "development") {
    app.use(morgan("tiny"));
    console.log("morgan running...")
}

console.log(`App Name: ${config.get("name")}`);
console.log(`App Name: ${config.get("mail.host")}`);

app.use(auth);

// 课程数据维护
let courses = [
    {id: 1, name: 'Math'},
    {id: 2, name: 'Sport'},
    {id: 3, name: 'English'}
]

app.get("/", (req, res) => {
    res.send("welcome");
    res.end();
});

app.get("/api/courses", (req, res) => {
    res.send(courses);
    res.end();
});

app.get("/api/courses/:id", (req, res) => {
    const courseInfo = checkCourse(req.params.id)
    if (!courseInfo) return res.status(404).send(`找不到课程 ${req.params.id}`);
    res.send(courseInfo);
    res.end();
});

const scheme = Joi.object({
    name: Joi.string().min(3).required()
});
app.post("/api/courses", (req, res) => {
    const errMsg = validateCourse(req.body);
    if (errMsg) return res.send(errMsg);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
    const courseInfo = checkCourse(req.params.id);
    if (!courseInfo) return res.status(404).send(`找不到课程 ${req.params.id}`);

    const errMsg = validateCourse(req.body);
    if (errMsg) return res.send(errMsg);

    courseInfo.name = req.body.name;
    res.send(courseInfo);
});

app.delete("/api/courses/:id", (req, res) => {
    const courseInfo = checkCourse(req.params.id);
    if (!courseInfo) return res.status(404).send(`找不到课程 ${req.params.id}`);

    courses = courses.filter(e => e.id === req.params.id);
    res.send(courseInfo);
});

app.listen(port, () => {
    console.log(`listening ${port}...`)
});


const checkCourse = (id) => {
    return courses.find(e => e.id === Number(id));
}

const validateCourse = (body) => {
    const result = scheme.validate(body);
    // 参数校验
    if (result.error) return result.error.details.map(e => e.message);
}