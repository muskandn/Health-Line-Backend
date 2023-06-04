const Patient=require("../models/patientModel")
const bcrypt=require("bcryptjs")
const generateToken = require("../config/generateToken");

module.exports=async(req,res)=>{
    /////// by me using thapa technical-------------------------------------------------------------------
    // try{

    //     let token;
    //    const {email,password}=req.body;

    // if(!email||!password){
    //     return res.status(400).json({message:"please fill all the fields"})
    // }

    // const loginPatient=await Patient.findOne({email:email});
    // if(loginPatient){
    //     const isMatchP=await bcrypt.compare(password,loginPatient.password)
    //     token=await loginPatient.generateAuthToken();
    //     console.log(token);

    //     res.cookie("jwttoken",token,{
    //         expires: new Date(Date.now()+25892000000),
    //         httpOnly: true
    //     })


    //     if(isMatchP){
    //         res.json("Login successfully completed");
    //     }
    //     else{
    //         res.status(400).json({error:"Invalid Credientials",token})
    //     }

    try{

        let token;
       const {email,password}=req.body;

    if(!email||!password){
        return res.status(400).json({message:"please fill all the fields"})
    }

    const loginPatient=await Patient.findOne({email:email});
    if(loginPatient){
        const isMatchP=await bcrypt.compare(password,loginPatient.password)
        
        if(isMatchP){
            res.json({
            _id: loginPatient._id,
            name: loginPatient.name,
            email: loginPatient.email,
            isAdmin: loginPatient.isAdmin,
            Who:loginPatient.Who,
            pic: loginPatient.pic,
            token: generateToken(loginPatient._id),
    });
        }
        else{
            res.status(400).json({error:"Invalid Credientials",token})
        }

    } 
    else{
            res.status(400).json({error:"Patient login error"})
    } 
    }
    catch(err){
        console.log(err);
    }
}