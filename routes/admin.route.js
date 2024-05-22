const express = require("express");
const router = express.Router();

const { signIn,signUp,updateProfile } = require("../controller/admin.controller");
const { verifyAccessTokenMiddleware } = require('../middleware/auth.middleware')

router.post("/signup", signUp);
router.post("/signin",signIn);
router.put("/updateProfile",updateProfile);

module.exports = router;