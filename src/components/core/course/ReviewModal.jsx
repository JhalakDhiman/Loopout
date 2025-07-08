import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { RxCross2 } from "react-icons/rx";
import ReactStars from 'react-rating-stars-component'
import { rateCourse } from '../../../services/operations/courseApis'
import { AuthContext } from '../../../context/AuthContext';

const ReviewModal = ({ courseEntireData,setReviewModal }) => {

  const { register, setValue,handleSubmit, formState: { errors } } = useForm();
  const {user,token} = useContext(AuthContext);

  useEffect(()=>{
    setValue("courseExperience","");
    setValue("courseRating",0);
  },[])

  const ratingChanged = (newRating) => {
    setValue("courseRating",newRating);
  }

  const submitHandler = async(data) =>{

    console.log("token in review modal",token);

    const courseId = courseEntireData?._id
    const rating= data.courseRating
    const review=data.courseExperience

    await rateCourse({courseId,rating,review,token});

    setReviewModal(false);
  }

  return (
    <div className="fixed inset-0 grid h-screen w-screen place-items-center bg-white bg-opacity-10 backdrop-blur-sm">

      <div className="bg-richblack-800 rounded-md">
        <div className="bg-richblack-900 px-4 py-2 flex justify-between w-[500px] rounded-lg ">
          <h1 className="text-richblack-5 font-semibold text-[20px]">Add Review</h1>
          <button className="text-richblack-300" onClick={() => setReviewModal(false)}>
            <RxCross2 />
          </button>
        </div>

        <div>

          <div className="flex justify-center items-center p-4 gap-2">
            <img src={user?.image} alt="image" className="aspect-auto w-[55px] h-[55px] object-cover rounded-full"></img>
            <div className="flex flex-col ">
              <p className="text-richblack-5">{user.firstName} {user.lastName}</p>
              <p className="text-richblack-5">Posting Publicly</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="  flex flex-col items-center">
              {/* react stars */}
              <ReactStars
                count={5}
                size={24}
                onChange={ratingChanged}
                activeColor="#FFD700"
              />
            </div>

            <div className="flex flex-col px-10">
              <label htmlFor='courseExperience' className="text-richblack-50 font-semibold text-[15px] mb-2">Add Your Experience <sup className="text-pink-400">*</sup></label>
              <textarea
                name='courseExperience'
                {...register("courseExperience", { required: true })}
                rows={5}
                plaveholder="Add your experience"
                className='form-style'
                cols={23}
              ></textarea>
              {
                errors.courseExperience && (<span className="ml-2 text-xs tracking-wide text-pink-200">
                  Please add your Experience
                </span>)
              }
            </div>

            <div className="flex gap-2 px-10 py-3 flex-row-reverse">
              <button type='submit' className='text-richblack-900 bg-yellow-50 font-semibold text-[13px] py-2 px-3 rounded-md'>Save</button>
              <button onClick={() => setReviewModal(false)} className='text-richblack-5 bg-richblack-500 font-semibold text-[13px] py-2 px-3 rounded-md'>Cancel</button>
            </div>
          </form>


        </div>
      </div>
    </div>
  )
}

export default ReviewModal
