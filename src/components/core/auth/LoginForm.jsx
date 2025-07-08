import React, { useContext } from 'react'
import {useState} from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; 
import { useForm } from 'react-hook-form';
import { login } from '../../../services/operations/authApis';
import {AuthContext} from '../../../context/AuthContext'
import { CourseContext } from '../../../context/CourseContext';


const LoginForm = () => {

    const navigate = useNavigate();
    const {setUser,setToken} = useContext(AuthContext);
    const {setPoints} = useContext(CourseContext);
    const [showPassword,setPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState:{
            errors
        }
    } = useForm();

    const submitHandler = (data)=>{
        const {email,password} = data;
        login({email,password,navigate,setUser,setToken,setPoints});
    }

  return (
    <div>
        
        <form onSubmit={handleSubmit(submitHandler)}
         className="flex flex-col w-[92%] gap-y-4 mt-6">

            <label className="w-full">
                <p className="text-[0.875rem] leading-[1.375rem] mb-4 text-white opacity-60">Email Address<sup className="text-red-600">*</sup></p>
                <input
                className="bg-[#161d29] rounded-[0.5rem] text-white w-full p-[12px] border-b-[0.05rem] border-[#e6e9db]"
                type="email" 
                name="email"
                placeholder="Enter email address"
                {...register("email",{required:true})}
                ></input>
                {
                    errors.email && <span>
                        email is required
                    </span>
                }
            </label>

            <label className="w-full relative">
                <p className="text-[0.875rem] leading-[1.375rem] mb-4 text-white opacity-60">Password<sup className="text-red-600">*</sup></p>
                <input
                className="bg-[#161d29] rounded-[0.5rem] text-white w-full p-[12px] border-b-[0.05rem] border-[#e6e9db]"
                type={showPassword?"text":"password"} 
                name="password"
                placeholder="Enter password"
                {...register("password",{required:true})}
                ></input>
                {
                    errors.password && <span>
                        password is required
                    </span>
                }
                <span
                 className="absolute right-3 top-[43px] cursor-pointer"
                 onClick={()=>{
                    setPassword(!showPassword);
                }}>
                    {
                        showPassword?

                        <AiOutlineEyeInvisible fontSize={24} fill='#afb2bf'/>

                        :<AiOutlineEye fontSize={24} fill='#afb2bf'/>
                    }
                </span>
            </label>

            <div>
                <Link to='/forgot-password'>
                    <p className="text-xs cursor-pointer -mt-3 max-w-max text-blue-300 ml-auto ">forgot password</p>
                </Link>
            </div>

            <button type="submit"
             className="bg-yellow-100 rounded-[8px] mt-7 font-medium text-[#000814] px-[12px] py-[8px] w-full">Sign In</button>


        </form>

    </div>
  )
}

export default LoginForm;
