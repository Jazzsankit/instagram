const express = require("express");
const { createUser, allUserDetail, updateUserById, deleteUserById, getUserById } = require("../controller/userController");
const userRouter = express.Router();
const multer = require('multer');
const path = require('path');


var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../../Instagram/frontend/instagram/public/images');
     },
    filename: function (req, file, cb) {
        cb(null , Date.now() + path.extname(file.originalname));
    }
});
// D:\My project\Instagram\frontend\instagram\public\images
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
  }
  const upload = multer({ storage: storage, fileFilter: fileFilter });

userRouter.route("/").get(allUserDetail).post(createUser);
userRouter.route("/:uid").get(getUserById).patch(upload.single('user'),updateUserById).delete(deleteUserById);

module.exports = userRouter;


