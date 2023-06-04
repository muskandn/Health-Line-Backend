const jwt = require("jsonwebtoken");
const Patient = require("../models/patientModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  console.log(req.headers.authorization)
  console.log("dfsgjkhge")
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
      // req.user = await Patient.findById(decoded._id).select("-password");
      const patient = await Patient.findOne({_id:decoded.id});
      
      if(!patient){History
            throw new Error("User not Found")//this is also not working
        }
      req.patient=patient;
      next();
    } catch (error) {
      // console.log(error)
      res.status(401);
      throw new Error("Not authorized, token failed!!!");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports =  protect ;

// const jwt = require("jsonwebtoken");
// const Patient = require("../models/patientModel");
// const asyncHandler = require("express-async-handler");

// const protect = asyncHandler(async (req, res, next) => {
//   let token;

//   // if (
//   //   req.headers.authorization &&
//   //   req.headers.authorization.startsWith("Bearer")
//   // ) {
//     try {
    
//       token = req.cookies.jwttoken;
//       console.log(token)
//       const decoded = jwt.verify(token, process.env.SECRET_KEY);
//       const patient=await Patient.findOne({_id:decoded._id,"Tokens.token":token});
//       if(!patient){
//         throw new Error('User not Found')
//       }

//       req.token=token;
//       req.patient=patient;
//       req.userID=patient._id;
//       // console.log(decoded)
//       // req.patient = await Patient.findById(decoded._id).select("-password");

//       next();
//     } catch (error) {
//       res.status(401);
//       throw new Error("Not authorized, token failed");
//     }
//   // }

//   if (!token) {
//     res.status(401);
//     throw new Error("Not authorized, no token");
//   }
// });

// module.exports = protect 

;