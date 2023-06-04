const express=require("express")
const router = express.Router();
// const router=express.Router()

const {registerDoctor,allDoctors }= require ("../controllers/registerDoctor")

const Login=require("../controllers/loginDoctor")
const protectD=require("../middleware/authMiddlewareDoctor")

// router.route('/');

// router.route('/login').post(Login)
// router.route('/').post(Signup).get(protect,allUsers);

// module.exports=router



// router.route("/").get(protect, allUsers);
// router.route("/").post(registerUser);
// router.get("/",protect, allUsers);
router.post("/login", Login);
router.post("/",registerDoctor);
router.get("/", protectD, allDoctors);
module.exports = router;