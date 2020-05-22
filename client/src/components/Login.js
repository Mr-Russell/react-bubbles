import React, { useState } from "react";
import {useHistory} from 'react-router-dom'
import {axiosWithAuth} from '../utils/axiosWithAuth.js'

const blankForm = {
  username: '',
  password: ''
}

const Login = () => {
  const [credentials, setCredentials] = useState(blankForm)
  const history = useHistory()

  // make a post request to retrieve a token from the api
  const userLogin = e => {
    e.preventDefault()
    axiosWithAuth()
      .post('/api/login', credentials)
      .then(res => {
        console.log(res)
        window.localStorage.setItem('token', res.data.payload)
        // when you have handled the token, navigate to the BubblePage route
        history.push('/bubble-page')
      })
      .catch(err => console.log(err))
  } 

  
  const handleChange = e => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      
      <form onSubmit={userLogin}>
        <label>Username:
          <input
            name='username'
            type='text'
            value={credentials.username}
            onChange={handleChange}
          />
        </label>

        <label>Password:
          <input
            name='password'
            type='password'
            value={credentials.password}
            onChange={handleChange}
          />
        </label>

        <input
          name='submit'
          type='submit'
          value='Submit'
        />
      </form>
    </>
  );
};

export default Login;
