const Doctor=require("../models/doctorModel")
const bcrypt=require("bcryptjs")
const generateToken = require("../config/generateToken");

module.exports=async(req,res)=>{
    try{

    let token;
       const {email,password}=req.body;

    if(!email||!password){
        return res.status(400).json({message:"please fill all the fields"})
    }

    const loginDoctor=await Doctor.findOne({email:email});
    if(loginDoctor){
        const isMatchP=await bcrypt.compare(password,loginDoctor.password)
        
        if(isMatchP){
            res.json({
            _id: loginDoctor._id,
            name: loginDoctor.name,
            email: loginDoctor.email,
            isAdmin: loginDoctor.isAdmin,
            pic: loginDoctor.pic,
            Who:loginDoctor.Who,
            registrationNo:loginDoctor.registrationNo,
            registrationCouncil:loginDoctor.registrationCouncil,
            registrationYear:loginDoctor.registrationYear,
            degree:loginDoctor.degree,
            institute:loginDoctor.institute,
            YoC:loginDoctor.YoC,
            YoE:loginDoctor.YoE,
            token: generateToken(loginDoctor._id),
    });
        }
        else{
            res.status(400).json({error:"Invalid Credientials",token})
        }

    } 
    else{
            res.status(400).json({error:"Doctor login error"})
    } 
    }
    catch(err){
        console.log(err);
    }
}