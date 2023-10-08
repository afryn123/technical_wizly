const multer = require("multer");
const { uploadFoodAndDrink } = require("../Utils/multer");

const handleUploadImage = (req, res, next) => {
  uploadFoodAndDrink(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(403)
        .json({ success: false, statusCode: 401, message: err.message });
    } else if (err) {
      res
        .status(403)
        .json({ success: false, statusCode: 401, message: err.message });
      return;
    }
    // Everything went fine.
    next();
  });
};

module.exports = { handleUploadImage };
