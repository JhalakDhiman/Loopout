import mongoose from "mongoose";

const courseProgressSchema = new mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    completedVideos:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubSection"
        }
    ]
})

export default mongoose.model("CourseProgress",courseProgressSchema);