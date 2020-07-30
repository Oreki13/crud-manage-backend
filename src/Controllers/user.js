const userModels = require("../Models/users");
const jwt = require("jsonwebtoken");
const MiscHelper = require("../Helpers/helpers");
const helper = require("../Helpers/formResponse");

module.exports = {
  login: (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    userModels
      .getByEmail(email)
      .then((result) => {
        const dataUser = result[0];

        if (dataUser !== undefined) {
          console.log(dataUser);
          const usePassword = MiscHelper.setPassword(password, dataUser.salt)
            .passwordHash;

          if (dataUser.password === usePassword) {
            dataUser.token = jwt.sign(
              {
                userid: dataUser.userid,
                level: dataUser.level,
                perm_edit: dataUser.perm_edit,
                perm_add: dataUser.perm_add,
                perm_delete: dataUser.perm_delete,
              },
              process.env.SECRET_KEY,
              { expiresIn: "2m" }
            );

            delete dataUser.salt;
            delete dataUser.password;

            return MiscHelper.response(res, dataUser, 200);
          } else {
            return MiscHelper.response(res, "Wrong Password!", 200, true);
          }
        } else {
          return MiscHelper.response(res, "User Not Found!", 200, true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  register: (req, res) => {
    const salt = MiscHelper.generateSalt(18);
    const passwordHash = MiscHelper.setPassword(req.body.password, salt);
    // const type = req.body.type;
    // const values = req.body.values;
    const image = req.file ? req.file.filename : "default.png";
    console.log(image);

    const data = {
      name: req.body.name,
      email: req.body.email,
      password: passwordHash.passwordHash,
      salt: passwordHash.salt,
      level: req.body.level,
      img_profile: "public/image/" + image,
      is_delete: "0",
      token: "slur",
    };

    console.log(data);
    userModels
      .getByEmail(data.email)
      .then((result) => {
        // console.log(result[0]);
        if (result[0]) {
          return MiscHelper.response(res, "email", 200, true);
        } else {
          userModels
            .GetUsername(data.name)
            .then((ress) => {
              if (ress[0]) {
                return MiscHelper.response(res, "name", 200, true);
              } else {
                userModels
                  .register(data)
                  .then((resultRegister) => {
                    MiscHelper.response(res, resultRegister, 200);
                  })
                  .catch((error) => {
                    console.log(error);
                    helper.sql(res, error);
                  });
              }
            })
            .catch((e) => console.log(e));
        }
        return;
      })
      .catch((e) => console.log(e));
  },
  updateUser: (req, res) => {
    const id = req.params.id;

    userModels
      .getById(id)
      .then((respon) => {
        if (!respon[0]) {
          return MiscHelper.response(res, "User Not Found", 200, true);
        }
        if (req.body.name) {
          userModels
            .GetUsername(req.body.name)
            .then((ress) => {
              if (ress[0]) {
                return MiscHelper.response(res, "name", 200, true);
              }
            })
            .catch((e) => console.log(e));
        }
        if (req.body.email) {
          userModels
            .getByEmail(req.body.email)
            .then((result) => {
              // console.log(result[0]);
              if (result[0]) {
                return MiscHelper.response(res, "email", 200, true);
              }
            })
            .catch((e) => console.log(e));
        }

        const data = {
          name: req.body.name || respon[0].name,
          email: req.body.email || respon[0].email,

          level: req.body.level || respon[0].level,
          img_profile: req.file
            ? "public/image/" + req.file.filename
            : respon[0].img_profile,
        };

        userModels
          .updateUser(id, data)
          .then((resultRegister) => {
            MiscHelper.response(res, resultRegister, 200);
          })
          .catch((error) => {
            console.log(error);
            helper.sql(res, error);
          });
      })
      .catch((e) => console.log(e));
  },
  getUser: (req, res) => {
    const idUser = req.params.id;
    userModels
      .getById(idUser)
      .then((result) => {
        MiscHelper.response(res, result[0], 200);
      })
      .catch((err) => console.log(err));
  },
  getAll: (req, res) => {
    const sort = req.params.sort;
    const sorting = "user." + sort;
    const limit = 5;
    const offset = (req.params.page - 1) * limit;
    console.log(sorting);
    userModels
      .getAll(sorting, limit, offset)
      .then((result) => {
        userModels.getTotal().then((restotal) => {
          const total = Math.ceil(restotal[0].total / 5);
          return MiscHelper.responsePaginate(res, result, 200, total, false);
        });
      })
      .catch((err) => console.log(err));
  },
  updatePermission: (req, res) => {
    const id = req.body.name;

    const data = {
      perm_add: req.body.add,
      perm_edit: req.body.edit,
      perm_delete: req.body.delete,
    };

    userModels
      .updatePermission(id, data)
      .then((result) => {
        MiscHelper.response(res, result, 200);
      })
      .catch((err) => console.log(err));
  },
  deleteUser: (req, res) => {
    const id = req.params.id;
    userModels
      .DeleteUser(id)
      .then((result) => {
        MiscHelper.response(res, { id: id }, 200);
      })
      .catch((err) => console.log(err));
  },
  getUserTok: (req, res) => {
    const idUser = req.headers["x-control-user"];
    userModels
      .getById(idUser)
      .then((result) => {
        MiscHelper.response(res, result[0], 200);
      })
      .catch((err) => console.log(err));
  },
  getLevel: (req, res) => {
    userModels
      .GetLevel()
      .then((result) => {
        MiscHelper.response(res, result, 200, false);
      })
      .catch((err) => console.log(err));
  },
  getLevelById: (req, res) => {
    const id = req.params.id;

    userModels
      .GetLevelbyId(id)
      .then((result) => {
        MiscHelper.response(res, result[0], 200, false);
      })
      .catch((err) => console.log(err));
  },
};
