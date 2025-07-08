import SubSection from '../models/subsection.js';
import User from '../models/user.js'
import AssignmentSubmitted from '../models/assignmentSubmitted.js';
import CourseProgress from '../models/courseProgress.js';
import Streak from '../models/streak.js'

export const addPoints = async (req, res) => {
    try {
        const { correctAns } = req.body;

        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(403).json({
                success: false,
                message: "User is not registered"
            })
        }

        user.points += (5 * correctAns);
        user.save();

        const newPoints = user.points;

        return res.status(201).json({
            success: true,
            message: "points added successfully",
            newPoints
        })
    } catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: "error occured while adding points"
        })
    }
}

export const getAssignment = async (req, res) => {
    try {
        const { subSectionId } = req.params;

        const subSection = await SubSection.findById(subSectionId).populate(
            {
                path: 'assignment',
                populate: {
                    path: 'questions'
                }
            }
        );

        if (!subSection) {
            return res.status(403).json({
                success: false,
                message: "No such subsection exists"
            })
        }

        return res.status(201).json({
            success: true,
            message: "assignment fetched successfully",
            subSection
        })
    } catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: "assignment fetched successfully"
        })
    }
}

export const submitAssignment = async (req, res) => {
    try {
        const { courseId, subSectionId, assignmentId } = req.body;
        const userId = req.user.id;

        const alreadySubmitted = await AssignmentSubmitted.findOne({
            course: courseId,
            user: userId,
            assignment: assignmentId
        })

        console.log("assignment : ", alreadySubmitted);

        if (alreadySubmitted) {
            return res.status(403).json({
                success: false,
                message: "you have already submitted"
            })
        }
        const submitAssignment = AssignmentSubmitted.create({
            course: courseId,
            user: userId,
            assignment: assignmentId
        })

        const subsection = await SubSection.findById(subSectionId);

        if (!subsection) {
            return res.status(403).json({
                success: false,
                message: "invalid subsection"
            })
        }

        let courseProgress = await CourseProgress.findOne({
            courseId: courseId,
            userId: userId
        })

        if (!courseProgress) {
            courseProgress = await CourseProgress.create({
                courseId, userId
            })
        }

        if (courseProgress.completedVideos.includes(subSectionId)) {
            return res.status(400).json({ error: "Subsection already completed" })
        }

        courseProgress.completedVideos.push(subSectionId)

        await courseProgress.save()

        return res.status(200).json({ success: true, message: "Course progress updated" })

    } catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: "error occured"
        })
    }
}

export const isAssignmentSubmitted = async (req, res) => {
    try {
        const userId = req.user.id;
        const { assignmentId, courseId } = req.body;

        console.log(userId, assignmentId, courseId);

        const exist = await AssignmentSubmitted.findOne({
            course: courseId,
            user: userId,
            assignment: assignmentId
        })

        console.log("exist or not : ", exist);

        if (exist) {
            return res.status(201).json({
                success: true,
                message: "assignment done"
            })
        }
        else {
            return res.status(402).json({
                success: false,
                message: "assignment not done"
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: "error occured"
        })
    }
}

export const addStreak = async (req, res) => {
    try {
        const today = new Date();
        const userId = req.user.id;
        const todayDateStr = today.toDateString(); // "Sat May 04 2025"

        const user = await User.findById(userId);

        if(!user.streak){
            const streak = await Streak.create({});

            user.streak = streak._id;
            await user.save()
        }

        const streakId = user.streak._id;
        const streak = await Streak.findById(streakId);

        const lastDate = streak?.lastUpdated ? new Date(streak.lastUpdated).toDateString() : null;

        console.log(lastDate,todayDateStr)

        if (lastDate === todayDateStr) {
            // Already updated today
            return res.status(402).json({
                success:false,
                message:"already updated your streak"
            });
        }

        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();

        if (lastDate === yesterdayStr) {
            // Continuing streak
            streak.count+=1;
        } else {
            // Missed a day -> reset
            streak.count = 1;
        }

        streak.lastUpdated = today;
        await streak.save();

        return res.status(201).json({
            success:true,
            message:"streak updated",
            count:streak.count
        })

    } catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: "error occured"
        })
    }
}