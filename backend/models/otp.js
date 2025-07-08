import mongoose from "mongoose";
import { mailSender } from "../utils/mailSender.js";

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        trim:true,
    },
    otp:{
        type:Number,
        trim:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expired:5*60
    }
})

const sendVerificationEmail = async(email,otp)=>{
    try{
        const mailResponse = await mailSender(email,"Verification Email from StudyApp",otp);
        console.log(mailResponse);
    } catch(error){
        console.log("Error coming while sending mail : ",error);
    }
}

otpSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
})

export default mongoose.model("OTP",otpSchema)