const mongoose=require('mongoose')

const chatSchema=new mongoose.Schema({
    chatName:{
        type: String,
        trim: true
    },
    isGroupChat:{
        type: Boolean,
        default: false
    },
    users:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient" || "Doctor",
        }
    ],
    latestMessage:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    },
    groupAdmin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient" ||"Doctor"
    },

},
{
    timestamps: true
})

const Chat=mongoose.model("Chat",chatSchema);
module.exports=Chat;