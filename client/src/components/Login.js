import React, { useState } from "react";
import {useHistory} from 'react-router-dom'
//import {axiosWithAuth} from '../utils/axiosWithAuth.js'
import axios from 'axios'

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
    axios
      .post('http://localhost:4000/api/login', credentials)
      .then(res => {
        console.log(res)
        window.localStorage.setItem('token', res.data.payload)
        // when you have handled the token, navigate to the BubblePage route
        setTimeout(() => {history.push('/bubble-page')},1500)
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
