import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import User from '../models/user.js'
import OTP from '../models/otp.js'
import otpGenerator from 'otp-generator'

    export const login = async(req,res)=>{
        try{
            
            const {email,password} = req.body;
       
            if(!email || !password){
                return res.status(403).json({
                    success:false,
                    message:"all the fields are required",
                })
            }

            const user = await User.findOne({email});
            if(!user){
                return res.status(401).json({
                    success:false,
                    message:"User is not registered please signup first",
                })
            }
            
            if(await bcrypt.compare(password,user.password)){

                const payload = {
                    email:user.email,
                    id:user._id,
                }
                const token = jwt.sign(payload,process.env.JWT_SECRET,{
                    expiresIn:"30d",
                })

                user.token = token;
                user.password = password;

                const options = {
                    expiresIn: new Date(Date.now()+3*24*60*60*1000),
                    httpOnly:true,

                }

                res.cookie("token",token,options).status(200).json({
                    success:true,
                    token,
                    user,
                    message:"user logged in successfully",
                })

            }

            else{
                return res.status(401).json({
                    success:false,
                    message:"password is incorrect",
                })
            }
        } catch(error){
            console.log("Error occurred while logging in : ",error);
            return res.status(500).json({
                success:false,
                message:"Login failure, please try again",
            })
        }
    }

export const signup = async(req,res)=>{
    try{

        const {email,password,confirmPassword,firstName,lastName,otp} = req.body;
 
        if(!email || !password || !confirmPassword || !firstName || !lastName || !otp){
            return res.status(401).json({
                success:false,
                message:"all fields are required"
            })
        }

        if(password!=confirmPassword){
            return res.status(401).json({
                success:false,
                message:"passwords do not match"
            })
        }

        const user = await User.findOne({email});
        if(user){
            return res.status(401).json({
                success:false,
                message:"user already exists"
            })
        }

        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);

        if(recentOtp.length==0){
            return res.status(400).json({
                success:false,
                message:"otp not found"
            })
        }

        if(recentOtp[0].otp!=otp){
            return res.status(401).json({
                success:false,
                message:"otp is incorrect"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const userData = await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        return res.status(200).json({
            success:true,
            message:"user registered successfully",
            userData
        })

    } catch(error){
        console.log("Erro coming while sign up : ",error);
        return res.status(501).json({
            success:false,
            message:"error has occured"
        })
    }
}

export const sendOtp = async(req,res)=>{
    try{
        const {email} = req.body;

        const user = await User.findOne({email});

        if(user){
            return res.status(401).json({
                success:false,
                message:"user is already present"
            })
        }

        const otp = otpGenerator.generate(6,{
            lowerCaseAlphabets:false,
            upperCaseAlphabets:false,
            specialChars:false
        })

        let result =await OTP.findOne({otp});

        while(result){
            otp = otpGenerator.generate(6,{
                lowerCaseAlphabets:false,
                upperCaseAlphabets:false,
                specialChars:false
            })
            result =await OTP.findOne({otp});
        }

        const otpPayload = {email,otp};

        const otpBody = await OTP.create(otpPayload);

        console.log(otpPayload);

        return res.status(200).json({
            success:true,
            message:"otp created successfully",
            otpBody
        })

    } catch(error){
        console.log(error);
        return res.status(501).json({
            success:false,
            message:"error occured while sending otp"
        })
    }
}


