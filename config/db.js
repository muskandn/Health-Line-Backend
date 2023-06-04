const mongoose=require("mongoose")
// const DB=process.env.DB;
const connDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.DB,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        });
        if(conn){
           console.log(`Database connected: ${conn.connection.host}`.cyan.underline); 
        }
        
    }catch(err){
        console.log(`err: ${err.message}`.red.bold);
    }
}

module.exports=connDB