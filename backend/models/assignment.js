import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    subSectionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubSection"
    },
    totalQues:{
        type:Number
    },
    questions:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Question"
        }
    ]
})

export default mongoose.model("Assignment",assignmentSchema);