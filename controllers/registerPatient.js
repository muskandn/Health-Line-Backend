require("../config/db")
const express=require("express")
const Patient=require("../models/patientModel")
const asyncHandler = require("express-async-handler");

const generateToken = require("../config/generateToken");
const cloudinary=require("../config/cloudinary");

const allUsers= asyncHandler(async(req,res)=>{
    const keyword=req.query.search?{
        $or:[
            {name:{$regex:req.query.search,$options:"i"}},
            {email:{$regex:req.query.search,$options:"i"}}
        ]
    }:{};
    // console.log("hiiiiiiiiiii i m here")
    const patients=await Patient.find(keyword).find({_id:{$ne:req.patient._id}})
    res.send(patients);
    // const keyword=req.query.search;
    // console.log(keyword);
})

const registerUser = asyncHandler(async (req, res)=>{
    const {name, password,Cpassword,phoneno,email,gender,pic, city,age,aadhaarNo }=req.body

    if(!name||!password||!Cpassword||!phoneno||!email||!gender||!city||!age||!aadhaarNo){
        return res.status(400).json({message:"Please fill allllll the fields"})
    }
    try{

        // const image=await cloudinary.uploader.upload(pic,{
        //     folder: "products"
        // })

        const PatientEmail=await Patient.findOne({email:email});
    
        if(PatientEmail){
            return res.status(400).json({message:"User already exists"})
        }

        // const token=generateAuthToken();

        const patient=new Patient({
            name, 
            password,
            Cpassword,
            phoneno,
            email,
            gender,
            pic, 
            city,
            age,
            aadhaarNo
        });

        await patient.save();

        if (patient) {
        res.status(201).json({
            _id: patient._id,
            name: patient.name,
            email: patient.email,
            isAdmin: patient.isAdmin,
            pic: patient.pic,
            token: generateToken(patient._id),///new extra from github-------------------------------------------------------------
        });
    }}
    catch(err){
        console.log(err)
    }
    
    
});

module.exports = { allUsers, registerUser}