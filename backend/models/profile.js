import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    dateOfBirth:{
        type:String,
    },
    gender:{
        type:String,
    },
    about:{
        type:String,
    },
    contactNumber:{
        type:Number,
    }
})

export default mongoose.model("Profile",profileSchema);