import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerfiyOtp from "./pages/VerfiyOtp";
import Leaderboard from './pages/Leaderboard'
import Courses from './pages/Courses'
import Course from "./pages/Course";
import PrivateRoute from "./components/common/PrivateRoute";
import Assignment from "./pages/Assignment";
import SubSection from './pages/SubSection'
import ChatPage from "./pages/ChatPage";


function App() {
  return (
    <div className="w-[100vw] h-[100vh] bg-richblack-900 overflow-x-hidden flex flex-col items-center">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/verify-otp' element={<VerfiyOtp />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/courses/:courseId' element={
          <PrivateRoute>
            <Course />
          </PrivateRoute>
        } />
        <Route path='/assignment/:subSectionId' element={<Assignment />} />
        <Route path='/sub-section' element={<SubSection/>}/>
        <Route path='/leaderboard' element={<Leaderboard/>}/>
        <Route path='/chat' element={<ChatPage/>}/>
      </Routes>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
