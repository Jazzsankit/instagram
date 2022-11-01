const express = require("express");
const { createPost, allPostDetails, upatePostById, deletePostById, getPostById } = require("../controller/postController");
const postRouter = express.Router();
const multer = require('multer')
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

postRouter.route("/").get(allPostDetails).post(upload.single('post'),createPost).patch(upatePostById);
postRouter.route("/:pid").get(getPostById).delete(deletePostById);

module.exports = postRouter;