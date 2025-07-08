import mongoose from "mongoose";

const subSectionSchema =new mongoose.Schema({
    title:{
        type:String,
    },
    timeDuration:{
        type:String,
    },
    description:{
        type:String,
    },
    videoUrl:{
        type:String,
    },
    assignment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Assignment"
    }

})
export default mongoose.model("SubSection",subSectionSchema);