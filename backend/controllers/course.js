import Assignment from "../models/assignment.js";
import Course from "../models/course.js";
import Question from "../models/question.js";
import SubSection from '../models/subsection.js';
import User from '../models/user.js'
import Section from '../models/section.js'
import CourseProgress from "../models/courseProgress.js";

export const addCourse = async (req, res) => {
    try {
        const courseName = "DSA";
        const courseDescription = "hello";
        const instructor = "Love babbar";
        await Course.create({
            courseName,
            courseDescription,
            instructor
        });

        return res.status(201).json({
            success: true,
            message: "course addes successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: "error occurres"
        })
    }
}

export const addQuestion = async (req, res) => {
    try {
        const statement = "Which funtion is used to check length of an array ? ";
        const option1 = "length()";
        const sectionName = "hello lect";
        const option2 = "size()";
        const option3 = "length()";
        const option4 = "length()";

        await SubSection.create({
            sectionName,
            statement,
            option1,
            option2,
            option3,
            option4
        })

        return res.status(201).json({
            success: true,
            message: "assignment aded successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: "unable to add assignment"
        })
    }
}

export const getAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find({});
        return res.status(201).json({
            success: true,
            message: "all courses fetched successfully",
            courses: allCourses
        })
    } catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: "error occcured in fetching all courses"
        })
    }
}

export const getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.params;

        const courseDetails = await Course.findOne({
            _id: courseId,
        }).populate({
            path: "sections",
            populate: {
                path: "subSections",
            }
        }).exec();

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "course not found",
            })
        }

        return res.status(201).json({
            success: true,
            message: "course details fetche  d succesfully",
            courseDetails
        })
    } catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: "error occured in fetching course details"
        })
    }
}

export const getCourseProgress = async(req,res)=>{
    try{
        const {courseId} = req.params;
        const userId = req.user.id;

        let courseProgressCount = await CourseProgress.findOne({
            courseId,
            userId
        })

        let course = await Course.findById(courseId).populate('sections');

        console.log("course : ",course);

        let subSectionLength = 0;
        for(var j=0;j<course.sections.length;j++){
            subSectionLength+=course.sections[j].subSections.length;
        }

        courseProgressCount = courseProgressCount?courseProgressCount.completedVideos.length:0;
        let progressPercentage;

        if (subSectionLength === 0) {
            progressPercentage = 100
          } else {
            // To make it up to 2 decimal point
            const multiplier = Math.pow(10, 2)
            progressPercentage =  Math.round(
                (courseProgressCount / subSectionLength) * 100 * multiplier
              ) / multiplier
          }

          return res.status(200).json({
            success: true,
            progressPercentage
          })
    } catch(error){
        console.log(error);
        return res.status(501).json({
            success:false,
            message:"error occured"
        })
    }
}

