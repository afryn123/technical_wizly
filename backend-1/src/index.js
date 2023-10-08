const express = require("express");
const cors = require("cors");
const { uploadUser, uploadFoodAndDrink } = require("./Utils/multer");
const multer = require("multer");
const authRouter = require("./Routes/authRoute");
const recipeRouter = require("./Routes/recipeRoute");
const commentRouter = require("./Routes/commentRaute");
const path = require("path");

require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
const port = process.env.SERVER_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(authRouter);
app.use(
  "/api/images/user",
  express.static(path.join(__dirname, "./Images/User"))
);
app.use(
  "/api/images/fooddrink",
  express.static(path.join(__dirname, "./Images/FoodAndDrink"))
);
app.use(recipeRouter);
app.use(commentRouter);
app.use(uploadUser);
app.use(uploadFoodAndDrink);
// app.use(upload.single());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
