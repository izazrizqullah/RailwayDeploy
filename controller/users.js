const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SIGNATURE_KEY } = process.env;
const { sendEmail } = require("../helpers");

module.exports = {
  create: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const check = await User.findOne({
        where: { email },
      });

      if (check) {
        return res.status(409).json({
          status: false,
          message: "email already used!",
          data: null,
        });
      }

      const encryptedPassword = await bcrypt.hash(password, 10);

      const created = await User.create({
        email,
        password: encryptedPassword,
      });

      return res.status(201).json({
        status: true,
        message: "create data successful!",
        data: created,
      });
    } catch (err) {
      next(err);
    }
  },
  forgotPassword: async (req, res, next) => {
    try {
      const { email } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({
          status: false,
          message: "email not found!",
          data: null,
        });
      }

      const token = jwt.sign({ id: user._id }, JWT_SIGNATURE_KEY);

      await User.update({ resetpassword: token }, { where: { email } });

      await sendEmail(
        "hi.jazerrr@gmail.com",
        "Link reset password",
        `<p>silahkan klik link dibawah ini untuk reset password</p>
      <p>${process.env.GOOGLE_REDIRECT_URI}/reset-password?=${token}</p>`
      );

      return res.status(200).json({
        status: true,
        message: "link message berhasil terkirim",
      });
    } catch (err) {
      console.log(err);
    }
  },
  resetPassword: async (req, res, next) => {
    return res.render("formReset");
  },
};
