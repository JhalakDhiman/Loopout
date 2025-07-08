import React from 'react'
import { FaCircleDot } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import '../../index.css'
import { FaThumbsUp } from "react-icons/fa";

const StreakModal = ({streak,setStreakModal}) => {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
        <div className="flex flex-col items-center relative gap-5 w-[230px] h-[250px] justify-center bg-richblack-900 rounded-lg p-3 border-[1px] border-richblack-500 ">
            <button className='text-richblack-5 absolute right-3 top-3 w-6 h-6 flex items-center justify-center rounded-full bg-richblack-700' onClick={()=>{setStreakModal(false)}}><RxCross2/></button>
            <div>
                <p className='text-richblack-5 text-xl font-semibold'>Current Streak : <span className='text-yellow-50'>{streak}</span></p>
            </div>
            <div className='coin'>
            <span className='text-yellow-50 text-6xl transition-all duration-1000'><FaCircleDot /></span>
            </div>
            <div className='flex items-center gap-2'>
                <p className='text-blue-300 font-semibold'>See You Tomorrow!</p>
                <FaThumbsUp className='text-yellow-50 text-xl'/>
            </div>
        </div>
    </div>
  )
}

export default StreakModal
