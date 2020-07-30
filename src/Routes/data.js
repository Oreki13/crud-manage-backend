const express = require("express");
const user = require("../Controllers/user");
const router = express.Router();
const Auth = require("../Helpers/auth");

router.all("/*", Auth.authInfo);
router.get("/getAll/:sort/:page", user.getAll);
router.post("/updatePerm", user.updatePermission);

router.get("/deleted/:id", user.deleteUser);
router.get("/level", user.getLevel);
router.get("/level/:id", user.getLevelById);

module.exports = router;
