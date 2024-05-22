const { Course } = require("../models")
const Joi = require("joi");


const createCourseSchema = Joi.object({
      title: Joi.string().required(),
      author: Joi.string().required(),
      description: Joi.string().required(),
  });
 
const createCourse = async(req,res)=>{
    try {
        const {error,value}=createCourseSchema.validate(req.body);
        if(error){
            return res.status(400).json({error:error.details[0].message})
        }

        const {title,author,description} = value;
        const newCourse = await Course.create({
            title,
            author,
            description,
          });

          return res.status(200).json({course:newCourse});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"error in creating a course"});
        
    }

}

const getCourse = async (req, res) => {
    try {
      const getCourse = await Course.findAll({});
      return res.status(200).json({ course: getCourse });
    } catch (error) {
      return res.status(500).json({ error: "error in fetching Course" });
    }
  };



const updateCourse = async (req, res) => {
    try {
      const { error, value } = createCourseSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const { title,author,description } = value;
      const updateCourse = await Course.update(
        { title,author,description },
        { where: { id: req.params.id } }
      );
      return res.status(200).json({ course: updateCourse });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Error in updating student!" });
    }
  };

  const removeCourse = async (req, res) => {
    try {
      await Course.destroy({
        where: {
          id: req.params.id,
        },
      });
      return res.status(200).json({ message: "course is deleted" });
    } catch (error) {
      return res.status(500).json({ message: "Error in deleting course" });
    }
  };



module.exports={
    createCourse,
    updateCourse,
    getCourse,
    removeCourse
}