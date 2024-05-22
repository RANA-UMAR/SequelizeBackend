const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Admin } = require("../models");
const { where } = require("sequelize");
const JWTService = require("../services/JWTServices");
const { PORT } = require("../config/index")
const { RefreshToken } = require("../models");
const signUp = async (req, res) => {
  try {
    const { Name, email, password } = req.body;
    const picture = req.file;
    console.log(picture);
    const user = await Admin.findOne({ where: { email: email } });
    if (user) {
      return res.status(401).json({
        message: "Email already exists",
      });
    }

    const hash = await bcrypt.hash(password, 10);
    if (!hash) {
      return res.status(500).json({
        message: "password is not hashed",
      });
    }
 
    const imageUrl = `http://localhost:${PORT}/uploads/${picture.filename}`;
    const created = await Admin.create({
      Name: Name,
      email: email,
      password: hash,
      picture:imageUrl,
    });

    if (!created) {
      return res.status(500).json({
        message: "failed to create the data",
      });
    }

    return res.status(201).json({
      message: created,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Admin.findOne({ where: { email: email } });
    if (!user) {
      return res.status(401).json({
        message: "User not signUp",
      });
    }

    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res.status(401).json({
        message: "password not found",
      });
    }
    const token = JWTService.signAccessToken(
      {
        id: user.id,
        name: user.Name,
        email: user.email,
        pictue: user.pictue,
        postal_code: user.postal_code,
        city: user.city,
      },
      "2d"
    );

    const refreshtoken = JWTService.signRefreshToken(
      {
        id: user.id,
        name: user.Name,
        email: user.email,
        pictue: user.pictue,
        postal_code: user.postal_code,
        city: user.city,
      },
      "5d"
    );
    await JWTService.storeRefreshToken(refreshtoken, user.id);

    return res.status(200).json({
      message: "login successful",
      token: token,
      refreshtoken: refreshtoken,
      user: user,
      result: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { city, postal_code } = req.body;
    // const picture = req.file;
    const userId = req.user.id;
    console.log("userId:", userId);

    const result = await Admin.update(
      {
        city: city,
        postal_code: postal_code,
        // picture: picture.filename,
      },
      {
        where: { id: userId },
      }
    );

    if (result) {
      return res.status(200).json({
        message: "successfully updated",
      });
    } else {
      return res.status(500).json({
        message: "Failed to update",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  signUp,
  signIn,
  updateProfile,
};
