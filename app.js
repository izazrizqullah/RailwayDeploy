require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const nodemailer = require("nodemailer");
const google = require("googleapis");
const router = require("./routes");

const port = process.env.port || 3000;

app.use(express.json());
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.use(router);

app.listen(port, () => console.log(`running on http://localhost:${port}`));
