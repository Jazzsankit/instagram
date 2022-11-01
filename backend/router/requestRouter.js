const express = require("express");
const { sendRequest, cancelRequest, pendingRequest, acceptRequest, getFollowers, getFollowings, unfollow } = require("../controller/requestController");
const requestRouter = express.Router();

requestRouter.route("/").post(sendRequest).delete(cancelRequest)
requestRouter.route("/:uid").get(pendingRequest);
requestRouter.route("/accept").post(acceptRequest);
requestRouter.route("/getFollowers/:uid").get(getFollowers);
requestRouter.route("/getFollowing/:uid").get(getFollowings);
requestRouter.route("/unfollow").post(unfollow);
requestRouter.route("/suggestion").get();

module.exports = requestRouter;
