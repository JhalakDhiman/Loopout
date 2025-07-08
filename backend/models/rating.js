import mongoose from "mongoose";

const ratingAndReviewSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    rating:{
        type:Number,
        trim:true,
    },
    review:{
        type:String,
        trim:true,
    },
    course: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Course",
		index: true,
	},
})

export default mongoose.model("Rating",ratingAndReviewSchema);