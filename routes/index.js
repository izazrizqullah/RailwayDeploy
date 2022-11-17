const express = require("express");
const router = express.Router();
const c = require("../controller");

router.post("/create/user", c.user.create);
router.put("/forgot-password", c.user.forgotPassword);
router.get("/reset-password", c.user.resetPassword);

module.exports = router;
