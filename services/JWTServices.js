const jwt = require("jsonwebtoken");
const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = require("../config/index");
const { RefreshToken } = require("../models");

const signAccessToken = (payload, expiryTime) => {
  try {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: expiryTime });
  } catch (error) {
    console.log(error);
    throw new Error("Access Token is not generated");
  }
};

const signRefreshToken = (payload, expiryTime) => {
  try {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: expiryTime });
  } catch (error) {
    console.log(error);
    throw new Error("Refresh Token is not generated");
  }
};

const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (error) {
    console.log(error);
    throw new Error("Invalid Access Token");
  }
};

const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
  } catch (error) {
    console.log(error);
    throw new Error("Invalid Refresh Token");
  }
};

const storeRefreshToken = async (token, userId) => {
  try {
    const newToken = await RefreshToken.create({
      token: token,
      userId: userId,
    });
    return newToken;
  } catch (error) {
    console.log(error);
    throw new Error("failed to store refresh token ");
  }
};

module.exports = {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  storeRefreshToken,
};
