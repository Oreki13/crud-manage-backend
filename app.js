// const dotenv = require ('dotenv'); //import
// dotenv.config (); // make variabel yang ada di file .env
require("dotenv").config(); //metode ke 2 untuk make dotenv
const express = require("express"); //import
const logger = require("morgan");
const bodyParser = require("body-parser");
const Helmet = require("helmet");
const xss = require("x-xss-protection");
const cors = require("cors");
const path = require("path");

const rootRouter = require("./src/Routes/root");

const app = express();
const port = process.env.PORT || 8080;
const nodeEnv = process.env.NODE_ENV || "Production";

app.listen(port, () => {
  console.log(`Server is running in ${nodeEnv} Mode on port ${port}`);
});

app.use(logger("dev"));
app.use(cors());
app.use(Helmet());
app.use(xss());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use("/public", express.static(path.join(__dirname, "src/public")));
app.use("/", rootRouter);

module.exports = app;
