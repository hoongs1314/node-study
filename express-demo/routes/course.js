// 课程数据维护
const express = require("express");
const Joi = require("joi");

const router = express.Router();

let courses = [
	{ id: 1, name: "Math" },
	{ id: 2, name: "Sport" },
	{ id: 3, name: "English" }
];
router.get("", (req, res) => {
	res.send(courses);
	res.end();
});

router.get("/:id", (req, res) => {
	const courseInfo = checkCourse(req.params.id);
	if (!courseInfo) return res.status(404).send(`找不到课程 ${ req.params.id }`);
	res.send(courseInfo);
	res.end();
});

const scheme = Joi.object({
	name: Joi.string().min(3).required()
});
router.post("", (req, res) => {
	const errMsg = validateCourse(req.body);
	if (errMsg) return res.send(errMsg);

	const course = {
		id: courses.length + 1,
		name: req.body.name
	};
	courses.push(course);
	res.send(course);
});

router.put("/:id", (req, res) => {
	const courseInfo = checkCourse(req.params.id);
	if (!courseInfo) return res.status(404).send(`找 不到课程 ${ req.params.id }`);

	const errMsg = validateCourse(req.body);
	if (errMsg) return res.send(errMsg);

	courseInfo.name = req.body.name;
	res.send(courseInfo);
});

router.delete("/:id", (req, res) => {
	const courseInfo = checkCourse(req.params.id);
	if (!courseInfo) return res.status(404).send(`找不到课程 ${ req.params.id }`);

	courses = courses.filter(e => e.id === req.params.id);
	res.send(courseInfo);
});

const checkCourse = (id) => {
	return courses.find(e => e.id === Number(id));
};

const validateCourse = (body) => {
	const result = scheme.validate(body);
	// 参数校验
	if (result.error) return result.error.details.map(e => e.message);
};

module.exports = router;