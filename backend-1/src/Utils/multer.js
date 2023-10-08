const multer = require("multer");
const fileStorageUser = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/Images/User");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const fileStorageFood = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/Images/FoodAndDrink");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadUser = multer({
  storage: fileStorageUser,
  fileFilter: fileFilter,
}).single("user_image");

const uploadFoodAndDrink = multer({
  storage: fileStorageFood,
  fileFilter: fileFilter,
}).single("food_images");

module.exports = {
  uploadUser,
  uploadFoodAndDrink,
};
