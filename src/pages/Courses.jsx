import React, { useContext, useEffect, useState } from 'react'
import { getAllCourses, getCourseDetails } from '../services/operations/courseApis';
import course1 from '../assets/course1.webp'
import { IoMdContact } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { CourseContext } from '../context/CourseContext';

const Courses = () => {

  const [courses,setCourses] = useState();
  const navigate = useNavigate();


  // const courses = [
  //   {
  //     courseName: "DSA Course",
  //     courseDescription: "You will learn DSA",
  //     WhatYouWillLearn: "You will learn DSA",
  //     instructor: "LOVE Babbar"
  //   },
  //   {
  //     courseName: "DSA Course",
  //     courseDescription: "You will learn DSA",
  //     WhatYouWillLearn: "You will learn DSA",
  //     instructor: "LOVE Babbar"
  //   },
  //   {
  //     courseName: "DSA Course",
  //     courseDescription: "You will learn DSA",
  //     WhatYouWillLearn: "You will learn DSA",
  //     instructor: "LOVE Babbar"
  //   },
  //   {
  //     courseName: "DSA Course",
  //     courseDescription: "You will learn DSA",
  //     WhatYouWillLearn: "You will learn DSA",
  //     instructor: "LOVE Babbar"
  //   },
  //   {
  //     courseName: "DSA Course",
  //     courseDescription: "You will learn DSA",
  //     WhatYouWillLearn: "You will learn DSA",
  //     instructor: "LOVE Babbar"
  //   },
  //   {
  //     courseName: "DSA Course",
  //     courseDescription: "You will learn DSA",
  //     WhatYouWillLearn: "You will learn DSA",
  //     instructor: "LOVE Babbar"
  //   },
  //   {
  //     courseName: "DSA Course",
  //     courseDescription: "You will learn DSA",
  //     WhatYouWillLearn: "You will learn DSA",
  //     instructor: "LOVE Babbar"
  //   },
  //   {
  //     courseName: "DSA Course",
  //     courseDescription: "You will learn DSA",
  //     WhatYouWillLearn: "You will learn DSA",
  //     instructor: "LOVE Babbar"
  //   }
  // ]

  const {setCourse} = useContext(CourseContext);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getAllCourses();
        setCourses(res);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };
  
    fetchCourses();
  }, []);

  const fetchCourseDetails = async (courseId) => {
    console.log(courseId);
    const res = await getCourseDetails({ courseId });
    setCourse(res);
  }
  
  return (
    <div className='flex px-32 pt-16'>
      <div className='grid grid-cols-3 gap-12'>
        {
          courses?.map((course) => (
            <div key={course._id} className='text-richblack-5 bg-richblack-800 p-2 py-7 rounded-md flex flex-col gap-1 hover:shadow-[10px_-5px_50px_-5px] hover:shadow-blue-200 transition-all duration-75'>
              <div className='w-[300px] h-[200px] rounded-md'>
                <img className='w-fit rounded-md' src={course1} />
              </div>
              <div className='-mt-4'>
                <p className='font-semibold text-[20px]'>{course.courseName}</p>
                <p className='text-richblack-100 text-[15px]'>{course.courseDescription}</p>
                <p className='text-richblack-100 text-[15px]'>{course.WhatYouWillLearn}</p>
                <div className='text-richblack-5 flex gap-2 items-center'>
                  <IoMdContact/>
                  <span className='text-blue-50'>Instructor:</span>
                  <p>
                  {course.instructor}
                  </p>  
                </div>
              </div>
              <div>
                <button 
                onClick={()=>{
                  fetchCourseDetails(course._id)
                  navigate(`/courses/${course._id}`)
                }}
                className=' mt-2 bg-blue-300 text-richblack-100 p-2 w-full rounded-lg hover:bg-richblack-900 transition-all duration-100'>View Course</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Courses
