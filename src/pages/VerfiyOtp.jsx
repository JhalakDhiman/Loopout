import React, { useContext, useState } from 'react'
import OTPInput from 'react-otp-input'
import { IoMdArrowRoundBack } from "react-icons/io";
import { RxCountdownTimer } from "react-icons/rx";
import { Link, useNavigate } from 'react-router-dom';
import { SignupContext } from '../context/SignupContext';
import { signup } from '../services/operations/authApis';

const VerfiyOtp = () => {

    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    const {signupData} = useContext(SignupContext);

    const submitHandler = (event)=>{
        event.preventDefault();
        console.log(otp);

        const {
            email,
            password,
            firstName,
            lastName,
            confirmPassword
         } = signupData;

         signup({email,password,confirmPassword,firstName,lastName,otp,navigate});

    }

    return (
        <div className='flex justify-center items-center w-[100vw] h-[70%]'>
            <div className="flex flex-col gap-3 w-4/12">
                <h1 className="text-richblack-5 text-3xl font-semibold">Verify Email</h1>
                <p className="text-richblack-100 text-[18px] w-[90%] font-semibold">A verification code has been sent to you. Enter the code below</p>
                <form onSubmit={submitHandler}>
                    <OTPInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span>-</span>}
                        renderInput={(props) =>
                            <input {...props}
                                placeholder="-"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className='bg-richblack-900 w-[50px] m-1 h-[50px] rounded-lg border-[1px] border-richblack-600 text-richblack-5 text-center focus:border-0 focus:outline-yellow-300 ' />
                        }
                    />
                    <button type="submit"
                        className="w-[85%] bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900">
                        Verify Email
                    </button>
                </form>
                <div className="mt-4  w-[85%]  flex justify-between">
                    <Link to='/signup'>
                        <div className="flex gap-2 items-center">
                            <IoMdArrowRoundBack className="text-richblack-5"/>
                            <p className="text-richblack-5">Back to Signup</p>
                        </div>
                    </Link>
                    <button className="flex items-center gap-2">
                        <RxCountdownTimer className="text-blue-100 text-[20px]"/>
                        <p className="text-blue-100 text-semibold">Resend it</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VerfiyOtp
