import React, { useState } from 'react'
import { FaShareFromSquare  } from "react-icons/fa6";
import course from '../../../assets/course1.webp'
import toast from 'react-hot-toast';
import copy from 'copy-to-clipboard';
import ReviewModal from './ReviewModal';

const CourseCard = ({courseData}) => {

    function handleCopy(){
        copy(window.location.href);
        toast.success("address copied to clipboard");
    }

    const [reviewModal,setReviewModal] = useState(false);

  return (
    <div>
      <div className="bg-richblack-700 p-4 w-11/12 rounded-lg flex flex-col gap-2 mt-16">
          <img src={course}/>
          <button onClick={()=>{
            setReviewModal(true);
          }} className="flex my-4 items-center gap-1 text-richblack-900 p-2 font-semibold rounded-lg bg-yellow-50 justify-center hover:bg-yellow-200 hover:scale-[0.98] duration-100 transition-all">Rate the Course</button>
          <button onClick={handleCopy} className="flex mb-4 items-center gap-1 text-yellow-50 justify-center"><FaShareFromSquare /> Share</button>
      </div>
      {
        reviewModal && <ReviewModal courseEntireData={courseData} setReviewModal={setReviewModal}/>
      }
    </div>
  )
}

export default CourseCard
