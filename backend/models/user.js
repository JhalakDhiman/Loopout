import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
    ],
    image:{
        type:String,
        required:true
    },
    points:{
        type:Number,
        default:0
    },
    streak:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Streak"
    }
})

export default mongoose.model("User",userSchema);