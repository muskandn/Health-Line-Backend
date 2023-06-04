
const express = require("express");
const {allMessages,sendMessage}= require("../controllers/messageControllersD");
const  protectD  = require("../middleware/authMiddlewareDoctor");

const router = express.Router();

router.route("/:chatId").get(protectD, allMessages);
router.route("/").post(protectD, sendMessage);

module.exports = router;