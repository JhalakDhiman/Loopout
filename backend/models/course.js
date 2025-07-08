import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        required:true,
    },
    courseDescription:{
        type:String,
        required:true,
    },
    whatYouWillLearn: {
      type: String,
    },
    instructor:{
        type:String,
        required:true,
    },
    sections:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section"
        }
    ],  
    ratingAndReviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Rating"
        }
    ],
    studentsEnrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
})

export default mongoose.model("Course",courseSchema);