import React, { useContext, useEffect, useState } from 'react'
import { FaChevronDown } from "react-icons/fa6";
import { IoVideocam } from "react-icons/io5";
import { SlGlobe } from "react-icons/sl";
import { addStreak, getAssignment, getCourseDetails, getCourseProgress, isAssignmentSubmitted } from '../services/operations/courseApis';
import { IoIosInformationCircleOutline } from "react-icons/io";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaStar } from "react-icons/fa6";
import CourseCard from '../components/core/course/CourseCard';
import { FaCircleDot } from "react-icons/fa6";
import { AuthContext } from '../context/AuthContext';
import { CourseContext } from '../context/CourseContext';
import { GiThink } from "react-icons/gi";
import StreakModal from '../components/common/StreakModal'
import ProgressBar from '@ramonak/react-progress-bar';

const Course = () => {

  // const course = {
  //   courseName:"DSA Course",
  //   courseDescription:"You will learn DSA",
  //   whatYouWillLearn:"You will learn DSA",
  //   instructor:"Love Babbar",
  //   sections:[{
  //     _id:"1864191804",
  //     sectioName:"Introduction",
  //     subSections:[
  //       {
  //         title:"Introduction to Programming & Flowcharts",
  //         timeDuration:"57 min 54 sec",
  //         description:"In this Video, we will understand the Basics of Programming, we will c…",
  //         videoUrl:"https://www.youtube.com/watch?v=WQoB2z67hvY&list=PLDzeHZWIZsTryvtXdMr6…",
  //         assignment:{
  //           questions:[
  //             {
  //               statement:"Which funtion is used to check length of an array ? ",
  //               option1:"length()",
  //               option2:"size()",
  //               option3:"length()",
  //               option4:"length()",
  //             },
  //             {
  //               statement:"Which funtion is used to check length of an array ? ",
  //               option1:"length()",
  //               option2:"size()",
  //               option3:"length()",
  //               option4:"length()",
  //             }
  //           ]
  //         }
  //       } ,
  //       {
  //         title:"Write Your First Program in C++",
  //         timeDuration:"57 min 54 sec",
  //         description:"In this Video, we will understand Data types,Operators & variables.We …",
  //         videoUrl:"https://www.youtube.com/watch?v=t6zLJOCVqD0&list=PLDzeHZWIZsTryvtXdMr6…",
  //         assignment:{
  //           questions:[
  //             {
  //               statement:"Which funtion is used to check length of an array ? ",
  //               option1:"length()",
  //               option2:"size()",
  //               option3:"length()",
  //               option4:"length()",
  //             },
  //             {
  //               statement:"Which funtion is used to check length of an array ? ",
  //               option1:"length()",
  //               option2:"size()",
  //               option3:"length()",
  //               option4:"length()",
  //             }
  //           ]
  //         }
  //       } 
  //     ]
  //   }]
  // }

  const { courseId } = useParams();
  const { user, token, setStreak, streak } = useContext(AuthContext);
  const { course, points } = useContext(CourseContext);
  const [lectures, setLectures] = useState(0);
  const [isActive, setIsActive] = useState([]);
  const navigate = useNavigate();
  const [streakModal, setStreakModal] = useState(false);
  const [progress, setProgress] = useState(0);

  const [clickedChecks, setClickedChecks] = useState(localStorage.getItem("clickedChecks") ? JSON.parse(localStorage.getItem("clickedChecks")) : []);

  const avgRating = 5;

  useEffect(() => {
    let lecture = 0;
    course?.sections?.forEach((section) => {
      lecture += section.subSections.length || 0;
    })
    setLectures(lecture);
    fetchCourseProgress();
  }, [course])

  function activeHandler(sectionId) {
    if (isActive.includes(sectionId)) {
      setIsActive(isActive.filter((sid) => sid !== sectionId));
    }
    else {
      setIsActive([...isActive, sectionId]);
    }
  }

  const { setSubSection } = useContext(CourseContext);

  const checkClickHandler = async (subSecId) => {
    if (clickedChecks.includes(subSecId)) {
      setClickedChecks(clickedChecks.filter(id => id !== subSecId));
    } else {
      const data = await getAssignment({ subSectionId: subSecId, token });
      const response = await isAssignmentSubmitted({ courseId, token, assignmentId: data._id });
      console.log("isAssignmentSubmitted : ", response);
      if (response) {
        const updatedChecks = [...clickedChecks, subSecId];
        setClickedChecks(updatedChecks);
        console.log("updated checks : ", updatedChecks)
        localStorage.setItem("clickedChecks", JSON.stringify(updatedChecks));
        await addStreak({ token, setStreak });
        setStreakModal(true);
      }
      else {

      }
    }
  };

  const fetchCourseProgress = async () => {
    const response = await getCourseProgress({ token, courseId });
    setProgress(response?.progressPercentage);
  }

  return (
    <div className="w-full h-full pb-9 relative">
      {/* <div className='flex flex-col text-richblack-5 w-fit top-[300px]'>
        <p>Your Points : </p>
        <div className='flex items-center'>
          <p>{user?.points}</p>
          <span className='text-yellow-50 transition-all duration-1000 rotate-180 '><FaCircleDot /></span>
        </div>
      </div> */}
      <div className="py-28 relative px-10 bg-richblack-800 flex flex-col gap-3">
        <div className='flex flex-col text-richblack-5 w-fit right-24 shadow-[10px_-5px_50px_-5px] shadow-blue-200 top-6 absolute p-2 rounded-lg'>
          <p>Your Points : </p>
          <div className='flex items-center gap-3'>
            <p>{points}</p>
            <span className='text-yellow-50 transition-all duration-1000 coin'><FaCircleDot /></span>
          </div>
        </div>
        <p className="text-richblack-5 text-4xl font-semibold">{course?.courseName}</p>
        <p className="text-richblack-100 text-[20px]">{course?.courseDescription}</p>
        <div className="flex gap-3 items-center text-yellow-50 text-[20px]">
          <p>{avgRating}</p>
          <div className='flex text-yellow-50'>
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
          </div>
          {/* <RatingStars Review_Count={avgRating} /> */}
          {/* <p className="text-richblack-5 text-[20px]">{"("}{course?.ratingAndReviews?.length} reviews{")"}</p>
            <p className="text-richblack-5 text-[20px]">{course?.studentsEnrolled.length} students enrolled</p> */}
        </div>
        <p className="text-richblack-5 text-[20px]">created by {course?.instructor}</p>
        <p className="text-richblack-5 text-[20px] flex items-center">
          <span className="mr-2"><IoIosInformationCircleOutline /></span>
          Created at September 3 , 2024 |
          <span className="mx-2 ml-4"><SlGlobe /></span>English</p>
        <div className="absolute w-4/12 right-1 top-12">
          <CourseCard courseData={course} />
        </div>
      </div>

      <div className="w-8/12 pb-12">
        <div className="border-[1px] border-richblack-500 rounded-md p-9 m-12 flex flex-col gap-5">
          <p className="text-richblack-5 text-3xl">What you'll learn</p>
          <p className="text-richblack-5 font-semibold">{course?.whatYouWillLearn}</p>
        </div>
        <div className="ml-12 flex flex-col gap-2 mb-6 items-center">
          <p className="text-richblack-5 text-3xl font-semibold w-full">Course Content</p>
          <p className="text-richblack-5 text-[17px] w-full">{course?.sections?.length} section(s) {lectures} lecture(s)  </p>

          <div className="flex flex-col gap-2 w-full border-[1px] border-richblack-400 p-2 rounded-lg pb-3">
            <p className='text-richblack-5'>Your Progress : {progress || 0}%</p>
            <ProgressBar
              completed={progress || 0}
              height="8px"
              width="200px"
              isLabelVisible={false}
            />
          </div>
          <div className="border-[1px] border-richblack-600 w-full">
            {
              course?.sections?.map((section, index) => (
                <div>
                  <div key={section._id}
                    onClick={() => {
                      activeHandler(section._id)
                    }}
                    className={`bg-richblack-700 text-richblack-5 font-semibold p-5 flex justify-between items-center `}>
                    <div className="flex gap-2 items-center">
                      <FaChevronDown className={`${isActive.includes(section._id) ? "duration-500 transition-all rotate-180" : ""}`} />
                      {section.sectionName}
                    </div>

                    <div className="text-yellow-50">
                      {section.subSections.length} lecture(s)
                    </div>
                  </div>
                  <div className='flex flex-col'>
                    {
                      section.subSections.map((subSec, index) => (
                        <div
                          key={index}
                          className={`bg-richblack-900 ${isActive.includes(section._id) ? "flex" : "hidden"} text-richblack-5 font-semibold p-5 flex gap-2 items-center transition-all justify-between cursor-pointer duration-300`}>
                          <div className='flex items-center gap-2'>
                            <IoVideocam
                              onClick={() => {
                                setSubSection(subSec);
                                localStorage.setItem("subSection", JSON.stringify(subSec));
                                navigate('/sub-section')
                              }} />
                            {subSec.title}
                            <div className=''>
                              <input
                                type='checkbox'
                                name='box'
                                className='w-4 h-4 border-caribbeangreen-300 rounded-sm focus:ring-richblack-5 dark:focus:ring-caribbeangreen-600 dark:ring-offset-caribbeangreen-800 focus:ring-2 dark:bg-caribbeangreen-700 dark:border-caribbeangreen-600'
                                checked={clickedChecks.includes(subSec._id)}
                                onChange={() => { checkClickHandler(subSec._id) }}
                              />
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              ))
            }
          </div>
          <div className='flex flex-col gap-2 items-center border-[1px] shadow-[10px_-5px_50px_-5px] shadow-blue-200 w-fit h-fit rounded-lg p-3 border-richblack-5 mt-8 '>
            <p className='text-richblack-5 text-3xl font-bold mt-6'>Having any Doubt ? </p>
            <Link to='/chat'>
              <GiThink className='hover:text-blue-50 text-8xl text-blue-300 cursor-pointer' />
            </Link>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
      {
        streakModal && <StreakModal setStreakModal={setStreakModal} streak={streak} />
      }
    </div>
  )
}

export default Course
