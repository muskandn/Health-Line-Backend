const mongoose=require("mongoose")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const patientSchema=new mongoose.Schema({
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
        require: true,
        unique: true,
        index:true, 
        sparse:true
    },
    gender:{
        type: String,
        require: true
    },
    pic:{
        type:String,
        default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        // public_id:{
        //     type: String,
        //     required: true
        // },
        // url:{
        //     type: String,
        //     required: true
        // }
    },
    city:{
        type: String,
        require: true
    },
    age:{
        type: String,
        require: true
    },
    aadhaarNo:{
        type:String,
        require: true
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    Who:{
        type: String,
        require: true,
        default:"Patient"
    }
    // Tokens:[
    //     {
    //         token:{
    //             type:String,
    //             require: true
    //         }
    //     }
    // ]
},{
    timestamps: true
})

patientSchema.pre('save',async function(next){
    // console.log("inside");
    if(this.isModified('password')){//field name should be exactly same
        // console.log("ininside");
        this.password=await bcrypt.hash(this.password,12)
        this.Cpassword=await bcrypt.hash(this.Cpassword,12)//must hv to use await
    }
    next()
})

// patientSchema.methods.generateAuthToken=async function(){
//     try{
//         let tokenN=jwt.sign({_id:this._id},process.env.SECRET_KEY,{
//             expiresIn:"30d",
//         })
//         this.Tokens=this.Tokens.concat({token:tokenN});
//         await this.save();
//         return tokenN;
    
//     }catch(err){
//         console.log(err)
//     }
// }



const Patient=mongoose.model("Patient",patientSchema);

module.exports=Patient;