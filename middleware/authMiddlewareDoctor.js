const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctorModel");
const asyncHandler = require("express-async-handler");

const protectD = asyncHandler(async (req, res, next) => {
  let token;
  console.log(req.headers.authorization)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log(token)

      const decoded =await jwt.verify(token, process.env.SECRET_KEY);
      console.log(decoded)
      console.log(decoded.id)
      // req.user = await doctor.findById(decoded._id).select("-password");
      const doctor = await Doctor.findOne({_id:decoded.id});
      
      if(!doctor){
            throw new Error("User not Found")//this is also not working
        }
      req.doctor=doctor;
      
      next();
    } catch (error) {
      // console.log(error)
      res.status(401);
      throw new Error("Not authorized, token failed for Doctor!!!");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token for Doctor");
  }
});

module.exports =  protectD ;


;