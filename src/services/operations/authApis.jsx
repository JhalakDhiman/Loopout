import toast from "react-hot-toast";
import { apiConnector } from '../apiConnector.jsx';
import { authEndpoints } from '../apis'

export const login = async ({ email, password, navigate, setUser, setToken ,setPoints}) => {

    try {
        const loading = toast.loading("loading");
        const response = await apiConnector('POST', authEndpoints.LOGIN, { email, password });

        if (!response.data.success) {
            toast.error(response.data.message);
        }
        else {
            console.log("token recieved during login : ", response.data.token);
            toast.success(response.data.message);

            setUser(response.data.user);
            setToken(response.data.token);
            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("points", response?.data?.user?.points.toString());
            setPoints(Number(response.data.user.points));
            navigate('/')
        }
        toast.dismiss(loading);
    } catch (error) {
        console.log(error);
        toast.error("error occured");
    }
}

export const sendOtp = async ({ email }) => {
    try {
        const loading = toast.loading("loading...");
        const response = await apiConnector('POST', authEndpoints.SEND_OTP, { email });

        if (!response.data.success) {
            toast.error(response.data.message);
        }

        console.log(response.data);
        toast.success(response.data.message);

        toast.dismiss(loading);
    } catch (error) {
        console.log(error);
        toast.error("error occured");
    }
}

export const signup = async ({ email, password, confirmPassword, firstName, lastName, otp, navigate }) => {
    try {
        const loading = toast.loading("loading...");
        const response = await apiConnector('POST', authEndpoints.SIGNUP, { email, password, confirmPassword, firstName, lastName, otp });

        if (!response.data.success) {
            toast.error(response.data.message);
        }
        console.log(response.data);
        toast.success(response.data.message);

        toast.dismiss(loading);
        navigate('/login');
    } catch (error) {
        console.log(error);
        toast.error("error occured");
    }
}

export const logout = async({setUser,setToken,setPoints,setCourse,setSubSection,navigate})=>{
    try{
        localStorage.clear();
        setUser(null);
        setToken(null);
        setPoints(null);
        setCourse(null);
        setSubSection(null);
        toast.success("logged out successfully");
        navigate('/')
    } catch(error){
        console.log(error);
        toast.error("logout unsuccessful");
    }
}