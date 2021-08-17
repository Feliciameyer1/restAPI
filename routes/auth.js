const express = require("express");
const router = express.Router();

const authController = require('../controllers/authController');
const passportJWT = require("../middleware/passport.jwt")();
const {isEmail,hasPassword,hasName} = require("../validations/validator");

router.post("/login", authController.login);
router.post("/signup",[isEmail,hasPassword,hasName], authController.signup);
router.get("/me",passportJWT.authenticate(),authController.me);

module.exports= router;