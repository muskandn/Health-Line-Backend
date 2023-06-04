require("../config/db")
const express=require("express")
const Doctor=require("../models/doctorModel")
const asyncHandler = require("express-async-handler");

const generateToken = require("../config/generateToken");
const cloudinary=require("../config/cloudinary");

const allDoctors= asyncHandler(async(req,res)=>{
    const keyword=req.query.search?{
        $or:[
            {name:{$regex:req.query.search,$options:"i"}},
            {email:{$regex:req.query.search,$options:"i"}}
        ]
    }:{};
    
    const doctors=await Doctor.find(keyword).find({_id:{$ne:req.doctor._id}})
    res.send(doctors);
    // const keyword=req.query.search;
    // console.log(keyword);
})

const registerDoctor = asyncHandler(async (req, res)=>{
    const {name,password,Cpassword,phoneno,email,gender,pic, city,age,aadhaarno,registrationNo,registrationCouncil,registrationYear,degree,institute,YoC,YoE}=req.body

    if(!name||!password||!Cpassword||!phoneno||!email||!gender||!city||!age||!aadhaarno||!registrationNo||!registrationCouncil||!registrationYear||!degree||!institute||!YoC||!YoE){
        return res.status(400).json({message:"Please fill allllll the fields"})
    }
    try{

        // const image=await cloudinary.uploader.upload(pic,{
        //     folder: "products"
        // })
        console.log(name)

        const DoctorEmail=await Doctor.findOne({email:email});
    
        if(DoctorEmail){
            return res.status(400).json({message:"User already exists"})
        }

        // const token=generateAuthToken();

        const doctor=new Doctor({
            name, 
            password,
            Cpassword,
            phoneno,
            email,
            gender, 
            pic,
            city,
            age,
            aadhaarno,
            registrationNo,
            registrationCouncil,
            registrationYear,
            degree,
            institute,
            YoC,
            YoE
        });

        await doctor.save();

        if (doctor) {
        res.status(201).json({
            _id: doctor._id,
            name: doctor.name,
            email: doctor.email,
            isAdmin: doctor.isAdmin,
            pic: doctor.pic,
            token: generateToken(doctor._id),///new extra from github-------------------------------------------------------------
        });
    }}
    catch(err){
        console.log(err)
    }
    
    
});

module.exports = { allDoctors, registerDoctor}