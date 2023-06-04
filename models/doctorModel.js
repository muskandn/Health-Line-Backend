const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const doctorSchema=new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    Cpassword:{
        type: String,
        require: true
    },
    phoneno:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    gender:{
        type: String,
        require: true
    },
    pic:{
        type:String,
        default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    city:{
        type: String,
        require: true
    },
    age:{
        type: String,
        require: true
    },
    aadhaarno:{
        type: String,
        require: true
    },
    registrationNo:{
        type: String,
        require: true
    },
    registrationCouncil:{
        type: String,
        require: true
    },
    registrationYear:{
        type: String,
        require: true
    },
    degree:{
        type: String,
        require: true
    },
    institute:{
        type: String,
        require: true
    },
    YoC:{
        type: String,
        require: true
    },
    YoE:{
        type: String,
        require: true
    },
    Who:{
        type: String,
        require: true,
        default:"Doctor"
    }
})

doctorSchema.pre('save',async function(next){
    // console.log("inside");
    if(this.isModified('password')){//field name should be exactly same
        // console.log("ininside");
        this.password=await bcrypt.hash(this.password,12)
        this.Cpassword=await bcrypt.hash(this.Cpassword,12)//must hv to use await
    }
    next()
})

const Doctor=mongoose.model("Doctor",doctorSchema);
module.exports=Doctor;