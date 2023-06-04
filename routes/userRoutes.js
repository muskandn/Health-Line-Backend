const express=require("express")
const router = express.Router();
// const router=express.Router()


const {registerUser,allUsers}=require("../controllers/registerPatient")
const Login=require("../controllers/loginPatient")
const protect=require("../middleware/authMiddleware")

// router.route('/');

// router.route('/login').post(Login)
// router.route('/').post(Signup).get(protect,allUsers);

// module.exports=router



// router.route("/").get(protect, allUsers);
// router.route("/").post(registerUser);
// router.get("/",protect, allUsers);
router.post("/login", Login);
router.post("/",registerUser);
router.get("/", protect, allUsers);
module.exports = router;