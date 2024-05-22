const express = require("express");
const router = express.Router();

const { createCourse,getCourse,updateCourse,removeCourse } = require("../controller/course.controller");

// courses
router.post("/",createCourse);
router.get("/",getCourse);
router.put("/:id",updateCourse);
router.delete("/:id",removeCourse);

module.exports=router; 