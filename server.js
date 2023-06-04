const express=require('express');
const connectDB=require("./config/db")
const colors=require("colors")
const chats = require('./data/data');
const dotenv=require('dotenv')
const app=express();

const cookieParser = require("cookie-parser");

app.use(cookieParser());
dotenv.config()
connectDB()

app.use(express.json());

const {chat}=require("./data/data")
const userRoutes=require("./routes/userRoutes")

const chatRoutes=require("./routes/chatRoutes")
const chatRoutesD=require("./routes/chatRoutesD")


const messageRoutes=require("./routes/messageRoutes");
const messageRoutesD=require("./routes/messageRoutesD");


const doctorRoutes=require("./routes/doctorRoutes")
const { Socket } = require('socket.io');

app.get('/',(req,res)=>{
    res.send("home")
})

app.use('/api/user',userRoutes)
app.use('/api/doctor',doctorRoutes)

app.use('/api/chat',chatRoutes)
app.use('/api/chatD',chatRoutesD)

app.use('/api/message',messageRoutes)
app.use('/api/messageD',messageRoutesD)

const port=process.env.PORT||5000;
const server=app.listen(port,()=>{
    console.log(`server running on port ${port}`.yellow.bold)
})

const io=require('socket.io')(server,{
    pingTimeout:60000,
    cors:{
        origin:"http://localhost:3000",
    }
})

io.on("connection",(socket)=>{
    console.log("connected to socket.io")

    socket.on("setup",(userData)=>{
        socket.join(userData._id);
        socket.emit("connected")
    })

    socket.on("join chat",(room)=>{
        socket.join(room);
        console.log("user joined room:"+room)
    })

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) 
    return console.log("chat.users not defined");

    chat.users.forEach((user) => {
    if (user._id == newMessageRecieved.sender._id) return;

    socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
    });

    socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
    });
})