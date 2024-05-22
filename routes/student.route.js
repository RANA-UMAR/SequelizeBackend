const express = require("express");
const router = express.Router();
const { createStudent, updateStudent, removeStudent, getStudent,assignStudentCourse } = require("../controller/student.controller");




// students
router.post("/",createStudent);
router.post("/assigncourse",assignStudentCourse);
router.get("/",getStudent);
router.put("/:id",updateStudent);
router.delete("/:id",removeStudent);


module.exports=router;