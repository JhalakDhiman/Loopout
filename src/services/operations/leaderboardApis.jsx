import toast from "react-hot-toast";
import {leaderboardEndpoints} from '../apis'
import { apiConnector } from "../apiConnector";

export const fetchLeaderboard = async({token})=>{
    const toastId = toast.loading("loading...");
    try{
        const response = await apiConnector('GET',leaderboardEndpoints.GET_LEADERBOARD,null,
        {
            Authorization:`Bearer ${token}`
        });
        if(!response.data.success){
            toast.error(response.data.message);
        }
        else{
            toast.success(response.data.message);
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