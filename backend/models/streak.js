import mongoose from "mongoose";

const streakSchema = new mongoose.Schema({
    count:{
        type:Number,
        default:0
    },
    lastUpdated:{
        type:Date,
        default:null
    }
})

export default mongoose.model("Streak",streakSchema);