const express = require("express");
const user = require("../Controllers/user");
const router = express.Router();
const Auth = require("../Helpers/auth");
const multer = require("multer");

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/Public/image");
    // console.log(file);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.all("/*", Auth.authInfo);
router.post("/register/", upload.single("profile"), user.register);
router.post("/updateUser/:id", upload.single("profile"), user.updateUser);
router.post("/login/", user.login);
router.get("/getus/:id", user.getUser);
router.get("/checkTok/:token", Auth.accesstoken);

module.exports = router;
