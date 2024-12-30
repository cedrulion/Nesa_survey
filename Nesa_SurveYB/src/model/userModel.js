const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    nID:{
        type:String,
        required:true 
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    role:{
        type:String,
        default:"EDUCATOR",
        enum:["EDUCATOR","ADMIN"]
    },
    password:{
        type:String,
        required:true
    }
    
})


const User = mongoose.model('User', userSchema);

module.exports = User;