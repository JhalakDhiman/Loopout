import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
    sectionName:{
        type:String,
        required:true,
    },
    subSections:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"SubSection"
        }
    ]
})

export default mongoose.model("Section",sectionSchema)