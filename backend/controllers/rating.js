import Course from '../models/course.js';
import Rating from '../models/rating.js'

export const rateCourse = async(req,res)=>{
    try{
        const {courseId,rating,review} = req.body;

        const userId = req.user.id;

        const course = await Course.find({_id:courseId});

        if(!course){
            return res.status(404).json({
                success:false,
                message:"course does not exist"
            })
        }

        const newRating = await Rating.create({
            user:userId,
            course:courseId,
            rating,
            review
        })

        return res.status(201).json({
            success:true,
            message:"you have successfully rated the course",
            newRating
        })
    } catch(error){
        console.log(error);
        return res.status(501).json({
            success:false,
            message:"error occured"
        })
    }
}

export const getAllRating = async(req,res)=>{
    try{
        const allRatings = await Rating.find({}).sort({rating:"desc"})
            .populate({
                path:"user",
                select:"firstName lastName email image"
            }).populate({
                path:"course",
                select:"courseName"
            }).exec();

            return res.status(201).json({
                success:true,
                data:allRatings
            })

    } catch(error){
        console.log(error);
        return res.status(501).json({
            success:false,
            message:"error occured while fetching ratings"
        })
    }
}