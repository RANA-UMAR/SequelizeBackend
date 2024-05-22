'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student_Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Student_Course.init({
    id:{
      type:DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    student_id: {
      type:DataTypes.INTEGER,
      references:{
        model:"students",
        key:"id"
      },
    },
    course_id:{
      type:DataTypes.INTEGER,
      references:{
        model:"courses",
        key:"id"
      }
    },
  }, {
    sequelize,
    modelName: 'Student_Course',
  });
  return Student_Course;
};