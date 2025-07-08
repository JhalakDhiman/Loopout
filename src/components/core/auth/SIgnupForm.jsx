import React, { useContext, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; 
import {useForm} from 'react-hook-form';
import { SignupContext } from '../../../context/SignupContext';
import { sendOtp } from '../../../services/operations/authApis';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {

    const {register,
        handleSubmit,
        formState:{isSubmitSuccessful,errors}
        } = useForm();

    const {setSignupData} = useContext(SignupContext);

    const navigate = useNavigate();

    const submitHandler = (data)=>{
        console.log(data);
        setSignupData(data);

        const email = data.email;

        sendOtp({email});

        navigate('/verify-otp');
    }

    const [showPassword,setPassword] = useState(false);
    const [showConfirmPassword,setConfirmPassword] = useState(false);

  return (
    <div className="w-11/12 max-width-[450px]">

      <form onSubmit={handleSubmit(submitHandler)}>
          <div className="flex gap-x-4">
        
            <div>
                <label
                className="w-full  text-[0.875rem] leading-[1.375rem] text-white opacity-60" htmlFor='firstName'>First Name<sup className="text-red-600">*</sup></label>
                <input
                className="bg-[#161d29] mt-2 mb-2 rounded-[0.5rem] text-white w-full p-[12px] border-b-[0.05rem] border-[#e6e9db]"
                type="text"
                name="firstName"
                placeholder="Enter first name"
                {...register("firstName",{required:true})}
                ></input>
                {
                    errors.firstName && 
                    <span>
                        enter your first name
                    </span>
                }
            </div>

            <div>
                <label
                className="w-full text-[0.875rem] leading-[1.375rem] mb-4 text-white opacity-60"
                htmlFor='lastName'>Last Name<sup className="text-red-600">*</sup></label>
                <input type="text"
                className="bg-[#161d29]  mt-2 rounded-[0.5rem] text-white w-full p-[12px] border-b-[0.05rem] border-[#e6e9db]"
                name="lastName"
                placeholder="Enter last name"
                {...register("lastName",{required:true})}
                ></input>
                {
                    errors.lastName && <span>
                        last name is required
                    </span>
                }
            </div>

        </div>

        <div>
            <label
           className="w-full text-[0.875rem] leading-[1.375rem] mb-4 text-white opacity-60"
             htmlFor='email'>Email Address<sup className="text-red-600">*</sup></label>
            <input
             className="bg-[#161d29] mt-2 mb-2 rounded-[0.5rem] text-white w-full p-[12px] border-b-[0.05rem] border-[#e6e9db]"
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
        </div>

        <div className="flex gap-x-4">
            <label  className="w-full relative">
                <p className="text-[0.875rem] leading-[1.375rem] mb-2 text-white opacity-60">Create Password<sup className="text-red-600">*</sup></p>
                <input type={showPassword?"text":"password"}
                 className="bg-[#161d29] rounded-[0.5rem] text-white w-full p-[12px] border-b-[0.05rem] border-[#e6e9db]"
                 name="password"
                placeholder="Enter password"
                required
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
        

            <label  className="w-full relative">
                <p className="text-[0.875rem] leading-[1.375rem] mb-2 text-white opacity-60">Confirm Password<sup className="text-red-600">*</sup></p>
                <input type={showConfirmPassword?"text":"password"}
                 className="bg-[#161d29] rounded-[0.5rem] text-white w-full p-[12px] border-b-[0.05rem] border-[#e6e9db]"
                name="confirmPassword"
                placeholder="Enter password"
                required
                {...register("confirmPassword",{required:true})}
                ></input>
                {
                    errors.confirmPassword && <span>
                        confirm password is required
                    </span>
                } 
                <span
                className="absolute right-3 top-[43px] cursor-pointer"
                  onClick={()=>{
                    setConfirmPassword(!showConfirmPassword);
                }}>
                    {
                        showConfirmPassword?

                        <AiOutlineEyeInvisible fontSize={24} fill='#afb2bf'/>:

                        <AiOutlineEye fontSize={24} fill='#afb2bf'/>
                    }
                </span> 
            </label>
            
        </div>

        <button type="submit"
         className="bg-yellow-100 rounded-[8px] mt-7 font-medium text-[#000814] px-[12px] py-[8px] w-full">Create Account</button>


      </form>
    </div>
  )
}

export default SignupForm
