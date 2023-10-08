const { User } = require("../Models");

const Create = (value) => User.create(value);

const getAllUser = async () => {
  try {
    const user = await User.findAll();
    return user;
  } catch (err) {
    throw err;
  }
};

const getById = (id) =>
  User.findOne({
    attributes: ["id", "name", "email", "user_image"],
    where: { id },
  });
const getByEmail = (email) =>
  User.findOne({
    attributes: ["id", "name", "email", "user_image", "password"],
    where: { email },
  });
const getPasswordByEmail = (email) =>
  User.findOne({
    attributes: ["password"],
    where: { email },
  });
const Update = (id, value) => User.update(value, { where: { id } });
const Delete = (id) => User.destroy({ where: { id } });

module.exports = {
  Create,
  getByEmail,
  getById,
  getPasswordByEmail,
  Update,
  Delete,
  getAllUser,
};
