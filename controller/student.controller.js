const { where } = require("sequelize");
const { Student,Course } = require("../models");

const Joi = require("joi");

const createStudentSchema = Joi.object({
  Name: Joi.string().required(),
  email: Joi.string().required(),
  roll_no: Joi.number().integer().required(),
});

const createStudent = async (req, res) => {
  try {
    const { error, value } = createStudentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { Name, email, roll_no } = value;
    const newStudent = await Student.create({ Name, email, roll_no });

    return res.status(200).json({ student: newStudent });
  } catch (error) {
    res.status(500).json({ error: "error in creating students" });
    
  }
};

const getStudent = async (req, res) => {
  try {
    const getStudents = await Student.findAll({});
    return res.status(200).json({ students: getStudents });
  } catch (error) {
    return res.status(500).json({ error: "error in fetching students" });
  }
};

const updateStudent = async (req, res) => {
  console.log("testing");
  try {
    const { error, value } = createStudentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { Name, email, roll_no } = value;
    const updateStudent = await Student.update(
      { Name, email, roll_no },
      { where: { id: req.params.id } }
    );
    res.status(200).json({ updateStudent: updateStudent });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error in updating student!" });
  }
};

const removeStudent = async (req, res) => {
  try {
    await Student.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json({ message: "student is deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Error in deleting student" });
  }
};

const assignStudentCourse = async (req,res)=>{
    try {
        const { studentId, courseId } = req.body; 
        const std = await Student.findOne({ where: { id: studentId } }); 
        if(!std){
            return res.status(400).json({ error: "Student not found" });
        }
        const cours = await Course.findOne({ where: { id: courseId } });
        if(!cours){
            return res.status(400).json({ error: "Course not found" }); 
        }
        await std.addCourse(cours); 
        return res.status(201).json({ message: "Course is assigned to student" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error in assigning course to student" });
    }
}


module.exports = {
  createStudent,
  getStudent,
  updateStudent,
  removeStudent,
  assignStudentCourse
};
