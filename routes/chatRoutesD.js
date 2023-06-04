const express=require("express")
const protectD =require("../middleware/authMiddlewareDoctor")
const router=express.Router()


const {accessChat,fetchChats,createGroupChat,renameGroup,removeFromGroup,addToGroup}=require("../controllers/chatControllersD")

router.route('/').post(protectD,accessChat);
router.route('/').get(protectD,fetchChats);

router.route('/group').post(protectD,createGroupChat);
router.route('/rename').put(protectD,renameGroup);
router.route('/groupremove').put(protectD,removeFromGroup);
router.route('/groupadd').put(protectD,addToGroup);

module.exports=router;