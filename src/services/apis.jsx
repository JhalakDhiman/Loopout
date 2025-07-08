const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api/v1`

export const authEndpoints = {
    LOGIN:`${BASE_URL}/auth/login`,
    SIGNUP:`${BASE_URL}/auth/signup`,
    SEND_OTP:`${BASE_URL}/auth/sendOtp`
}

export const courseEndpoints = {
    GET_ALL_COURSES:`${BASE_URL}/course/getAllCourses`,
    GET_COURSE_DETAILS:`${BASE_URL}/course/getCourseDetails`,
    GET_COURSE_PROGRESS:`${BASE_URL}/course/getCourseProgress`
}

export const ratingEndpoints = {
    RATE_COURSE :`${BASE_URL}/rating/rateCourse`,
    GET_ALL_RATING:`${BASE_URL}/rating/getAllRating`
}

export const leaderboardEndpoints = {
    GET_LEADERBOARD:`${BASE_URL}/leaderboard/getLeaderboard`
}

export const assignmentEndpoints = {
    GET_ASSIGNMENT:`${BASE_URL}/assignment`,
    ADD_POINTS:`${BASE_URL}/assignment/addPoints`,
    SUBMIT_ASSIGNMENT:`${BASE_URL}/assignment/submitAssignment`,
    IS_ASSIGNMENT_SUBMITTED:`${BASE_URL}/assignment/isAssignmentSubmitted`,
    ADD_STREAK:`${BASE_URL}/assignment/addStreak`
}