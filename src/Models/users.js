const db = require("../Config/dbConnect");

module.exports = {
  register: (data) => {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO user SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err.sqlMessage);
        }
      });
    });
  },
  updateUser: (id, data) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE user SET ? WHERE user.id = ?",
        [data, id],
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err.sqlMessage);
          }
        }
      );
    });
  },
  getByEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT user.id as userid, user.name, user.email, user.password, user.level, user.is_delete,  user.salt, level.perm_add, level.perm_edit, level.perm_delete FROM user LEFT JOIN level ON user.level = level.id_level WHERE email = ?",
        email,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT id , name, email,level ,img_profile FROM user WHERE id = ?",
        id,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  getAll: (sort, limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT user.id, user.name, user.email, level.name AS levelName, level.perm_add,level.perm_edit, level.perm_delete AS level  FROM user LEFT JOIN level ON user.level = level.id_level WHERE user.is_delete = 0 AND user.level != 1  ORDER BY ${sort} LIMIT ${limit} OFFSET ${offset}`,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  getTotal: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT COUNT(*) AS total FROM user WHERE user.is_delete = 0 AND user.level != 1`,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  updatePermission: (id, type) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE level SET ? WHERE level.name = ?`,
        [type, id],
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err.sqlMessage);
          }
        }
      );
    });
  },
  GetLevel: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT name, id_level,perm_add, perm_edit, perm_delete FROM level WHERE id_level != 1`,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err.sqlMessage);
          }
        }
      );
    });
  },
  GetLevelbyId: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT name, id_level,perm_add, perm_edit, perm_delete FROM level WHERE id = ${id}`,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err.sqlMessage);
          }
        }
      );
    });
  },
  GetUsername: (name) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT name, email FROM user WHERE name = ?`,
        [name],
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err.sqlMessage);
          }
        }
      );
    });
  },
  DeleteUser: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE user SET is_delete = 1 WHERE id = ?",
        [id],
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err.sqlMessage);
          }
        }
      );
    });
  },
};
