import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    statement:{
        type:String,
    },
    option1:{
        type:String,
    },
    option2:{
        type:String,
    },
    option3:{
        type:String,
    },
    option4:{
        type:String,
    },
    correctAns:{
        type:String
    }
})

export default mongoose.model("Question",questionSchema)