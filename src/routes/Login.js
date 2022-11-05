import React from 'react'
import { GoogleButton } from 'react-google-button'

import { UserAuth } from '../config/authConfig'

const Login = () => {
  const {googleSignIn} = UserAuth();
  
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  }
  
  
  return (
    <div className='container'>
      <div className='card text-center' style={{width: 450}}>
        <div>
          <h1>Login</h1>
        </div>
        <div className='card-body'>
          <GoogleButton onClick={handleGoogleSignIn}/>
        </div>
      </div>
    </div>
  )
  
}

export default Login