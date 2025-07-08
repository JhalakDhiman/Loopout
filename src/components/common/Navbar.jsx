import React, { useContext, useState } from 'react'
import Logo from '../../assets/Logo.jpg'
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { NavbarLinks } from '../../data/navbar-links';
import Loop from '../../assets/loop.png'
import { logout } from '../../services/operations/authApis';
import { CourseContext } from '../../context/CourseContext';
import { GiCelebrationFire } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const { user,streak } = useContext(AuthContext);
  const [clickedTab, setClickedTab] = useState("Home");
  const navigate = useNavigate();

  const {setUser,setToken} = useContext(AuthContext);
  const {setCourse,setSubSection,setPoints} = useContext(CourseContext);

  console.log("links : ",NavbarLinks);

  return (
    <div className='w-full h-16 flex justify-between p-4 px-5 items-center bg-richblack-900 border-b-[1px] border-richblack-700'>

      <div className='h-12 flex items-center'>
        <img className='w-12 h-12' src={Loop}/>
      </div>

      <div>
        <ul className='flex gap-10'>
          {
            NavbarLinks.map((link, index) => (
              <li key={index}
                onClick={()=>{
                  setClickedTab(link.title);
                }}
               className={`text-richblack-25 cursor-pointer hover:text-yellow-50 ${clickedTab==link.title?"text-yellow-50":""}`} >
                <Link to={link.path}>
                  {link.title}
                </Link>
              </li>
            ))
          }
        </ul>
      </div>

      <div>
        {
        !user ? 
        (
          <div className='flex gap-5'>
          <Link to='/signup'>
            <button className='text-richblack-5 bg-richblack-800 border-richblack-500 border-[1px] p-2 rounded-md hover:bg-richblack-700'>
              Signup
            </button>
          </Link>
          <Link to='/login'>
          <button className='text-richblack-5 bg-richblack-800 border-richblack-500 border-[1px] p-2 rounded-md hover:bg-richblack-700'>
              Login
            </button>
          </Link>
        </div>
        ):(
          <div className='flex gap-3'>
            { streak && 
              <div className='flex items-center gap-2 border-richblack-100 border-[1px] px-2 rounded-lg'>
                <GiCelebrationFire className='text-yellow-50 text-2xl'/>
                <p className='text-richblack-5'>: {streak}</p>
              </div>
            }
            <div className='w-12 h-12 rounded-full'>
                <img src={user.image} className='w-12 h-12 rounded-full'/>
            </div>
            <button 
            onClick={()=>{
              logout({setUser,setToken,setPoints,setCourse,setSubSection,navigate});
            }}
            className='text-richblack-5 bg-richblack-800 border-richblack-500 border-[1px] p-2 rounded-md hover:bg-richblack-700'>
                Logout
            </button>
          </div>
        )
        }
      </div>

    </div>
  )
}

export default Navbar
