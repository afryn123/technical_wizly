const service = require("../Services/userService");
const { checkPassword, createToken } = require("../Utils/Auth");
const bcrypt = require("bcrypt");
const {
  validateRegister,
  validateUpdate,
  validateLogin,
} = require("../Validations/userValidation.js");
let salt = bcrypt.genSaltSync(10);

const userLogin = async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) {
    res.status(422).json({
      status: false,
      statusCode: 422,
      message: error.details[0].message,
    });
    return;
  }

  const user = await service.getByEmail(req.body.email);
  if (!user) {
    res.status(404).json({
      success: false,
      statusCode: 404,
      message: "User not found",
    });
    return;
  }

  const isValid = await checkPassword(user.password, req.body.password);

  if (!isValid) {
    res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Invalid Password",
    });
    return;
  }

  const { id, name, email } = user;
  const token = createToken({
    id,
    name,
    email,
  });
  res.status(201).json({
    success: true,
    statusCode: 200,
    data: { token },
  });
};

const getMyProfile = async (req, res) => {
  const { id } = req.params;
  const user = await service.getById(id);
  if (!user) {
    res.status(404).json({
      success: false,
      statusCode: 404,
      message: "user not found",
    });
    return;
  }
  res.status(200).json({
    success: true,
    statusCode: 200,
    data: user,
  });
};

const userRegister = async (req, res) => {
  const user = await service.getByEmail(req.body.email);
  if (user) {
    res.status(403).json({
      status: "error",
      statusCode: 403,
      message: "email already exist",
    });
    return;
  }

  const { error } = validateRegister(req.body);
  if (error) {
    res.status(422).json({
      status: false,
      statusCode: 422,
      message: error.details[0].message,
    });
    return;
  }
  let { name, email, password } = req.body;
  const user_image = req.file?.filename;
  password = bcrypt.hashSync(req.body.password, salt);
  const newUsers = {
    name,
    email,
    user_image,
    password,
  };
  service
    .Create(newUsers)
    .then(() => {
      res.status(201).json({
        status: "success",
        statusCode: 201,
        message: "User registered successfully",
      });
    })
    .catch((err) => {
      res.status(422).json({
        status: "error",
        statusCode: 422,
        message: err.message,
      });
    });
};

const userUpdate = async (req, res) => {
  let updateUser;
  const { name, email } = req.body;
  const { id } = req.params;
  const myData = await service.getById(id);
  if (!myData) {
    res.status(404).json({
      success: false,
      statusCode: 404,
      message: "user not found",
    });
    return;
  }

  if (email !== myData.email) {
    const user = await service.getByEmail(req.body.email);
    if (user) {
      res.status(403).json({
        status: "error",
        statusCode: 403,
        message: "email already exist",
      });
      return;
    }
  }

  const user_image = req.file?.filename;
  if (user_image) {
    updateUser = {
      name,
      email,
      user_image,
    };
  } else {
    updateUser = {
      name,
      email,
    };
  }

  const { error } = validateUpdate(updateUser);
  if (error) {
    res.status(422).json({
      status: false,
      statusCode: 422,
      message: error.details[0].message,
    });
    return;
  }

  service
    .Update(id, updateUser)
    .then(() => {
      res.status(201).json({
        success: true,
        statusCode: 201,
        message: "User updated successfully",
      });
    })
    .catch((err) => {
      res.status(422).json({
        success,
        statusCode: 422,
        message: err.message,
      });
    });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const myData = await service.getById(id);
  if (!myData) {
    res.status(404).json({
      success: false,
      statusCode: 404,
      message: "user not found",
    });
    return;
  }
  service
    .Delete(id)
    .then(() => {
      res.status(201).json({
        success: true,
        statusCode: 201,
        message: "User deleted successfully",
      });
    })
    .catch((err) => {
      res.status(422).json({
        success: false,
        statusCode: 422,
        message: err.message,
      });
    });
};

module.exports = {
  userRegister,
  userUpdate,
  getMyProfile,
  userLogin,
  deleteUser,
};
