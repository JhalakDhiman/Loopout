import mongoose from "mongoose";

export const assignmentSubmittedSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    assignment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Assignment"
    }
})

export default mongoose.model("AssignmentSubmitted",assignmentSubmittedSchema);