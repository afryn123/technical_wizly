const multer = require("multer");
const uploadUser = require("../Utils/multer").uploadUser;

const handleUploadImage = (req, res, next) => {
  uploadUser(req, res, function (err) {
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
