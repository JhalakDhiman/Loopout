import toast from "react-hot-toast";
import {apiConnector} from '../apiConnector.jsx';
import {assignmentEndpoints, courseEndpoints,ratingEndpoints} from '../apis.jsx';

export const getAllCourses = async()=>{
    try{
        const loading = toast.loading("loading...");
        const response = await apiConnector('GET',courseEndpoints.GET_ALL_COURSES);

        if(!response.data.success){
            toast.error(response.data.message);
        }

        console.log(response.data.courses);
        toast.success(response.data.message);
        toast.dismiss(loading);
        return response.data.courses;
    } catch(error){
        console.log(error);
        toast.error("error occured");
    }
}

export const getCourseDetails = async({courseId})=>{
    try{
        const loading = toast.loading("loading...");
        const response = await apiConnector('GET',`${courseEndpoints.GET_COURSE_DETAILS}/${courseId}`);
        if(!response.data.success){
            toast.error(response.data.message);
        }
        console.log(response.data.courseDetails);
        toast.success(response.data.message);
        toast.dismiss(loading);
        localStorage.setItem("course",JSON.stringify(response.data.courseDetails));
        return response.data.courseDetails;
    } catch(error){
        console.log(error);
        toast.error("error occured");
    }
}

export const rateCourse = async({courseId,rating,review,token})=>{
    try{
        const loading = toast.loading("loading...");
        console.log(token);
        const response = await apiConnector('POST',ratingEndpoints.RATE_COURSE,{courseId,rating,review,token},
        {
            Authorization:`Bearer ${token}`
        });
        if(!response.data.success){
            toast.error(response.data.message);
        }
        console.log(response.data);
        toast.success(response.data.message);
        toast.dismiss(loading);
    } catch(error){
        console.log(error);
        toast.error("error occured");
    }
}

export const getAssignment = async({subSectionId,token})=>{
    try{
        const loading = toast.loading("loading...");
        console.log(subSectionId,token);
        const response = await apiConnector('GET',`${assignmentEndpoints.GET_ASSIGNMENT}/${subSectionId}`,null,
        {
            Authorization:`Bearer ${token}`
        });
        if(!response.data.success){
            toast.error(response.data.message);
        }
        else{
            console.log(response.data);
            // toast.success(response.data.message);
            toast.dismiss(loading);
            return response.data.subSection.assignment;
        }
    } catch(error){
        console.log(error);
        toast.error("error occured");
    }
}

export const addPoints = async({correctAns,token,setPoints})=>{
    const toastId = toast.loading("loading...");
    try{
        const response = await apiConnector('POST',assignmentEndpoints.ADD_POINTS,{token,correctAns},
        {
            Authorization:`Bearer ${token}`
        });
        if(!response.data.success){
            toast.error(response.data.message);
        }
        else{
            console.log(response.data);
            toast.success(response.data.message);
            localStorage.setItem("points", response?.data?.newPoints?.toString());
            setPoints(Number(response.data.newPoints));
        }
    } catch(error){
        console.log(error);
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error("Something went wrong");
        }
    }
    finally{
        toast.dismiss(toastId);
    }
} 

export const getAllRating = async()=>{
    const toastId = toast.loading("loading...");
    try{
        const response = await apiConnector('GET',ratingEndpoints.GET_ALL_RATING);
        if(!response.data.success){
            toast.error(response.data.message);
        }
        else{
            console.log(response.data);
            return response.data.data;
            // toast.success(response.data.message);
        }
    } catch(error){
        console.log(error);
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error("Something went wrong");
        }
    }
    finally{
        toast.dismiss(toastId);
    }
}

export const submitAssignment = async({courseId,token,assignmentId,subSectionId})=>{
    const toastId = toast.loading("loading...");
    try{
        const response = await apiConnector('POST',assignmentEndpoints.SUBMIT_ASSIGNMENT,{token,courseId,assignmentId,subSectionId},
        {
            Authorization:`Bearer ${token}`
        });
        if(!response.data.success){
            toast.error(response.data.message);
        }
        else{
            console.log(response.data);
            // toast.success(response.data.message);
        }
        return response.data.success;
    } catch(error){
        console.log(error);
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error("Something went wrong");
        }
    }
    finally{
        toast.dismiss(toastId);
    }
}

export const isAssignmentSubmitted = async({courseId,token,assignmentId})=>{
    const toastId = toast.loading("loading...");
    try{
        const response = await apiConnector('POST',assignmentEndpoints.IS_ASSIGNMENT_SUBMITTED,{token,courseId,assignmentId},
        {
            Authorization:`Bearer ${token}`
        });
        if(!response.data.success){
            toast.error(response.data.message);
        }
        else{
            console.log(response.data);
            toast.success(response.data.message);
            return response.data.success
        }
    } catch(error){
        console.log(error);
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error("Something went wrong");
        }
    }
    finally{
        toast.dismiss(toastId);
    }
}

export const addStreak = async({token,setStreak})=>{
    const toastId = toast.loading("loading...");
    try{
        const response = await apiConnector('POST',assignmentEndpoints.ADD_STREAK,{token},
        {
            Authorization:`Bearer ${token}`
        });
        if(!response.data.success){
            toast.error(response.data.message);
        }
        else{
            console.log(response.data);
            toast.success(response.data.message);
            setStreak(response.data.count);
            localStorage.setItem("streak",JSON.stringify(response.data.count));
        }
    } catch(error){
        console.log(error);
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error("Something went wrong");
        }
    }
    finally{
        toast.dismiss(toastId);
    }
}

export const getCourseProgress = async({token,courseId})=>{
    const toastId = toast.loading("loading...");
    try{
        const response = await apiConnector('GET',`${courseEndpoints.GET_COURSE_PROGRESS}/${courseId}`,null,
        {
            Authorization:`Bearer ${token}`
        });
        if(!response.data.success){
            toast.error(response.data.message);
        }
        else{
            console.log(response.data);
            // toast.success(response.data.message);
            return response.data;
        }
    } catch(error){
        console.log(error);
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error("Something went wrong");
        }
    }
    finally{
        toast.dismiss(toastId);
    }
}