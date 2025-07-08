import React, { useContext } from 'react'
import { CourseContext } from '../context/CourseContext'
import { FaYoutube } from "react-icons/fa";
import { FaRegHandPointDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const SubSection = () => {

  const {subSection} = useContext(CourseContext);

  return (
    <div className='text-richblack-5 w-full h-full flex flex-col gap-7 p-9'>
      <p className='text-3xl font-semibold'>Topic : <span className='text-yellow-50'>{subSection.title}</span></p>
      <p className='text-xl text-richblack-50 font-semibold'>Duration of video : {subSection.timeDuration}</p>
      <p className='text-blue-100 italic text-2xl'>{subSection.description}</p>
      <div className='flex flex-col justify-center'>
        <div className='flex gap-2 items-center'>
          <p className='text-richblack-100'>Watch the Video here</p>
          <FaRegHandPointDown className='text-yellow-50'/>
        </div>
        <a href={subSection.videoUrl}><FaYoutube className='text-6xl text-red-50'/></a>
      </div>

        <Button linkTo={`/assignment/${subSection._id}`} active={true}>
          {
            <div>
              Attempt The Assignment
            </div>
          }
        </Button>
    </div>
  )
}

export default SubSection
