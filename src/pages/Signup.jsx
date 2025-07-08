import React from 'react'
import Template from '../components/core/auth/Template'
import signupImg from '../assets/signup.webp'

const Signup = () => {
  return (
    <div className="w-full">
      <Template 
        heading = 'Join the millions learning to code with LoopOut for free'
        description1 = 'Build skills for today, tomorrow, and beyond.'
        description2 = 'Education to future-proof your career.'
        formType = 'signup'
        image={signupImg}
        ></Template>
    </div>
  )
}

export default Signup
