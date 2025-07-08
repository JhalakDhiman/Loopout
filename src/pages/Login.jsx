import React from 'react'
import Template from '../components/core/auth/Template'
import login from '../assets/login.webp'

const Login = () => {
  return (
    <div className="w-full">
      <Template
        heading="Welcome Back"
        description1="Build skills for today, tomorrow, and beyond."
        description2="Education to future-proof your career."
        image={login}
        formType="login"
      />
    </div>
  )
}

export default Login
